import { signin, SigninParams } from '../api/auth/signin'
import {
  ApiContext,
  AuthUser,
  AppErrorCode,
  LoginUserType,
  GetDefaultAuthUser,
  GetObj_SystemAcount,
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
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  // #endregion Fields

  // #region Functions
  // サインインボタンを押された時のイベントハンドラ
  const handleSignin = async (
    system_acount_id: string,
    email: string,
    password: string) => {
    try {
      // ローディングスピナーを表示する
      setGlobalSpinner(true)
      
      // サインインパラメータ(両ユーザータイプで共通)
      const targetUser: SigninParams = {
        login_id: system_acount_id,
        email: email,
        password: password,
      }

      // サインイン実行
      await signin(apiContext, targetUser).then((apiResult) => {
        if (apiResult.result.Code == AppErrorCode.Success) {
          const loggedInUser: AuthUser = apiResult.data
          // console.log("loggedInUser user is ...");
          // console.log(loggedInUser);
          onSignin && onSignin(loggedInUser)
        } else {
          alert('ログインに失敗しました。')
          const unAuthUser: AuthUser = GetDefaultAuthUser()
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
        const unAuthUser: AuthUser = GetDefaultAuthUser()
        onSignin && onSignin(unAuthUser, err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }
  // #endregion Functions

  return <SigninForm onSignin={handleSignin} />
}

export default SigninFormContainer
