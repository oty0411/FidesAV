import * as React from 'react'
import { useForm } from 'react-hook-form'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import { LoginUserType } from 'types/userTypes'

const SigninParams = {
  actor: {
    system_acount_id: 'sys1',
    email: 'actor0@gmaaaaaail.com',
    password: 'password',
  },
  maker: {
    system_acount_id: 'sys2',
    email: 'maker0@gmaaaaaail.com',
    password: 'password',
  },
}

export type SigninFormData = {
  system_acount_id: string
  email: string
  password: string
}

interface SigninFormProps {
  /**
   * サインインボタンを押した時のイベントハンドラ
   */
  onSignin?: (system_acount_id: string, email: string, password: string) => void
}

/**
 * サインインフォーム
 */
const SigninForm = ({ onSignin }: SigninFormProps) => {
  // #region Fields
  // デモ用ログインフラグ
  const ForDEMOLogin = true

  const [userType, setUserType] = React.useState('actor')
  // #endregion Fields

  // React Hook Formの使用
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>()

  // #region Functions
  const onSubmit = (data: SigninFormData) => {
    const { system_acount_id, email, password } = data
    onSignin && onSignin(system_acount_id, email, password)
  }

  const onSubmitForDemo = () => {
    const { system_acount_id, email, password } =
      userType == 'actor' ? SigninParams.actor : SigninParams.maker
    onSignin && onSignin(system_acount_id, email, password)
  }

  // デモ用ログインのラジオボタン
  const handleChangeUserType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value)
  }
  // #region Functions

  return (
    <>
      {ForDEMOLogin ? (
        <>
          <Box backgroundColor={'#ffddddaa'} padding={1}>
            <Flex justifyContent={'center'}>
              <FormControl>
                <FormLabel color="primary">ユーザータイプ</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="actor"
                  name="radio-buttons-group"
                  onChange={handleChangeUserType}
                >
                  <FormControlLabel
                    value="actor"
                    control={<Radio />}
                    label="女優ユーザー"
                  />
                  <FormControlLabel
                    value="maker"
                    control={<Radio />}
                    label="制作者ユーザー"
                  />
                </RadioGroup>
              </FormControl>
            </Flex>
          </Box>
          <Button
            width="100%"
            onClick={onSubmitForDemo}
            marginTop={1}
            backgroundColor={'#BB99BB'}
            color={'#111111'}
          >
            サインイン
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginBottom={1}>
            {/* システムアカウントIDの入力 */}
            <Input
              {...register('system_acount_id', { required: true })}
              name="system_acount_id"
              type="text"
              placeholder="システムアカウントID"
              hasError={!!errors.system_acount_id}
              style={{ backgroundColor: '#E7E7FF', color: '#333333' }}
              defaultValue={'sys1'}
              //value={'sys1'}
            />
            {errors.system_acount_id && (
              <Text color="danger" variant="small" paddingLeft={1}>
                システムアカウントIDの入力は必須です
              </Text>
            )}
          </Box>
          <Box marginBottom={1}>
            {/* サインインユーザー名の入力 */}
            <Input
              {...register('email', { required: true })}
              name="email"
              type="text"
              placeholder="Eメールアドレス"
              hasError={!!errors.email}
              style={{ backgroundColor: '#E7E7FF', color: '#333333' }}
              defaultValue={'actor0@gmaaaaaail.com'}
              //value={'actor0@gmaaaaaail.com'} // user id 5
            />
            {errors.email && (
              <Text color="danger" variant="small" paddingLeft={1}>
                メールアドレスの入力は必須です
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
              defaultValue={'password'}
              //value={'password'}
            />
            {errors.password && (
              <Text color="danger" variant="small" paddingLeft={1}>
                パスワードの入力は必須です
              </Text>
            )}
          </Box>
          <Button width="100%" type="submit">
            サインイン
          </Button>
        </form>
      )}
    </>
  )
}

export default SigninForm
