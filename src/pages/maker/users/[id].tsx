import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { GetUserInformation } from 'api/users'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import MakerProfile from 'components/organisms/MakerProfile'
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

const MakerUserPage: NextPage = () => {
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
  // プロフィール編集モード
  const [editMode, setEditMode] = useState<boolean>(false)
  // #endregion Fields

  // #region Functions
  // 初期化処理
  useEffect(() => {
    GetUserInformation(apiContext, authUser.id).then((apiResult) => {
      //console.log(apiResult);
      if (apiResult.result.Code == AppErrorCode.Success) {
        setUser(apiResult.data)
        //console.log(user)
      }
    })
  }, [])
  /**
   * 編集モード遷移
   */
  function transitToEditMode(): void {
    setEditMode(true)
  }
  /**
   * 参照モード遷移
   */
  function transitToRefMode(): void {
    setEditMode(false)
  }
  // ユーザーデータ更新
  function updateUserData(user: User) {
    setUser(user)
    const localAuthUser: AuthUser = GetDefaultAuthUser()
    localAuthUser.id = user.id
    localAuthUser.user_name = user.user_name
    localAuthUser.profile_image_path = user.image_path
    // 認証ユーザー情報更新
    setAuthUser(localAuthUser)
  }
  // #endregion Functions

  // #region View
  return (
    <Layout userType={'maker'}>
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
              プロフィール
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex>
                <MakerProfile
                  variant="normal"
                  user={user}
                  editMode={editMode}
                  onTransitToEdit={transitToEditMode}
                  onTransitToRef={transitToRefMode}
                  updateUserData={updateUserData}
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

export default MakerUserPage
