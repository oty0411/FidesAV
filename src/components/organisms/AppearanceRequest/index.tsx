import * as MuiBox from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import SnackbarContent from '@mui/material/SnackbarContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import TextField from '@mui/material/TextField'
import { alpha, styled } from '@mui/material/styles'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as UserTypes from '../../../types/userTypes'
import Button from 'components/atoms/Button'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

interface AppearanceRequestPostFormProps {
  /**
   * 送信ボタンを押した時のイベントハンドラ
   */
  onPost?: (formData: UserTypes.Offer) => void
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'start',
  color: theme.palette.text.primary,
}))

// 情報表示用タグ
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 18,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))

// 条件リスト
type Condition = {
  label: string
  id: string
}

const ConditionList: Condition[] = [
  { label: 'メイク付', id: 'makeup' },
  { label: '貸衣装', id: 'rental_costume' },
  { label: '控室(個室)', id: 'private_room' },
  { label: '控室(相部屋)', id: 'shared_room' },
  { label: '送迎', id: 'pick_up' },
  { label: '食事', id: 'meal' },
]

/**
 * 出演依頼フォーム
 */
export const AppearanceRequestPostForm = (
  props: AppearanceRequestPostFormProps,
) => {
  // React Hook Formの使用
  const [checkBoxStates, setCheckBoxStates] = React.useState(
    ConditionList.map((item) => {
      return {
        label: item.label,
        id: item.id,
        checked: false,
      }
    }),
  )

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserTypes.Offer>({
    mode: 'onBlur',
  })

  // Form submit時イベントハンドラ
  const onSubmit = (formData: UserTypes.Offer) => {
    // チェックボックスの値セット
    // メイク付
    formData.makeup = checkBoxStates[
      ConditionList.findIndex((item) => item.id == 'makeup')
    ].checked
      ? UserTypes.BoolWithInt.True
      : UserTypes.BoolWithInt.False
    // 貸衣裳
    formData.rental_costume = checkBoxStates[
      ConditionList.findIndex((item) => item.id == 'rental_costume')
    ].checked
      ? UserTypes.BoolWithInt.True
      : UserTypes.BoolWithInt.False
    // 控室(個室)
    formData.private_room = checkBoxStates[
      ConditionList.findIndex((item) => item.id == 'private_room')
    ].checked
      ? UserTypes.BoolWithInt.True
      : UserTypes.BoolWithInt.False
    // 控室(相部屋)
    formData.shared_room = checkBoxStates[
      ConditionList.findIndex((item) => item.id == 'shared_room')
    ].checked
      ? UserTypes.BoolWithInt.True
      : UserTypes.BoolWithInt.False
    // 送迎
    formData.pick_up = checkBoxStates[
      ConditionList.findIndex((item) => item.id == 'pick_up')
    ].checked
      ? UserTypes.BoolWithInt.True
      : UserTypes.BoolWithInt.False
    // 食事
    formData.meal = checkBoxStates[
      ConditionList.findIndex((item) => item.id == 'meal')
    ].checked
      ? UserTypes.BoolWithInt.True
      : UserTypes.BoolWithInt.False

    //console.log(formData)
    props.onPost && props.onPost(formData)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(event)
    checkBoxStates[
      checkBoxStates.findIndex((item) => item.id == event.target.name)
    ].checked = event.target.checked
    setCheckBoxStates([...checkBoxStates])
    //console.log(checkBoxStates)
  }

  return (
    <Box padding={3} backgroundColor={'white'}>
      <Flex justifyContent={'center'} flexDirection={'column'}>
        {/*情報入力フォーム*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginBottom={1}>
            <Flex justifyContent={'flex-start'} flexDirection={'column'}>
              {/*出演料*/}
              <Box marginTop={0}>
                <TextField
                  {...register('fee', { required: true })}
                  label="出演料[円]"
                  // value={'1,000,000円'}
                  fullWidth
                  variant="standard"
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
                {errors.fee && (
                  <Text color="danger" variant="small" paddingLeft={1}>
                    出演料の入力は必須です
                  </Text>
                )}
              </Box>
              {/*タイトル*/}
              <Box marginTop={1}>
                <TextField
                  {...register('title', { required: true })}
                  label="タイトル"
                  // value={
                  //   'AV女優ありな先生のネチョネチョ、レロレロ 大人のベロキス誘惑接吻レクチャー'
                  // }
                  multiline
                  fullWidth
                  variant="standard"
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
                {errors.title && (
                  <Text color="danger" variant="small" paddingLeft={1}>
                    タイトルの入力は必須です
                  </Text>
                )}
              </Box>
              {/*企画概要*/}
              <Box marginTop={1}>
                <TextField
                  {...register('summary', { required: true })}
                  id="outlined-multiline-flexible"
                  label="企画概要"
                  multiline
                  fullWidth
                  color="primary"
                  variant="standard"
                  // maxRows={4}
                  rows={3}
                  // value={
                  //   '甘く、激しく誘惑接吻レクチャー！！ヨダレだらだら唾液ねっちょりレロレロ…キスで求め合う超濃厚エクスタシー！見つめて感じる大人の接吻SEX！キスの女神、ありーな。やっぱりエロい。舌を絡ませて唾液交換、唇を重ね合ってピストン！！ヨダレたっぷりベロキス6コーナー3本番！！キスがへたっぴなアナタのために…優しくてエロい手ほどきキスリードSEX！！'
                  // }
                  focused
                  InputLabelProps={{ shrink: true }}
                />
                {errors.fee && (
                  <Text color="danger" variant="small" paddingLeft={1}>
                    企画概要の入力は必須です
                  </Text>
                )}
              </Box>
              {/*撮影日時*/}
              <Box marginTop={1}>
                <TextField
                  {...register('date_time', { required: true })}
                  label="撮影日時 (例)2022/10/28 10:00 - 2022/10/28 18:00"
                  // value={'2022/10/28 10:00 - 2022/10/28 18:00'}
                  fullWidth
                  variant="standard"
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
                {errors.date_time && (
                  <Text color="danger" variant="small" paddingLeft={1}>
                    撮影日時の入力は必須です
                  </Text>
                )}
              </Box>
              {/*撮影場所*/}
              <Box marginTop={1}>
                <TextField
                  {...register('place', { required: true })}
                  label="撮影場所(住所)"
                  // value={'福岡県福岡市中央区大名 1-3-41'}
                  fullWidth
                  variant="standard"
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
                {errors.place && (
                  <Text color="danger" variant="small" paddingLeft={1}>
                    撮影場所の入力は必須です
                  </Text>
                )}
              </Box>
              {/*その他条件*/}
              <Box marginTop={2}>
                <SnackbarContent
                  message="その他条件"
                  sx={{ backgroundColor: '#333333', color: '#ffffff' }}
                />
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormGroup row>
                    <Flex
                      flexDirection={'row'}
                      flexWrap={'wrap'}
                      justifyContent={'flex-start'}
                      alignContent={'flex-start'}
                      alignItems={'flex-start'}
                    >
                      {checkBoxStates.map((item) => {
                        return (
                          <MuiBox.default
                            key={item.id}
                            minWidth={'180px'}
                            margin={1}
                          >
                            <Item>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={item.checked}
                                    onChange={handleChange}
                                    name={item.id}
                                  />
                                }
                                label={item.label}
                              />
                            </Item>
                          </MuiBox.default>
                        )
                      })}
                    </Flex>
                  </FormGroup>
                </FormControl>
              </Box>
              {/*メッセージ*/}
              <Box marginTop={1}>
                <TextField
                  {...register('message', { required: true })}
                  id="outlined-multiline-flexible"
                  label="メッセージ"
                  multiline
                  fullWidth
                  color="primary"
                  variant="outlined"
                  // maxRows={4}
                  rows={3}
                  // value={
                  //   '正式に出演依頼を提出させていただきます。どうぞよろしくお願いいたします。'
                  // }
                  focused
                  InputLabelProps={{ shrink: true }}
                />
                {errors.message && (
                  <Text color="danger" variant="small" paddingLeft={1}>
                    メッセージの入力は必須です
                  </Text>
                )}
              </Box>
              {/* 申請ボタン */}
              <Box margin={2}>
                <Flex justifyContent={'center'}>
                  <Button type="submit">送信</Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </form>
      </Flex>
    </Box>
  )
}
