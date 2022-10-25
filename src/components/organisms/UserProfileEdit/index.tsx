import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import SnackbarContent from '@mui/material/SnackbarContent'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
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

  const profileImageSize = props.variant === 'small' ? '200px' : '300px'
  const profileImageSizeNumber = props.variant === 'small' ? 200 : 240
  // #endregion Fields

  // #region Functions
  // 初期化処理
  useEffect(() => {
    setIsLoading(true)

    setUserData(props.user)

    // プレイ条件取得
    GetActorPlayCondition(apiContext, userData?.id ? userData.id : 1).then(
      (apiResult) => {
        //console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          setPlayConditions(apiResult.data)
          console.log(playConditions)
        }
      },
    )
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
          <Box width={'30%'}/*minWidth={'300px'}*/ margin={2}>
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
          <Box width={'50%'} /*minWidth={'300px'}*/ margin={2}>
            <Flex flexDirection={'column'}>
              {/* <Text variant="large" color={'#333333'} padding={1}>
                佐倉絆
              </Text> */}
              <SnackbarContent
                message="プロフィール"
                sx={{ backgroundColor: '#333333', color: '#ffffff' }}
              />
              <Box marginLeft={2} marginTop={2}>
                <Flex>
                  <Box marginLeft={2}>
                    <Box>
                      <TextField
                        label="生年月日"
                        id="text-birthday"
                        value={userData?.birthday}
                        onChange={(event) => {
                          userData.birthday = event.target.value
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        // sx={{ m: 1, width: '25ch' }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="血液型"
                        id="text-blood-type"
                        value={ConvertToStringBloodType(userData?.blood_type)}
                        onChange={(event) => {
                          userData.blood_type = event.target.value
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        // sx={{ m: 1, width: '25ch' }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="身長[cm]"
                        id="text-height"
                        value={userData?.height}
                        onChange={(event) => {
                          userData.height = event.target.value
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        // sx={{ m: 1, width: '25ch' }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="体重[kg]"
                        id="text-weight"
                        value={userData?.weight}
                        onChange={(event) => {
                          userData.weight = event.target.value
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        // sx={{ m: 1, width: '25ch' }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                  </Box>
                  <Box marginLeft={3}>
                    <Box>
                      <TextField
                        label="服サイズ"
                        id="text-clothes_size"
                        value={ConvertToStringClothesSizeType(userData?.clothes_size)}
                        onChange={(event) => {
                          userData.clothes_size = event.target.value
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        // sx={{ m: 1, width: '25ch' }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="靴サイズ"
                        id="text-shoes_size"
                        value={userData?.shoes_size}
                        onChange={(event) => {
                          userData.shoes_size = event.target.value
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        // sx={{ m: 1, width: '25ch' }}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="スリーサイズ[cm]"
                        id="text-3size"
                        value={`B${
                          userData?.breast_top_size
                        }(${ConvertToStringBreastSize(
                          userData?.breast_size,
                        )}カップ) W${userData?.waist_size} H${userData?.hip_size}`}
                        onChange={(event) => {
                          userData.waist_size = event.target.value
                          const newObj = GetObj_User()
                          setUserData(Object.assign(newObj, userData))
                        }}
                        //value={'B83(Dカップ) W59 H84'}
                        // sx={{ m: 1, width: '25ch' }}
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
