import { useForm } from 'react-hook-form'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'

export type SigninFormData = {
  email: string
  password: string
}

interface SigninFormProps {
  /**
   * サインインボタンを押した時のイベントハンドラ
   */
  onSignin?: (email: string, password: string) => void
}

/**
 * サインインフォーム
 */
const SigninForm = ({ onSignin }: SigninFormProps) => {
  // React Hook Formの使用
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>()
  const onSubmit = (data: SigninFormData) => {
    const { email, password } = data

    onSignin && onSignin(email, password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={1}>
        {/* サインインユーザー名の入力 */}
        <Input
          {...register('email', { required: true })}
          name="email"
          type="text"
          placeholder="e-mail"
          hasError={!!errors.email}
          style={{ backgroundColor: '#E7E7FF', color: '#333333' }}
        />
        {errors.email && (
          <Text color="danger" variant="small" paddingLeft={1}>
            メールアドレスは必須です
          </Text>
        )}
      </Box>
      <Box marginBottom={2}>
        {/* サインインパスワードの入力 */}
        <Input
          {...register('password', { required: true })}
          name="password"
          type="password"
          placeholder="パスワード"
          hasError={!!errors.password}
          style={{ backgroundColor: '#E7E7FF', color: '#333333' }}
        />
        {errors.password && (
          <Text color="danger" variant="small" paddingLeft={1}>
            パスワードは必須です
          </Text>
        )}
      </Box>
      <Button width="100%" type="submit">
        サインイン
      </Button>
    </form>
  )
}

export default SigninForm
