import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import { useAuthContext } from 'contexts/AuthContext'
import {
  ApiContext,
  AppErrorCode,
  ActorSchedule,
  LoginUserType,
  GetObj_ActorSchedule,
  Offer,
  OfferStatus,
} from 'types/userTypes'
import { AppearanceRequestPostForm } from 'components/organisms/AppearanceRequest'
import { GetSchedule, PostAppearanceRequest } from 'api/schedule'

const AppearanceRequestPage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // 出演依頼対象のスケジュールID
  const target_schedule_id = Number(router.query.targetId)
  // 出演依頼対象のスケジュール情報
  const [targetActorSchedule, setTargetActorSchedule] =
    React.useState<ActorSchedule>(GetObj_ActorSchedule())
  // #endregion Fields

  // #region Functions
  // 初期化処理
  React.useEffect(() => {
    // 出演依頼対象スケジュール取得
    GetSchedule(apiContext, target_schedule_id).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        setTargetActorSchedule(apiResult.data)
      }
    })
  }, [])

  // 出演依頼ポスト
  function postAppearanceRequest(offer: Offer) {
    // 送信確認
    if (!confirm('出演依頼を送信しますか？')) {
      return
    }

    // 各種IDをセット
    offer.actor_schedule_id = targetActorSchedule.id
    offer.maker_user_id = authUser.id
    // ステータスをオファー中へ変更
    offer.status = OfferStatus.Going

    console.log(offer)

    // 出演依頼送信
    PostAppearanceRequest(apiContext, offer).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        alert('出演依頼の送信に成功しました。')
        // 女優のスケジュール管理画面へ戻る
        router.push(`/actor/schedule/${targetActorSchedule.actor_user_id}`)
      } else {
        alert('出演依頼の送信に失敗しました。')
      }
    })
  }
  // #endregion Functions

  // #region View
  return (
    <Layout userType={authUser.type == LoginUserType.Actor ? 'actor' : 'maker'}>
      <MainPartLayout>
        <Separator />
        <Box height='100vh'>
          <Flex flexDirection={'column'}>
            <Text
              as="h3"
              fontWeight="bold"
              variant="mediumLarge"
              marginTop={0}
              paddingLeft={1}
            >
              出演依頼
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex
                justifyContent={'center'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <AppearanceRequestPostForm onPost={postAppearanceRequest} />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default AppearanceRequestPage
