import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import SnackbarContent from '@mui/material/SnackbarContent'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import * as React from 'react'
import { GetUrlOfImageFileInDataServer } from '../../../utils'
import Button from 'components/atoms/Button'
import { PersonIcon } from 'components/atoms/IconButton'
import ImageUploadButton from 'components/atoms/ImageUploadButton'
import ShapeImage from 'components/atoms/ShapeImage'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'
import MovieTitleCardListContainer from 'containers/MovieTitleCardListContainer'

import {
  MakerUser,
  ApiContext,
  AppErrorCode,
  LoginUserType,
} from 'types/userTypes'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

interface MakerUserProfileProps {
  /**
   * バリアント（表示スタイル）
   */
  variant?: 'normal' | 'small'
  /**
   * ユーザー情報
   */
  user: MakerUser
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
  updateUserData?: (user: MakerUser) => void
}

export default function MakerUserProfile(props: MakerUserProfileProps) {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  const router = useRouter()
  const [userData, setUserData] = React.useState<MakerUser>(props.user)

  // 出演作ロード中
  const [isLoading, setIsLoading] = useState(false)

  const profileImageSize = props.variant === 'small' ? '200px' : '300px'
  const profileImageSizeNumber = props.variant === 'small' ? 200 : 240
  // #endregion Fields

  // #region Functions
  // 初期化処理
  useEffect(() => {
    setUserData(props.user)
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
  }
  // #endregion Functions

  return (
    <Flex flexDirection={'column'} width={'100%'}>
      {/* プロフィールエリア */}
      <Box>
        <Text variant="large" color={'#333333'} padding={1}>
          {userData?.maker_name}
        </Text>
        <Flex
          flexDirection={'row'}
          flexWrap={'wrap'}
          justifyContent={'space-around'}
          alignContent={'flex-start'}
          alignItems={'flex-start'}
        >
          {/* 左側エリア */}
          <Box width={'30%'} /*minWidth={'300px'}*/ margin={2}>
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
                  alt={props.user?.maker_name}
                  width={profileImageSize}
                  height={profileImageSize}
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
                  <Flex
                    width={'100%'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                  >
                    {/* メッセージボタン */}
                    <Button
                      onClick={() => {
                        router.push(
                          `/message/chat?targetUserId=${Number(
                            router.query.id,
                          )}`,
                        )
                      }}
                      backgroundColor={'#333333'}
                      marginLeft={1}
                      marginTop={2}
                    >
                      <Text variant="small" color={'white'}>
                        メッセージ
                      </Text>
                    </Button>
                    {/* 違反通報ボタン */}
                    <Button
                      onClick={() => {
                        router.push(
                          `/violation_report/${props.user.id}?targetUserType=${LoginUserType.Marker}`,
                        )
                      }}
                      backgroundColor={'#aa3333'}
                      marginLeft={1}
                      marginTop={2}
                    >
                      <Text variant="small" color={'white'}>
                        違反通報
                      </Text>
                    </Button>
                  </Flex>
                </Box>
              )}
            </Flex>
          </Box>
          {/* 右側エリア */}
          <Box width={'50%'} /*minWidth={'300px'}*/ margin={2}>
            <Flex flexDirection={'column'}>
              <SnackbarContent
                message="プロフィール"
                sx={{ backgroundColor: '#333333', color: '#ffffff' }}
              />
              <Box marginLeft={2} marginTop={2}>
                <Flex>
                  <Box marginLeft={2}>
                    <Box>
                      <TextField
                        label="メールアドレス"
                        id="text-email"
                        value={userData?.email}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <TextField
                        label="ホームページURL"
                        id="text-home-url"
                        value={userData?.url}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box marginTop={1}>
                      <Button
                        onClick={() => {
                          window.open(userData?.url)
                        }}
                        marginTop={2}
                        width={'100%'}
                      >
                        <Text variant="small" color={'white'}>
                          Link
                        </Text>
                      </Button>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      {/* 作品エリア */}
      <Box>
        {/* 作品カードリストコンテナ 検索結果からカードリストを表示 */}
        <Box marginLeft={2} marginTop={2}>
          <SnackbarContent
            message="作品一覧"
            sx={{ backgroundColor: '#333333', color: '#ffffff' }}
          />
        </Box>
      </Box>
    </Flex>
  )
}
