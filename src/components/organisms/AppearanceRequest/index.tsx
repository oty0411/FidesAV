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

// 本フォームの出力データ型
export type AppearanceRequestPostFormData = {
  item: number
}

interface AppearanceRequestPostFormProps {
  item: number
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
  { label: 'メイク付', id: 'gomunashi' },
  { label: '貸衣装', id: 'gomunashi' },
  { label: '控室(個室)', id: 'gomunashi' },
  { label: '控室(相部屋)', id: 'gomunashi' },
  { label: '送迎', id: 'honban' },
  { label: '食事', id: 'gomunashi' },
]

/**
 * 出演依頼フォーム
 */
export const AppearanceRequestPostForm = (
  props: AppearanceRequestPostFormProps,
) => {
  // React Hook Formの使用
  const [state, setState] = React.useState(
    ConditionList.map((item) => {
      return {
        id: item.id,
      }
    }),
  )

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppearanceRequestPostFormData>({
    mode: 'onBlur',
  })

  // Form submit時イベントハンドラ
  const onSubmit = (formData: AppearanceRequestPostFormData) => {
    console.log(formData)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <Box marginLeft={2}>
      <Flex justifyContent={'center'} flexDirection={'column'}>
        {/*情報入力フォーム*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginBottom={1}>
            <Flex justifyContent={'flex-start'} flexDirection={'column'}>
              {/*出演料*/}
              <Box marginTop={0}>
                <TextField
                  label="出演料"
                  value={'1,000,000円'}
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
                  value={
                    'AV女優ありな先生のネチョネチョ、レロレロ 大人のベロキス誘惑接吻レクチャー'
                  }
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
                  maxRows={4}
                  rows={3}
                  value={
                    '甘く、激しく誘惑接吻レクチャー！！ヨダレだらだら唾液ねっちょりレロレロ…キスで求め合う超濃厚エクスタシー！見つめて感じる大人の接吻SEX！キスの女神、ありーな。やっぱりエロい。舌を絡ませて唾液交換、唇を重ね合ってピストン！！ヨダレたっぷりベロキス6コーナー3本番！！キスがへたっぴなアナタのために…優しくてエロい手ほどきキスリードSEX！！'
                  }
                  focused
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              {/*撮影日時*/}
              <Box marginTop={1}>
                <TextField
                  label="撮影日時"
                  value={'2022/10/28 10:00 - 2022/10/28 18:00'}
                  fullWidth
                  variant="standard"
                  color="primary"
                  focused
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              {/*撮影場所*/}
              <Box marginTop={1}>
                <TextField
                  label="撮影場所"
                  value={'福岡県福岡市中央区大名 1-3-41'}
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
                      {ConditionList.map((item) => {
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
                                    /*checked={gilad}*/ onChange={handleChange}
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
                  id="outlined-multiline-flexible"
                  label="メッセージ"
                  multiline
                  fullWidth
                  color="primary"
                  variant="outlined"
                  maxRows={4}
                  rows={3}
                  value={
                    '正式に出演依頼を提出させていただきます。どうぞよろしくお願いいたします。'
                  }
                  focused
                  InputLabelProps={{ shrink: true }}
                />
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
