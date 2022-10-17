import * as React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import { UpdateUserProfileImage } from '../../../api/users'
import { GetUrlOfImageFileInDataServer } from '../../../utils'
import Button from 'components/atoms/Button'
import { PersonIcon } from 'components/atoms/IconButton'
import ImageUploadButton from 'components/atoms/ImageUploadButton'
import ShapeImage from 'components/atoms/ShapeImage'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'
import PlayConditionList from './PlayConditionList';

import {
  User,
  GetCopyObj_User,
  ApiContext,
  AppErrorCode,
} from 'types/userTypes'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface UserProfileProps {
  /**
   * バリアント（表示スタイル）
   */
  variant?: 'normal' | 'small'
  /**
   * ユーザー情報
   */
  user: User
  /**
   * 編集モードフラグ
   */
  editMode: boolean
  /**
   * プロフィール編集ボタンを押した時のイベントハンドラ
   */
  onTransitToEdit?: () => void
  /**
   * プロフィール保存ボタンを押した時のイベントハンドラ
   */
  onTransitToRef?: () => void
  /**
   * ユーザーデータ更新通知
   */
  updateUserData?: (user: User) => void
}

interface ShowPasswordGroup {
  password: boolean
  credit_card_number: boolean
  financial_institution_id: boolean
  bank_number: boolean
}

export default function UserProfile(props: UserProfileProps) {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  const userData = GetCopyObj_User(props.user)
  const [values, setValues] = React.useState<User>(props.user)
  const [showPasswords, setshowPasswords] = React.useState<ShowPasswordGroup>({
    password: false,
    credit_card_number: false,
    financial_institution_id: false,
    bank_number: false,
  })

  const profileImageSize = props.variant === 'small' ? '200px' : '360px'
  const profileImageSizeNumber = props.variant === 'small' ? 200 : 240
  // #endregion Fields

  const handleChange =
    (prop: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword,
  //   });
  // };

  // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };

  // #region Functions
  // 編集モード遷移の確認
  function confirmEntryToEditMode(): void {
    const result = confirm('プロフィールを編集しますか？')
    if (!result) {
      return
    }
    // 編集モードへ遷移
    props.onTransitToEdit && props.onTransitToEdit()
  }
  // パラメータ保存の確認
  function confirmSaveProfile(): void {
    const result = confirm('プロフィールを保存しますか？')
    if (!result) {
      return
    }
    // 参照モードへ遷移
    props.onTransitToRef && props.onTransitToRef()
  }
  // 画像ファイルアップロード
  function uploadImageToImageServer(formData: FormData) {
    console.log('image file received')
    console.log('form:', formData.get('file'))

    // 画像アップロード
    UpdateUserProfileImage(apiContext, props.user.id, formData).then(
      (apiResult) => {
        console.log(apiResult)
        if (apiResult.result.Code == AppErrorCode.Success) {
          // ユーザーデータ更新通知
          props.updateUserData && props.updateUserData(apiResult.data)
        }
      },
    )
  }
  // #endregion Functions

  return (
    <Flex flexDirection={'row'}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* プロフィールエリア */}
          {/* 左側エリア */}
          <Grid xs={4}>
            {/* ユーザー画像 */}
            {props.user?.image_path !== null && props.user?.image_path !== '' ? (
              // <ShapeImage
              //   shape="circle"
              //   quality="85"
              //   src={GetUrlOfImageFileInDataServer(props.user?.image_path)}
              //   alt={props.user?.user_name}
              //   height={profileImageSize}
              //   width={profileImageSize}
              // />
              <PersonIcon size={profileImageSizeNumber} />
            ) : (
              <PersonIcon size={profileImageSizeNumber} />
            )}
            {props.editMode ? (
              <>
                <Flex justifyContent={'flex-end'}>
                  <ImageUploadButton onPost={uploadImageToImageServer} />
                </Flex>
                <Button onClick={confirmSaveProfile} marginTop={2}>
                  <Text variant="small" color={'white'}>
                    プロフィールを保存
                  </Text>
                </Button>
              </>
            ) : (
              <>
                <Button onClick={confirmEntryToEditMode} marginTop={2}>
                  <Text variant="small" color={'white'}>
                    プロフィールを編集
                  </Text>
                </Button>
              </>
            )}
          </Grid>
          {/* 右側エリア */}
          <Grid xs={8}>
            <Grid xs={12}>
              <TextField
                label="ユーザー名"
                id="text-user-name"
                value={'佐倉 絆'}
                sx={{ m: 1, width: '25ch' }}
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid xs={12}>
              <Box paddingLeft={2}>
                <Grid xs={12}>
                  <Text
                    variant='large'
                    color={'red'}
                    padding={1}
                  >❤Profile</Text>
                </Grid>
                <Grid xs={6}>
                  <TextField
                    label="生年月日"
                    id="text-birthday"
                    value={'1989年5月30日'}
                    // sx={{ m: 1, width: '25ch' }}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    label="血液型"
                    id="text-blood-type"
                    value={'AB型'}
                    // sx={{ m: 1, width: '25ch' }}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    label="身長"
                    id="text-height"
                    value={'151cm'}
                    // sx={{ m: 1, width: '25ch' }}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    label="スリーサイズ"
                    id="text-3size"
                    value={'B83(Dカップ) W59 H84'}
                    // sx={{ m: 1, width: '25ch' }}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Box>
            </Grid>  
          </Grid>
          {/* プレイ条件エリア */}
          <Grid xs={12}>
            <Box>
              <Grid xs={12}>
                <Text
                  variant='large'
                  color={'red'}
                  padding={1}
                >❤PLAY</Text>
                <PlayConditionList/>
              </Grid>
            </Box>
          </Grid>
          {/* プレイ条件エリア */}
          <Grid xs={12}>
            <Box>
              <Grid xs={12}>
                <Text
                  variant='large'
                  color={'red'}
                  padding={1}
                >❤出演作</Text>
              </Grid>
            </Box>
          </Grid>  
        </Grid>
      </Box>
    </Flex>
  )
}
