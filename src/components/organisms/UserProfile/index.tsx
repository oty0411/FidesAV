import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import SnackbarContent from '@mui/material/SnackbarContent'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
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
  GetCopyObj_User,
  PlayCondition,
  Portfolio,
  GetObj_PlayCondition,
  GetObj_Portfolio,
  ConvertToStringBloodType,
  ConvertToStringBreastSize,
  ApiContext,
  AppErrorCode,
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

export default function UserProfile(props: UserProfileProps) {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  const router = useRouter()
  const [userData, setUserData] = React.useState<User>(GetObj_User())
  const [values, setValues] = React.useState<User>(props.user)
  const [showPasswords, setshowPasswords] = React.useState<ShowPasswordGroup>({
    password: false,
    credit_card_number: false,
    financial_institution_id: false,
    bank_number: false,
  })
  // プレイ条件
  const [playConditions, setPlayConditions] = useState<PlayCondition>(
    GetObj_PlayCondition(),
  )
  // 出演作
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  // 出演作ロード中
  const [isLoading, setIsLoading] = useState(false)

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

    // ポートフォリオ一覧取得
    GetActorPortfolio(apiContext, userData?.id ? userData.id : 1).then(
      (apiResult) => {
        //console.log(apiResult);
        if (apiResult.result.Code == AppErrorCode.Success) {
          setPortfolios(apiResult.data)
          console.log(portfolios)
        }
        setIsLoading(false)
      },
    )
  }, [props.user])

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
          <Box minWidth={'300px'} margin={2}>
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
                  quality="85"
                  src={GetUrlOfImageFileInDataServer(props.user?.image_path)}
                  alt={props.user?.user_name}
                  height={profileImageSize}
                  width={profileImageSize}
                />
              ) : (
                <PersonIcon size={profileImageSizeNumber} />
              )}
              {props.view_mode_mine ? (
                props.editMode ? (
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
                ) : (
                  <>
                    <Button
                      onClick={confirmEntryToEditMode}
                      backgroundColor={'#333333'}
                      marginTop={2}
                    >
                      <Text variant="small" color={'white'}>
                        プロフィールを編集
                      </Text>
                    </Button>
                  </>
                )
              ) : (
                <Box>
                  <Flex flexDirection={'row'} justifyContent={'space-between'}>
                    {/* スケジュールボタン */}
                    <Button
                      onClick={() => {
                        router.push(`/actor/schedule/${props.user.id}`)
                      }}
                      backgroundColor={'#333333'}
                      marginLeft={1}
                      marginTop={2}
                    >
                      <Text variant="small" color={'white'}>
                        スケジュール
                      </Text>
                    </Button>
                    {/* メッセージボタン */}
                    <Button
                      onClick={() => {
                        router.push(`/message/chat`)
                      }}
                      backgroundColor={'#333333'}
                      marginLeft={1}
                      marginTop={2}
                    >
                      <Text variant="small" color={'white'}>
                        メッセージ
                      </Text>
                    </Button>
                  </Flex>
                </Box>
              )}
            </Flex>
          </Box>
          {/* 右側エリア */}
          <Box minWidth={'300px'} margin={2}>
            <Flex flexDirection={'column'}>
              {/* <Text variant="large" color={'#333333'} padding={1}>
                佐倉絆
              </Text> */}
              <SnackbarContent
                message="プロフィール"
                sx={{ backgroundColor: '#333333', color: '#ffffff' }}
              />
              <Box marginLeft={2} marginTop={2}>
                <Box>
                  <TextField
                    label="生年月日"
                    id="text-birthday"
                    value={userData?.birthday}
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
      {/* プレイ条件エリア */}
      <Box>
        <SnackbarContent
          message="プレイ条件"
          sx={{ backgroundColor: '#333333', color: '#ffffff' }}
        />
        <PlayConditionList conditions={playConditions} />
      </Box>
      {/* 出演作エリア */}
      <Box>
        {/* 女優カードリストコンテナ 検索結果からカードリストを表示 */}
        <Box marginLeft={2} marginTop={2}>
          <SnackbarContent
            message="出演作"
            sx={{ backgroundColor: '#333333', color: '#ffffff' }}
          />
          <Box marginTop={1}>
            <MovieTitleCardListContainer
              isLoading={isLoading}
              portfolios={portfolios}
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}
