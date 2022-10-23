import { useRouter } from 'next/router'
import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useAuthContext } from '../../../contexts/AuthContext'
import { ApiContext, AppErrorCode, OfferWithOptionData } from 'types/userTypes'
import { GetAppearanceRequestList } from 'api/schedule'
import { GetUrlOfImageFileInDataServer } from 'utils'

export default function AppearanceRequestInbox() {

  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // 出演依頼一覧
  const [appearanceRequests, setAppearanceRequests] = React.useState<OfferWithOptionData[]>(new Array());
  // #endregion Fields

  // #region Functions
  // 初期化処理
  React.useEffect(() => {
    // 出演依頼一覧取得
    GetAppearanceRequestList(apiContext, 6).then((apiResult) => {
      console.log(apiResult);
      if (apiResult.result.Code == AppErrorCode.Success) {
        setAppearanceRequests(apiResult.data)
      }
    })
  }, [])

  // #endregion Functions

  // #region View
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {appearanceRequests.map((item) => {
        return [
          <>
            <ListItem alignItems="flex-start">
              <ListItemButton
                onClick={() => {
                  router.push(`/message/appearancerequest/${item.offer.id}`)
                }}>
                <ListItemAvatar>
                  <Avatar 
                    alt={item.maker_user.maker_name}
                    src={GetUrlOfImageFileInDataServer(item.maker_user.image_path)}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`依頼メーカー:${item.maker_user.maker_name} `}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="caption"
                        color="text.primary"
                      >
                        出演金額: {item.offer.fee}[円]
                      </Typography>
                      <Divider variant="inset"/>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="caption"
                        color="text.primary"
                      >
                        タイトル: {item.offer.title}
                      </Typography>
                      <Divider variant="inset"/>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="caption"
                        color="text.primary"
                      >
                        メッセージ: {item.offer.message}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ]
      })}
    </List>
  )
  // #endregion View
}
