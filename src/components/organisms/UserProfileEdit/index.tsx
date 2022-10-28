import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import SnackbarContent from '@mui/material/SnackbarContent'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import * as React from 'react'
import {
  UpdateUserProfileImage,
  GetActorPlayCondition,
  GetActorPortfolio,
} from '../../../api/users'
import { GetUrlOfImageFileInDataServer } from '../../../utils'
import PlayConditionList from './PlayConditionList'
import Button from 'components/atoms/Button'
import { PersonIcon } from 'components/atoms/IconButton'
import ImageUploadButton from 'components/atoms/ImageUploadButton'
import ShapeImage from 'components/atoms/ShapeImage'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'
import MovieTitleCardListContainer from 'containers/MovieTitleCardListContainer'

import {
  User,
  PlayCondition,
  Portfolio,
  GetObj_PlayCondition,
  ConvertToStringBloodType,
  ConvertToStringBreastSize,
  ApiContext,
  AppErrorCode,
  ConvertToStringClothesSizeType,
  GetObj_User,
  BloodType,
  ClothesSizeType,
  BreastSizeType,
} from 'types/userTypes'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

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
   * 表示モード
   */
  view_mode_mine: boolean
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

export default function UserProfileForEdit(props: UserProfileProps) {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  const router = useRouter()
  const [userData, setUserData] = React.useState<User>(props.user)

  // プレイ条件
  const [playConditions, setPlayConditions] = useState<PlayCondition>(
    GetObj_PlayCondition(),
  )
  // 出演作ロード中
  const [isLoading, setIsLoading] = useState(false)

  const [birthDayValue, setBirthDayValue] = React.useState<Dayjs | null>(
    dayjs(new Date(props.user.birthday).toLocaleDateString()),
  )

  const profileImageSize = props.variant === 'small' ? '200px' : '300px'
  const profileImageSizeNumber = props.variant === 'small' ? 200 : 240
  // #endregion Fields

  // #region Functions
  // 初期化処理
  useEffect(() => {
    setIsLoading(true)

    setUserData(props.user)

    // プレイ条件取得
    GetActorPlayCondition(apiContext, props.user.id).then((apiResult) => {
      //console.log(apiResult);
      if (apiResult.result.Code == AppErrorCode.Success) {
        setPlayConditions(apiResult.data)
        console.log(playConditions)
      }
    })
  }, [])

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
    <Flex flexDirection={'column'}>
      {/* プロフィールエリア */}
      <Box>
        <Text variant="large" color={'#333333'} padding={1}>
          {userData?.user_name}
        </Text>
        <Flex
          flexDirection={'row'}
          flexWrap={'wrap'}
          justifyContent={'space-around'}
          alignContent={'flex-start'}
          alignItems={'flex-start'}
        >
          {/* 左側エリア */}
          <Box sx={{ width: { xs:'100%', md:'30%'} }} margin={2}>
            <Flex
              flexDirection={'column'}
              flexWrap={'wrap'}
              justifyContent={'center'}
              alignContent={'center'}
              alignItems={'center'}
            >
              {props.user?.image_path !== null &&
              props.user?.image_path !== '' ? (
                <ShapeImage
                  shape="square"
                  quality="100"
                  src={
                    props.user?.image_path.startsWith('storage')
                      ? GetUrlOfImageFileInDataServer(props.user?.image_path)
                      : props.user?.image_path
                  }
                  alt={props.user?.user_name}
                  width={profileImageSize}
                  height={profileImageSize}
                />
              ) : (
                <PersonIcon size={profileImageSizeNumber} />
              )}
              <>
                <Flex justifyContent={'flex-end'}>
                  <ImageUploadButton onPost={uploadImageToImageServer} />
                </Flex>
                <Button
                  onClick={confirmSaveProfile}
                  backgroundColor={'#333333'}
                  marginTop={2}
                >
                  <Text variant="small" color={'white'}>
                    プロフィールを保存
                  </Text>
                </Button>
              </>
            </Flex>
          </Box>
          {/* 右側エリア */}
          <Box sx={{ width: { xs:'100%', md:'50%'} }} margin={2}>
            <Flex flexDirection={'column'}>
              <SnackbarContent
                message="プロフィール"
                sx={{ backgroundColor: '#333333', color: '#ffffff' }}
              />
              <Box marginLeft={2} marginTop={2}>
                <Flex flexWrap={'wrap'}>
                  {/* 1列目 */}
                  <Box
                    marginLeft={2}
                    marginRight={1}
                    marginBottom={1}
                  >
                    <Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          label="誕生日"
                          inputFormat="YYYY/MM/DD"
                          value={birthDayValue}
                          onChange={(newValue: Dayjs | null) => {
                            setBirthDayValue(newValue)
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Box>
                    <Box marginTop={1}>
                      <FormControl
                        variant="standard"
                        sx={{ m: 0, minWidth: 195 }}
                      >
                        <InputLabel id="Input-label-blood_type">
                          血液型
                        </InputLabel>
                        <Select
                          labelId="Select-label-blood_type"
                          id="Id-blood_type"
                          value={userData?.blood_type}
                          label="BloodType"
                        >
                          {/* <MenuItem value={userData?.blood_type}>
                            <em>不明</em>
                          </MenuItem> */}
                          <MenuItem value={BloodType.A}>A型</MenuItem>
                          <MenuItem value={BloodType.B}>B型</MenuItem>
                          <MenuItem value={BloodType.O}>O型</MenuItem>
                          <MenuItem value={BloodType.AB}>AB型</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="身長[cm]"
                        id="text-height"
                        defaultValue={userData?.height}
                        onChange={(event) => {
                          userData.height = Number(event.target.value)
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="体重[kg]"
                        id="text-weight"
                        defaultValue={userData?.weight}
                        onChange={(event) => {
                          userData.weight = Number(event.target.value)
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                  </Box>
                   {/* 2列目 */}
                  <Box marginLeft={2}>
                    <Box>
                      <FormControl
                        variant="standard"
                        sx={{ m: 0, minWidth: 195 }}
                      >
                        <InputLabel id="Input-label-clothes_size">
                          服サイズ
                        </InputLabel>
                        <Select
                          labelId="Select-label-clothes_size"
                          id="Id-clothes_size"
                          value={userData?.clothes_size}
                          label="clothes_size"
                        >
                          {/* <MenuItem value={userData?.clothes_size}>
                            <em>不明</em>
                          </MenuItem> */}
                          <MenuItem value={ClothesSizeType.SS}>SS</MenuItem>
                          <MenuItem value={ClothesSizeType.S}>S</MenuItem>
                          <MenuItem value={ClothesSizeType.M}>M</MenuItem>
                          <MenuItem value={ClothesSizeType.L}>L</MenuItem>
                          <MenuItem value={ClothesSizeType.L2}>2L</MenuItem>
                          <MenuItem value={ClothesSizeType.L3}>3L</MenuItem>
                          <MenuItem value={ClothesSizeType.L4}>4L</MenuItem>
                          <MenuItem value={ClothesSizeType.L5}>5L</MenuItem>
                          <MenuItem value={ClothesSizeType.L6}>6L</MenuItem>
                          <MenuItem value={ClothesSizeType.L7}>7L</MenuItem>
                          <MenuItem value={ClothesSizeType.L8}>8L</MenuItem>
                          <MenuItem value={ClothesSizeType.L9}>9L</MenuItem>
                          <MenuItem value={ClothesSizeType.L10}>10L</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="靴サイズ"
                        id="text-shoes_size"
                        defaultValue={userData?.shoes_size}
                        onChange={(event) => {
                          userData.shoes_size = Number(event.target.value)
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="バストサイズ[cm]"
                        id="text-breast_top_size"
                        defaultValue={userData?.breast_top_size}
                        onChange={(event) => {
                          userData.breast_top_size = Number(event.target.value)
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <FormControl
                        variant="standard"
                        sx={{ m: 0, minWidth: 195 }}
                      >
                        <InputLabel id="Input-label-breast_size">
                          カップサイズ
                        </InputLabel>
                        <Select
                          labelId="Select-label-breast_size"
                          id="Id-breast_size"
                          value={userData?.breast_size}
                          label="breast_size"
                        >
                          {/* <MenuItem value={userData?.breast_size}>
                            <em>不明</em>
                          </MenuItem> */}
                          <MenuItem value={BreastSizeType.A}>A</MenuItem>
                          <MenuItem value={BreastSizeType.B}>B</MenuItem>
                          <MenuItem value={BreastSizeType.C}>C</MenuItem>
                          <MenuItem value={BreastSizeType.D}>D</MenuItem>
                          <MenuItem value={BreastSizeType.E}>E</MenuItem>
                          <MenuItem value={BreastSizeType.F}>F</MenuItem>
                          <MenuItem value={BreastSizeType.G}>G</MenuItem>
                          <MenuItem value={BreastSizeType.H}>H</MenuItem>
                          <MenuItem value={BreastSizeType.I}>I</MenuItem>
                          <MenuItem value={BreastSizeType.J}>J</MenuItem>
                          <MenuItem value={BreastSizeType.K}>K</MenuItem>
                          <MenuItem value={BreastSizeType.L}>L</MenuItem>
                          <MenuItem value={BreastSizeType.M}>M</MenuItem>
                          <MenuItem value={BreastSizeType.N}>N</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="ウェストサイズ[cm]"
                        id="text-waist_size"
                        defaultValue={userData?.waist_size}
                        onChange={(event) => {
                          userData.waist_size = Number(event.target.value)
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="ヒップサイズ[cm]"
                        id="text-hip_size"
                        defaultValue={userData?.hip_size}
                        onChange={(event) => {
                          userData.hip_size = Number(event.target.value)
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      {/* プレイ条件エリア */}
      <Box>
        <SnackbarContent
          message="プレイ条件"
          sx={{ backgroundColor: '#333333', color: '#ffffff' }}
        />
        <PlayConditionList conditions={playConditions} />
      </Box>
    </Flex>
  )
}
