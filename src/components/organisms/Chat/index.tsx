import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@material-ui/core/Divider'
import Fab from '@mui/material/Fab'
import Grid from '@material-ui/core/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import React from 'react'
import { useAuthContext } from 'contexts/AuthContext'
import {
  LoginUserType,
  ChatWithUser,
  GetDummyObj_ChatWithUser,
  SendDirection,
  GetObj_ChatWithUser,
  ApiContext,
  AppErrorCode,
  GetObj_Chat,
} from 'types/userTypes'
import { PostChatMessage, GetChatMessageForAllUsers } from 'api/message'
import { Typography } from '@mui/material'
import Flex from 'components/layout/Flex'
import { GetUrlOfImageFileInDataServer } from 'utils'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },

  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },

  iconLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
  },

  iconRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

/**
 * チャット管理画面
 * @returns
 */
const ChatControl = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // スタイル
  const classes = useStyles()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // 対全ユーザーチャットリスト
  const [allUserChatList, setAllUserChatList] = React.useState<
    {
      pairName: string
      pairImagePath: string
      chats: ChatWithUser[]
    }[]
  >([])
  // 選択ユーザーチャットリスト
  const [sellectedUserChatList, setSellectedUserChatList] = React.useState<{
    pairName: string
    pairImagePath: string
    chats: ChatWithUser[]
  }>({ pairName: '', pairImagePath: '', chats: [GetObj_ChatWithUser()] })
  // 送信メッセージ
  const [sendText, setSendText] = React.useState('')
  // #endregion Fields

  // #region Functions
  // 初期化処理
  React.useEffect(() => {
    // 定期的にチャット履歴を取得するようにする
    const intervalId = setInterval(() => {
      GetChatMessageForAllUsers(apiContext, authUser.id, authUser.type).then(
        (apiResult) => {
          console.log(apiResult)
          if (apiResult.result.Code == AppErrorCode.Success) {
            setAllUserChatList(apiResult.data)
            console.log(allUserChatList)
            const newObj = {
              pairName: '',
              pairImagePath: '',
              chats: GetObj_ChatWithUser(),
            }
            if (sellectedUserChatList.pairName === '') {
              setSellectedUserChatList(Object.assign(newObj, apiResult.data[0]))
              //console.log('chats: ', sellectedUserChatList)
            }
          }
        },
      )
    }, 30000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // リスト上のユーザークリック時のイベントハンドラ
  const userClickHandler = (keyUser: string) => {
    const selectedIndex = allUserChatList.findIndex(
      (item) => item.pairName == keyUser,
    )
    const newObj = {
      pairName: '',
      pairImagePath: '',
      chats: GetObj_ChatWithUser(),
    }

    console.log('sellectedUserChatListPre', sellectedUserChatList)
    const sample = Object.assign(newObj, allUserChatList[selectedIndex])
    setSellectedUserChatList(sample)
    console.log('selectedIndex: ', selectedIndex)
    console.log('partnerName: ', keyUser)
    console.log('sellectedUserChatListAfter', sellectedUserChatList)
    console.log('sellectedUserChatList2', sample)
    console.log('allUserChatList', allUserChatList)
  }

  // チャット送信ボタンクリック時のイベントハンドラ
  const sendButtonClickHandler = () => {
    /** do something */
    console.log(sendText)
    if (sendText == '') {
      return
    }

    const chat = GetObj_Chat()
    chat.actor_user_id =
      authUser.type == LoginUserType.Actor
        ? authUser.id
        : sellectedUserChatList.chats[0].actor.id
    chat.maker_user_id =
      authUser.type == LoginUserType.Marker
        ? authUser.id
        : sellectedUserChatList.chats[0].maker.id
    chat.sender_dir =
      authUser.type == LoginUserType.Actor
        ? SendDirection.ToMakerFromActor
        : SendDirection.ToActorFromMaker
    chat.comment = sendText
    chat.send_time = new Date(Date.now()).toLocaleString() //'2022/9/30 14:10:00'

    console.log(chat)

    // チャットメッセージ送信
    PostChatMessage(apiContext, chat).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        // チャット履歴へ追加
        sellectedUserChatList.chats.push(apiResult.data)
        setSellectedUserChatList(sellectedUserChatList)
        // メッセージクリア
        setSendText('')
      }
    })
  }
  // #endregion Functions

  return (
    <Box>
      <Flex
        flexDirection={'row'}
        alignContent={'space-between'}
        alignItems={'space-between'}
        flexWrap={'wrap'}
      >
        {/* チャット相手リスト プルダウン表示Ver.*/}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }} width={'100%'}>
          {/* ユーザー選択コントロール */}
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              チャット相手
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // value={age}
              onChange={(event: SelectChangeEvent) =>
                userClickHandler(event.target.value as string)
              }
              label="チャット相手"
            >
              {allUserChatList != null &&
                allUserChatList.map((item) => {
                  return (
                    <MenuItem key={item.pairName} value={item.pairName}>
                      {item.pairName}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </Box>
        {/* チャット相手リスト リスト表示Ver.*/}
        <Box
          className={classes.borderRight500}
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: { md: '25%' },
          }}
        >
          <List>
            {allUserChatList != null &&
              allUserChatList.map((item) => {
                return (
                  <ListItem
                    button
                    key={item.pairName}
                    onClick={() => userClickHandler(item.pairName)}
                  >
                    <ListItemIcon>
                      <Avatar
                        sx={{ width: 70, height: 70 }}
                        alt={item.pairName}
                        src={
                          item.pairImagePath.startsWith('storage')
                            ? GetUrlOfImageFileInDataServer(item.pairImagePath)
                            : item.pairImagePath
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.pairName}>
                      {item.pairName}
                    </ListItemText>
                  </ListItem>
                )
              })}
          </List>
        </Box>
        {/* チャット内容 */}
        <Box sx={{ width: { xs: '100%', md: '75%' } }}>
          <Flex flexDirection={'column'}>
            {/* 送信済みチャット表示 */}
            <Box width={'100%'}>
              <List>
                {sellectedUserChatList != null &&
                  sellectedUserChatList.chats != null &&
                  Array.isArray(sellectedUserChatList.chats) &&
                  sellectedUserChatList.chats.map((item, index) => {
                    // 送信方向が双方向の場合は描画しない
                    if (item.chat.sender_dir == SendDirection.ToWay) {
                      return <></>
                    }

                    return (
                      <ListItem key={index}>
                        <Grid container>
                          <Grid item xs={12}>
                            <ListItemIcon
                              className={
                                (authUser.type == LoginUserType.Actor &&
                                  item.chat.sender_dir ==
                                    SendDirection.ToMakerFromActor) ||
                                (authUser.type == LoginUserType.Marker &&
                                  item.chat.sender_dir ==
                                    SendDirection.ToActorFromMaker)
                                  ? classes.iconRight
                                  : classes.iconLeft
                              }
                            >
                              <Avatar
                                sx={{
                                  width: { xs: 40, md: 70 },
                                  height: { xs: 40, md: 70 },
                                }}
                                alt={
                                  item.chat.sender_dir ==
                                  SendDirection.ToMakerFromActor
                                    ? item.actor.user_name
                                    : item.maker.maker_name
                                }
                                src={
                                  item.chat.sender_dir ==
                                  SendDirection.ToMakerFromActor
                                    ? item.actor.image_path.startsWith(
                                        'storage',
                                      )
                                      ? GetUrlOfImageFileInDataServer(
                                          item.actor.image_path,
                                        )
                                      : item.actor.image_path
                                    : item.maker.image_path.startsWith(
                                        'storage',
                                      )
                                    ? GetUrlOfImageFileInDataServer(
                                        item.maker.image_path,
                                      )
                                    : item.maker.image_path
                                }
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{ fontSize: { xs: 15, md: 25 } }}
                                  textAlign={
                                    (authUser.type == LoginUserType.Actor &&
                                      item.chat.sender_dir ==
                                        SendDirection.ToMakerFromActor) ||
                                    (authUser.type == LoginUserType.Marker &&
                                      item.chat.sender_dir ==
                                        SendDirection.ToActorFromMaker)
                                      ? 'right'
                                      : 'left'
                                  }
                                >
                                  {item.chat.comment}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  sx={{ fontSize: { xs: 15, md: 15 } }}
                                  textAlign={
                                    (authUser.type == LoginUserType.Actor &&
                                      item.chat.sender_dir ==
                                        SendDirection.ToMakerFromActor) ||
                                    (authUser.type == LoginUserType.Marker &&
                                      item.chat.sender_dir ==
                                        SendDirection.ToActorFromMaker)
                                      ? 'right'
                                      : 'left'
                                  }
                                >
                                  {item.chat.send_time}
                                </Typography>
                              }
                            ></ListItemText>
                          </Grid>
                        </Grid>
                      </ListItem>
                    )
                  })}
              </List>
            </Box>
            <Divider />
            {/* 送信操作 */}
            <Box>
              <Flex
                flexDirection={'row'}
                justifyContent={'space-around'}
                flexWrap={'wrap'}
                alignContent={'center'}
                alignItems={'center'}
              >
                {/* メッセージ入力 */}
                <Box sx={{ width: { xs: '85%', md: '90%' } }}>
                  <TextField
                    id="sendText"
                    label="メッセージを入力..."
                    size="medium"
                    value={sendText}
                    onChange={(event) => setSendText(event.target.value)}
                    fullWidth
                    style={{ backgroundColor: '#dddddd' }}
                  />
                </Box>
                {/* 送信ボタン */}
                <Box marginLeft={1} marginTop={1}>
                  <Fab
                    color="primary"
                    aria-label="send"
                    onClick={() => {
                      sendButtonClickHandler()
                    }}
                    size={'small'}
                  >
                    <SendIcon />
                  </Fab>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default ChatControl
