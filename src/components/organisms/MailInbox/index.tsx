import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Badge, { BadgeProps } from '@mui/material/Badge'
import EmailIcon from '@mui/icons-material/Email'
import Typography from '@mui/material/Typography'
import { useAuthContext } from '../../../contexts/AuthContext'
import { ApiContext, AppErrorCode, UserNotice } from 'types/userTypes'
import { GetNoticeList } from 'api/message'
import { Box } from '@mui/material'

// バッジのスタイルカスタム
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

export default function MailInbox() {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // メール一覧
  const [mails, setMails] = React.useState<UserNotice[]>([])
  // #endregion Fields

  // #region Functions
  // 初期化処理
  React.useEffect(() => {
    // メール一覧取得
    GetNoticeList(apiContext, authUser.type, authUser.id).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        setMails(apiResult.data)
      }
    })
  }, [])

  // #endregion Functions

  // #region View
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {mails.map((item) => {
        return [
          <>
            <ListItem alignItems="flex-start">
              <ListItemButton
                // カテゴリに合わせてリンク先を切り替える
                // 0:不定、1:ノーマル、2:出演依頼、3:出演依頼返信、4:取引完了確認依頼
                onClick={() => {
                  if (item.category == 4) {
                    router.push(`/complete_transaction/${item.information_id}`)
                  }
                }}
              >
                <Box marginRight={2}>
                  <StyledBadge color="primary">
                    <EmailIcon />
                  </StyledBadge>
                </Box>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="h6"
                        color="text.primary"
                      >
                        {item.title}
                      </Typography>
                      <Divider variant="inset" />
                    </React.Fragment>
                  }
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="subtitle1"
                      color="text.primary"
                    >
                      {item.sub_title}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>,
        ]
      })}
    </List>
  )
  // #endregion View
}
