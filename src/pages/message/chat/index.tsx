import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ChatControl from '../../../components/organisms/Chat'
import Separator from 'components/atoms/Separator'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import { useAuthContext } from 'contexts/AuthContext'
import { ApiContext, AppErrorCode, GetObj_Chat, LoginUserType, SendDirection } from 'types/userTypes'
import { PostChatMessage } from 'api/message'

const UserChatPage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // #endregion Fields

  // #region Functions
  // 初期化処理
  useEffect(() => {
    // チャット相手
    const targetUserId = Number(router.query.targetUserId)

    const chat = GetObj_Chat()
    chat.actor_user_id =
      authUser.type == LoginUserType.Actor
        ? authUser.id
        : targetUserId
    chat.maker_user_id =
      authUser.type == LoginUserType.Marker
        ? authUser.id
        : targetUserId
    chat.sender_dir = SendDirection.ToWay
    chat.comment = 'no comment'
    chat.send_time = new Date(Date.now()).toLocaleString() //'2022/9/30 14:10:00'

    console.log('chat', chat)

    // チャットメッセージ送信
    PostChatMessage(apiContext, chat).then((apiResult) => {
      console.log('api', apiResult)
    })

  }, [])
  // #endregion Functions

  // #region View
  return (
    <Layout userType={authUser.type == LoginUserType.Actor ? 'actor' : 'maker'}>
      <MainPartLayout>
        <Separator />
        <Box height="100vh" marginLeft={2}>
          <Flex flexDirection={'column'}>
            <ChatControl />
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default UserChatPage
