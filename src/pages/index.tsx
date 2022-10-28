import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useAuthContext } from '../contexts/AuthContext'
import { AuthUser, LoginUserType } from '../types/userTypes'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Footer from 'components/organisms/Footer'
import SigninFormContainer from 'containers/SigninFormContainer'

// アンカー
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const SigninPage: NextPage = () => {
  // #region Fields
  // ルーター
  const router = useRouter()
  // 認証情報コンテクスト
  const { setAuthUser } = useAuthContext()
  // #endregion Fields

  // #region Functions
  // 認証後のイベントハンドラ
  const handleSignin = async (user: AuthUser, err?: Error) => {
    // 認証情報コンテキストI/Fを経由して認証済みユーザをセット
    setAuthUser(user)
    console.log('auth user is ...')
    console.log(user)

    if (!err) {
      // サインインに成功し、クエリが指定されている場合はそのURLに移動。
      // デフォルトはトップページに移動。
      const redurectTo =
        (router.query['redirect_to'] as string) ??
        (user.type == LoginUserType.Actor
          ? `/actor/users/${user.id}`
          : user.type == LoginUserType.Marker
          ? `/maker/search`
          : '/')

      console.log('Redirecting', redurectTo)
      await router.push(redurectTo)
    }
  }
  // #endregion Functions
  // #region Veiw
  return (
    <>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent="center"
        height={'100vh'}
        style={{
          backgroundImage: `url(${'/common/app_title.png'})`,
          backgroundSize: 'cover',
        }}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignContent={'center'}
          alignItems="center"
        >
          <Box width="100%">
            {/*
                サインインフォームコンテナ
                SigninFormのユーザー名・パスワードから認証APIを呼び出し、
                onSigninコールバックが呼び出される
              */}
            <img
              src={'/common/app_logo.png'}
              height={'100vw'}
            />
            <SigninFormContainer onSignin={handleSignin} />
          </Box>
        </Flex>
      </Flex>
    </>
  )
  // #endregion Veiw
}

export default SigninPage
