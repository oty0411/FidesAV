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
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as UserTypes from '../../../types/userTypes'
import Button from 'components/atoms/Button'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

interface AppearanceRequestResponsePostFormProps {
  offer: UserTypes.Offer
  /**
   * 送信ボタンを押した時のイベントハンドラ
   */
  onPost?: (formData: UserTypes.OfferResponse) => void
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
export const AppearanceRequestResponsePostForm = (
  props: AppearanceRequestResponsePostFormProps,
) => {
  // トグルボタンコントロールの入力値(契約する or 契約しない)
  const [agreementValue, setAgreementValue] = React.useState(
    UserTypes.OfferResponseType.NoContract,
  )

  // チェックボックスの値格納
  const [checkBoxStates, setCheckBoxStates] = React.useState(
    getCheckBoxStates(props.offer),
  )

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserTypes.OfferResponse>({
    mode: 'onBlur',
  })

  // チェックボックス値取得
  function getCheckBoxStates(offer: UserTypes.Offer) {
    return [
      {
        label: ConditionList.find((el) => el.id == 'makeup')?.label,
        id: 'makeup',
        checked: offer.makeup == UserTypes.BoolWithInt.True ? true : false,
      },
      {
        label: ConditionList.find((el) => el.id == 'rental_costume')?.label,
        id: 'rental_costume',
        checked:
          offer.rental_costume == UserTypes.BoolWithInt.True ? true : false,
      },
      {
        label: ConditionList.find((el) => el.id == 'private_room')?.label,
        id: 'private_room',
        checked:
          offer.private_room == UserTypes.BoolWithInt.True ? true : false,
      },
      {
        label: ConditionList.find((el) => el.id == 'shared_room')?.label,
        id: 'shared_room',
        checked: offer.shared_room == UserTypes.BoolWithInt.True ? true : false,
      },
      {
        label: ConditionList.find((el) => el.id == 'pick_up')?.label,
        id: 'pick_up',
        checked: offer.pick_up == UserTypes.BoolWithInt.True ? true : false,
      },
      {
        label: ConditionList.find((el) => el.id == 'meal')?.label,
        id: 'meal',
        checked: offer.meal == UserTypes.BoolWithInt.True ? true : false,
      },
    ]
  }

  // チェックボックス値の更新
  React.useEffect(() => {
    setCheckBoxStates([...getCheckBoxStates(props.offer)])
  }, [props.offer])

  // Form submit時イベントハンドラ
  const onSubmit = (formData: UserTypes.OfferResponse) => {
    // レスポンスセット
    formData.response = agreementValue
    //console.log(formData)
    props.onPost && props.onPost(formData)
  }

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: UserTypes.OfferResponseType,
  ) => {
    setAgreementValue(newAlignment)
    //console.log(agreementValue)
  }

  return (
    <Box padding={1} backgroundColor={'white'}>
      <Flex justifyContent={'center'} flexDirection={'column'}>
        {/*情報入力フォーム*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginTop={1}>
            <TextField
              {...register('message', { required: true })}
              id="outlined-multiline-flexible"
              label="依頼者へのメッセージ"
              multiline
              fullWidth
              color="primary"
              variant="outlined"
              // maxRows={4}
              rows={3}
              focused
              InputLabelProps={{ shrink: true }}
            />
            {errors.message && (
              <Text color="danger" variant="small" paddingLeft={1}>
                依頼者へのメッセージの入力は必須です
              </Text>
            )}
          </Box>
          <Box marginTop={1}>
            <Flex justifyContent={'center'}>
              <ToggleButtonGroup
                color="primary"
                value={agreementValue}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value={UserTypes.OfferResponseType.Agreement}>
                  契約する
                </ToggleButton>
                <ToggleButton value={UserTypes.OfferResponseType.NoContract}>
                  契約しない
                </ToggleButton>
              </ToggleButtonGroup>
            </Flex>
          </Box>
          {/* 送信ボタン */}
          <Box margin={2}>
            <Flex justifyContent={'center'}>
              <Button type="submit">送信</Button>
            </Flex>
          </Box>
        </form>
        {/*出演依頼内容*/}
        <Box>
          <SnackbarContent
            message="出演依頼内容"
            sx={{ backgroundColor: '#333333', color: '#ffffff' }}
          />
          <Box marginBottom={1} marginLeft={1} marginRight={1}>
            <Flex justifyContent={'flex-start'} flexDirection={'column'}>
              {/*出演料*/}
              <Box marginTop={2}>
                <TextField
                  label="出演料[円]"
                  value={props.offer.fee}
                  fullWidth
                  variant="standard"
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              {/*タイトル*/}
              <Box marginTop={1}>
                <TextField
                  label="タイトル"
                  value={props.offer.title}
                  multiline
                  fullWidth
                  variant="standard"
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              {/*企画概要*/}
              <Box marginTop={1}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="企画概要"
                  multiline
                  fullWidth
                  color="primary"
                  variant="standard"
                  // maxRows={4}
                  rows={3}
                  value={props.offer.summary}
                  focused
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              {/*撮影日時*/}
              <Box marginTop={1}>
                <TextField
                  label="撮影日 (例)2022/10/28 10:00 - 2022/10/28 18:00"
                  value={props.offer.date_time}
                  fullWidth
                  variant="standard"
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              {/*撮影場所(jyuusyo 
                )*/}
              <Box marginTop={1}>
                <TextField
                  label="撮影場所(住所)"
                  value={props.offer.place}
                  fullWidth
                  variant="standard"
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              {/*その他条件*/}
              <Box marginTop={2}>
                <SnackbarContent
                  message="その他条件"
                  sx={{ backgroundColor: '#333333', color: '#ffffff' }}
                />
                <FormControl
                  sx={{ m: 0 }}
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
                            minWidth={'150px'}
                            margin={1}
                          >
                            <Item>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={item.checked}
                                    name={item.id}
                                  />
                                }
                                label={item.label}
                                componentsProps={{
                                  typography: { variant: 'caption' },
                                }}
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
              <Box marginTop={2}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="依頼者からのメッセージ"
                  multiline
                  fullWidth
                  color="primary"
                  variant="outlined"
                  // maxRows={4}
                  rows={3}
                  value={props.offer.message}
                  focused
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
