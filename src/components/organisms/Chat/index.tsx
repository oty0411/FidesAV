import Avatar from '@mui/material/Avatar'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
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
  GetObj_Chat
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
    justifyContent: 'flex-start'
  },

  iconRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
})

// ダミーデータ
const dummyChats: ChatWithUser[] = [
  GetDummyObj_ChatWithUser("Hey man, What's up ?", '2022年10月29日 11:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Hey, Iam Good! What about you ?", '2022年10月29日 12:34:56',
    SendDirection.ToMakerFromActor,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg", 
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Cool. i am good, let's catch up!", '2022年10月29日 13:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  // #region 折りたたみ
  GetDummyObj_ChatWithUser("Hey man, What's up ?", '2022年10月29日 11:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Hey, Iam Good! What about you ?", '2022年10月29日 12:34:56',
    SendDirection.ToMakerFromActor,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg", 
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Cool. i am good, let's catch up!", '2022年10月29日 13:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),GetDummyObj_ChatWithUser("Hey man, What's up ?", '2022年10月29日 11:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Hey, Iam Good! What about you ?", '2022年10月29日 12:34:56',
    SendDirection.ToMakerFromActor,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg", 
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Cool. i am good, let's catch up!", '2022年10月29日 13:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),GetDummyObj_ChatWithUser("Hey man, What's up ?", '2022年10月29日 11:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Hey, Iam Good! What about you ?", '2022年10月29日 12:34:56',
    SendDirection.ToMakerFromActor,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg", 
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Cool. i am good, let's catch up!", '2022年10月29日 13:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),GetDummyObj_ChatWithUser("Hey man, What's up ?", '2022年10月29日 11:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Hey, Iam Good! What about you ?", '2022年10月29日 12:34:56',
    SendDirection.ToMakerFromActor,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg", 
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Cool. i am good, let's catch up!", '2022年10月29日 13:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),GetDummyObj_ChatWithUser("Hey man, What's up ?", '2022年10月29日 11:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Hey, Iam Good! What about you ?", '2022年10月29日 12:34:56',
    SendDirection.ToMakerFromActor,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg", 
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Cool. i am good, let's catch up!", '2022年10月29日 13:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),GetDummyObj_ChatWithUser("Hey man, What's up ?", '2022年10月29日 11:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Hey, Iam Good! What about you ?", '2022年10月29日 12:34:56',
    SendDirection.ToMakerFromActor,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg", 
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Cool. i am good, let's catch up!", '2022年10月29日 13:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),GetDummyObj_ChatWithUser("Hey man, What's up ?", '2022年10月29日 11:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Hey, Iam Good! What about you ?", '2022年10月29日 12:34:56',
    SendDirection.ToMakerFromActor,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg", 
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Cool. i am good, let's catch up!", '2022年10月29日 13:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  // #endregion 折りたたみ
]
const dummyChats2: ChatWithUser[] = [
  GetDummyObj_ChatWithUser("Hey man, What's up ?", '2022年10月29日 11:34:56',
    SendDirection.ToMakerFromActor,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Hey, Iam Good! What about you ?", '2022年10月29日 12:34:56',
    SendDirection.ToMakerFromActor,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg", 
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
  GetDummyObj_ChatWithUser("Cool. i am good, let's catch up!", '2022年10月29日 13:34:56',
    SendDirection.ToActorFromMaker,
    'Alice', "https://material-ui.com/static/images/avatar/3.jpg",
    'Remy Sharp', "https://material-ui.com/static/images/avatar/1.jpg"),
]

// ダミーデータ
const dummyChatList: { pairName: string, pairImagePath: string, chats: ChatWithUser[] }[] = [
  { pairName: 'RemySharp', pairImagePath: "https://material-ui.com/static/images/avatar/1.jpg", chats: dummyChats },
  { pairName: 'Alice', pairImagePath: "https://material-ui.com/static/images/avatar/3.jpg", chats: dummyChats },
  { pairName: 'Cindy Baker', pairImagePath: "https://material-ui.com/static/images/avatar/2.jpg", chats: dummyChats2 },  
]

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
  const { authUser} = useAuthContext()
  // 対全ユーザーチャットリスト
  const [allUserChatList, setAllUserChatList] = React.useState<{
    pairName: string,
    pairImagePath: string,
    chats: ChatWithUser[]
  }[]>([])
  // 選択ユーザーチャットリスト
  const [sellectedUserChatList, setSellectedUserChatList] = React.useState<{
    pairName: string,
    pairImagePath: string,
    chats: ChatWithUser[]
  }>({ pairName: '', pairImagePath: '', chats: [GetObj_ChatWithUser()] })
  // 送信メッセージ
  const [sendText, setSendText] = React.useState('');
  // #endregion Fields

  // #region Functions
  // 初期化処理
  React.useEffect(() => {
    
    // 定期的にチャット履歴を取得するようにする
    const intervalId = setInterval(() => {
      GetChatMessageForAllUsers(apiContext, authUser.id, authUser.type).then((apiResult) => {
        console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          setAllUserChatList(apiResult.data)
          console.log(allUserChatList)
          let newObj = { pairName: '', pairImagePath: '', chats: GetObj_ChatWithUser() }
          setSellectedUserChatList(Object.assign(newObj, apiResult.data[0]))
          //console.log('chats: ', sellectedUserChatList)
        }
      })
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };

  }, [])

  // リスト上のユーザークリック時のイベントハンドラ
  const userClickHandler = (keyUser: string) => {
    const selectedIndex = allUserChatList.findIndex(item => item.pairName == keyUser)
    let newObj = { pairName: '', pairImagePath: '', chats: GetObj_ChatWithUser() }
    setSellectedUserChatList(Object.assign(newObj, allUserChatList[selectedIndex]))
    // console.log('partnerName: ', keyUser)
    // console.log(sellectedUserChatList)
  }

  // チャット送信ボタンクリック時のイベントハンドラ
  const sendButtonClickHandler = () => {
    /** do something */
    console.log(sendText)

    let chat = GetObj_Chat()
    chat.actor_user_id = authUser.type == LoginUserType.Actor ? authUser.id : sellectedUserChatList.chats[0].actor.id 
    chat.maker_user_id = authUser.type == LoginUserType.Marker ? authUser.id : sellectedUserChatList.chats[0].maker.id
    chat.sender_dir = authUser.type == LoginUserType.Actor
      ? SendDirection.ToMakerFromActor
      : SendDirection.ToActorFromMaker
    chat.comment = sendText
    chat.send_time = new Date(Date.now()).toLocaleString()//'2022/9/30 14:10:00'

    console.log(chat)

    // チャットメッセージ送信
    PostChatMessage(apiContext, chat).then((apiResult) => {
      console.log(apiResult);
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
    <div>
      <Grid container component={Paper} className={classes.chatSection}>
        {/* チャット相手リスト */}
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            {allUserChatList != null && allUserChatList.map(item => {
              return (
                <ListItem button key={item.pairName} onClick={() => userClickHandler(item.pairName)}>
                  <ListItemIcon>
                    <Avatar
                      sx={{ width: 70, height: 70 }}
                      alt={item.pairName}
                      src={GetUrlOfImageFileInDataServer(item.pairImagePath)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.pairName}>{item.pairName}</ListItemText>
                </ListItem>
              )
            })}
          </List>
        </Grid>
        {/* チャット内容 */}
        <Grid item xs={9}>
          {/* 送信済みチャット表示 */}
          <List className={classes.messageArea}>
            {sellectedUserChatList != null &&
              sellectedUserChatList.chats != null && Array.isArray(sellectedUserChatList.chats) &&
                sellectedUserChatList.chats.map((item, index) => {
              return (
                <ListItem key={index}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemIcon className={
                        (
                          ((authUser.type == LoginUserType.Actor) && (item.chat.sender_dir == SendDirection.ToMakerFromActor)) ||
                          ((authUser.type == LoginUserType.Marker) && (item.chat.sender_dir == SendDirection.ToActorFromMaker))
                        ) ? classes.iconRight : classes.iconLeft
                      }>
                        <Avatar 
                          sx={{ width: 70, height: 70 }}
                          alt={
                            item.chat.sender_dir == SendDirection.ToMakerFromActor
                              ? item.actor.user_name
                              : item.maker.maker_name
                          }
                          src={
                            item.chat.sender_dir == SendDirection.ToMakerFromActor
                              ? GetUrlOfImageFileInDataServer(item.actor.image_path)
                              : GetUrlOfImageFileInDataServer(item.maker.image_path)
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            style={{ fontSize: '30px' }}
                            textAlign={
                              (
                                ((authUser.type == LoginUserType.Actor) && (item.chat.sender_dir == SendDirection.ToMakerFromActor)) ||
                                ((authUser.type == LoginUserType.Marker) && (item.chat.sender_dir == SendDirection.ToActorFromMaker))
                              ) ? 'right' : 'left'}
                          >
                            {item.chat.comment}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            textAlign={
                              (
                                ((authUser.type == LoginUserType.Actor) && (item.chat.sender_dir == SendDirection.ToMakerFromActor)) ||
                                ((authUser.type == LoginUserType.Marker) && (item.chat.sender_dir == SendDirection.ToActorFromMaker))
                              ) ? 'right' : 'left'}
                          >
                            {item.chat.send_time}
                          </Typography>
                      }></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              )
            })}
          </List>
          <Divider />
          {/* 送信操作 */}
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField
                id="sendText"
                label="メッセージを入力..."
                size="medium"
                value={sendText}
                onChange={(event) => setSendText(event.target.value)}
                fullWidth
                style={{ backgroundColor: '#dddddd' }}
              />
            </Grid>
            <Grid xs={1}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => { sendButtonClickHandler() }}
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default ChatControl
