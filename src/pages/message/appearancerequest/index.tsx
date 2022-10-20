import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import UserProfile from 'components/organisms/UserProfile'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import { useAuthContext } from 'contexts/AuthContext'
import {
  ApiContext,
  AppErrorCode,
  AuthUser,
  GetDefaultAuthUser,
  User,
  GetObj_User,
} from 'types/userTypes'
import { AppearanceRequestPostForm } from 'components/organisms/AppearanceRequest'

const AppearanceRequestPage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 認証済ユーザー
  const { authUser, setAuthUser } = useAuthContext()
  // ユーザー情報
  const [user, setUser] = useState<User>(GetObj_User())
  // 表示モード
  const view_mode_mine: boolean = (() => {
    if (router.query.view_mode_mine === 'false') {
      return false
    } else {
      return true
    }
  })()
  // #endregion Fields

  // #region Functions
  // 初期化処理
  useEffect(() => {
    /* do something */
  }, [])

  // #endregion Functions

  // #region View
  return (
    <Layout userType={view_mode_mine ? 'actor' : 'maker'}>
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
              出演依頼
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex
                justifyContent={'center'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <AppearanceRequestPostForm item={0} />
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
