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
  Offer,
  OfferResponse,
  OfferWithOptionData,
  LoginUserType,
  GetObj_OfferResponse,
} from 'types/userTypes'
import {
  GetAppearanceRequest,
  PostAppearanceRequestResponse,
} from 'api/schedule'
import { AppearanceRequestResponsePostForm } from 'components/organisms/AppearanceRequestResponse'

const AppearanceRequestResponsePage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // 出演依頼ID
  const offer_id = Number(router.query.id)
  // 出演依頼情報
  const [targetAppearanceRequest, setTargetAppearanceRequest] =
    React.useState<OfferWithOptionData>(new OfferWithOptionData())
  // #endregion Fields

  // #region Functions
  // 初期化処理
  React.useEffect(() => {
    // 出演依頼情報取得
    GetAppearanceRequest(apiContext, offer_id).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        setTargetAppearanceRequest(apiResult.data)
      }
    })
  }, [])

  // 出演依頼レスポンスポスト
  function postAppearanceRequestResponse(response: OfferResponse) {
    // 送信確認
    if (!confirm('出演依頼の返信を送信しますか？')) {
      return
    }

    // IDをセット
    response.offer_id = targetAppearanceRequest.offer.id

    console.log(response)

    // 出演依頼送信
    PostAppearanceRequestResponse(apiContext, response).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        alert('出演依頼の返信に成功しました。')
        // 出演依頼INBOX画面へ戻る
        router.push('/message/appearancerequest/inbox')
      } else {
        alert('出演依頼の返信に失敗しました。')
      }
    })
  }
  // #endregion Functions

  // #region View
  return (
    <Layout userType={authUser.type == LoginUserType.Actor ? 'actor' : 'maker'}>
      <MainPartLayout>
        <Separator />
        <Box>
          <Flex flexDirection={'column'}>
            <Text
              as="h3"
              fontWeight="bold"
              variant="mediumLarge"
              marginTop={0}
              paddingLeft={1}
            >
              出演依頼の対処
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex
                justifyContent={'center'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <AppearanceRequestResponsePostForm
                  offer={targetAppearanceRequest.offer}
                  onPost={postAppearanceRequestResponse}
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default AppearanceRequestResponsePage
