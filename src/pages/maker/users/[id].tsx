import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { GetMakerUserInformation } from 'api/users'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import MakerUserProfile from 'components/organisms/MakerProfile'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import { useAuthContext } from 'contexts/AuthContext'
import {
  ApiContext,
  AppErrorCode,
  AuthUser,
  GetDefaultAuthUser,
  MakerUser,
  GetObj_MakerUser,
  LoginUserType,
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
  const [user, setUser] = useState<MakerUser>(GetObj_MakerUser())
  // 対象ユーザーID
  const targetUserId = Number(router.query.id)
  // 表示モード
  const view_mode_mine: boolean = (() => {
    if (router.query.view_mode_mine === 'false') {
      return false
    } else {
      return true
    }
  })()
  // プロフィール編集モード
  const [editMode, setEditMode] = useState<boolean>(false)
  // #endregion Fields

  // #region Functions
  // 初期化処理
  useEffect(() => {
    GetMakerUserInformation(apiContext, targetUserId).then((apiResult) => {
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
  function updateUserData(user: MakerUser) {
    setUser(user)
    const localAuthUser: AuthUser = GetDefaultAuthUser()
    localAuthUser.id = user.id
    localAuthUser.user_name = user.maker_name
    localAuthUser.profile_image_path = user.image_path
    // 認証ユーザー情報更新
    setAuthUser(localAuthUser)
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
              プロフィール
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex>
                <MakerUserProfile
                  variant="normal"
                  user={user}
                  view_mode_mine={view_mode_mine}
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
