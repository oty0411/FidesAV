import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
import SnackbarContent from '@mui/material/SnackbarContent'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import * as ST_Button from 'components/atoms/Button'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import { ApiContext, LoginUserType } from 'types/userTypes'
import { Alarm } from '@mui/icons-material'
import { useAuthContext } from 'contexts/AuthContext'

/**違反リスト */
const violationList = [
  { label: 1, text: '契約違反' },
  { label: 2, text: '引き抜き交渉' },
  { label: 3, text: '営業妨害' },
  { label: 4, text: '迷惑行為' },
  { label: 5, text: 'その他' },
]

const ViolationReportPage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // 通報対象のユーザータイプ
  const target_user_type = Number(router.query.targetUserType)
  // 通報対象のユーザーID
  const target_user_id = Number(router.query.id)
  const [checked, setChecked] = React.useState(false)

  // 評価ボタン
  const evaluationButtons = [
    <Button
      key="good"
      color="error"
      size="large"
      startIcon={<SentimentVerySatisfiedIcon />}
    >
      <Box marginRight={1}>GOOD</Box>
      <FormControlLabel value="1" control={<Radio />} label="" />
    </Button>,
    <Button
      key="normal"
      color="warning"
      size="large"
      startIcon={<SentimentSatisfiedIcon />}
    >
      <Box marginRight={1}>NORMAL</Box>
      <FormControlLabel value="2" control={<Radio />} label="" />
    </Button>,
    <Button key="bad" color="primary" size="large" startIcon={<MoodBadIcon />}>
      <Box marginRight={1}>BAD</Box>
      <FormControlLabel
        value="3"
        control={<Radio color="default" />}
        label=""
      />
    </Button>,
  ]
  // #endregion Fields

  // #region Functions
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  // 違反通報
  function postViolationReport() {
    // 投稿前確認
    if (!confirm('違反を通報しますか？')) {
      return
    }

    alert('違反内容が投稿されました。')
    // ログインユーザータイプごとに遷移先画面を切り替える
    if (authUser.type == LoginUserType.Actor) {
      router.push(`/actor/users/${target_user_id}`)
    } else {
      router.push(`/maker/search`)
    }
  }
  // #endregion Functions

  // #region View
  return (
    <Layout userType={authUser.type == LoginUserType.Actor ? 'actor' : 'maker'}>
      <MainPartLayout>
        <Separator />
        <Box height="100vh" width="100%">
          <Flex flexDirection={'column'}>
            <Text
              as="h3"
              fontWeight="bold"
              variant="mediumLarge"
              marginTop={0}
              paddingLeft={1}
            >
              違反行為通報
            </Text>
            <Box
              marginLeft={2}
              padding={2}
              backgroundColor={'white'}
              width="100%"
              paddingLeft={2}
              paddingRight={2}
            >
              <Flex
                justifyContent={'flex-start'}
                flexDirection={'column'}
                alignItems={'flex-start'}
              >
                {/* 違反内容 */}
                <Box width="100%" marginTop={0}>
                  <SnackbarContent
                    message="違反内容"
                    sx={{ backgroundColor: '#333333', color: '#ffffff' }}
                  />
                  <Box marginTop={2} marginLeft={2}>
                    <Flex
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      flexWrap={'wrap'}
                    >
                      {violationList.map((item) => {
                        return (
                          <ListItem key={item.label} disablePadding>
                            <ListItemButton role={undefined} dense>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  // checked={checked.indexOf('1') !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{
                                    'aria-labelledby': `checkbox-list-label-1`,
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText id={'1'} primary={item.text} />
                            </ListItemButton>
                          </ListItem>
                        )
                      })}
                      <Box width="100%" marginTop={2}>
                        <TextField
                          label="違反行為の説明"
                          // value={
                          //   '出演料が振込期日までに振り込まれていません。\n担当者から遅延の連絡もなく、現在連絡がつかない状況です。'
                          // }
                          multiline
                          fullWidth
                          variant="outlined"
                          color="primary"
                          maxRows={4}
                          rows={4}
                          focused
                          InputLabelProps={{ shrink: true }}
                        />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
                {/* 取引完了&評価投稿 */}
                <Box width="100%" marginTop={2}>
                  <Text>記載内容に偽りがないことを確認してください</Text>
                  <ST_Button.default
                    marginTop={1}
                    onClick={() => {
                      postViolationReport()
                    }}
                    //backgroundColor={'#333333'}
                    width={'100%'}
                  >
                    <Text variant="medium" color={'white'}>
                      同意して通報する
                    </Text>
                  </ST_Button.default>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default ViolationReportPage
