import { signinActor, signinMaker, SigninParams } from '../api/auth/signin'
import {
  ApiContext,
  AuthUser,
  AppErrorCode,
  LoginUserType,
} from '../types/userTypes'
import SigninForm from 'components/organisms/SigninForm'
import { useGlobalSpinnerActionsContext } from 'contexts/GlobalSpinnerContext'

interface SigninFormContainerProps {
  /**
   * サインインした時に呼ばれるイベントハンドラ
   */
  onSignin: (user: AuthUser, error?: Error) => void
}

/**
 * サインインフォームコンテナ
 */
const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // サインインボタンを押された時のイベントハンドラ
  const handleSignin = async (email: string, password: string) => {
    const userType = LoginUserType.Actor

    try {
      // ローディングスピナーを表示する
      setGlobalSpinner(true)
      const targetUser: SigninParams = {
        email: email,
        password: password,
      }

      const apiContext: ApiContext = {
        apiRootUrl:
          process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
      }
      await signinActor(apiContext, targetUser).then((apiResult) => {
        if (apiResult.result.Code == AppErrorCode.Success) {
          const loggedInUser: AuthUser = {
            id: apiResult.data.id,
            type: userType,
            user_name: apiResult.data.user_name,
            profile_image_path: apiResult.data.image_path,
          }
          // console.log("loggedInUser user is ...");
          // console.log(loggedInUser);
          onSignin && onSignin(loggedInUser)
        } else {
          alert('ログインに失敗しました。')
          const unAuthUser: AuthUser = {
            id: -1,
            type: userType,
            user_name: 'anonymous',
            profile_image_path: '',
          }
          const err = { cause: 'signin failed.' }
          if (err instanceof Error) {
            // エラーの内容を表示
            alert(err.message)
            onSignin && onSignin(unAuthUser, err)
          }
        }
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        // エラーの内容を表示
        alert(err.message)
        const unAuthUser: AuthUser = {
          id: -1,
          type: userType,
          user_name: 'anonymous',
          profile_image_path: '',
        }
        onSignin && onSignin(unAuthUser, err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <SigninForm onSignin={handleSignin} />
}

export default SigninFormContainer
