import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import SnackbarContent from '@mui/material/SnackbarContent'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import * as React from 'react'
import PlayConditionSetting from '../PlayCondition'
import Button from 'components/atoms/Button'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'

interface SearchActorControlProps {
  /**
   * ユーザータイプ
   */
  userType?: 'actor' | 'maker'
}

/**
 * 女優検索コントロール
 */
const SearchActorControl = (props: SearchActorControlProps) => {
  // #region Fields
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  )
  // #endregion Fields
  // #region Functions
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue)
  }
  // #endregion Functions
  // #region Views
  return (
    <Box>
      <Flex
        flexDirection={'column'}
        flexWrap={'wrap'}
        justifyContent={'flex-start'}
        alignContent={'flex-start'}
        alignItems={'flex-start'}
      >
        {/* 名前で探す */}
        <Box marginLeft={2} sx={{ bgcolor: '#ffffff', width: '100%' }}>
          <SnackbarContent
            message="名前で探す"
            sx={{ backgroundColor: '#333333', color: '#ffffff' }}
          />
          <Box sx={{ border: '1px solid #ced4da' }}>
            <Box margin={2}>
              <Flex justifyContent={'space-between'}>
                <TextField
                  label="NAME"
                  value={''}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  onClick={() => {
                    /*do nothing*/
                  }}
                  backgroundColor={'#333333'}
                >
                  <Text variant="small" color={'white'}>
                    Search
                  </Text>
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
        {/* 日時・プレイ条件で探す */}
        <Box
          marginTop={2}
          marginLeft={2}
          sx={{ bgcolor: '#ffffff', width: '100%' }}
        >
          <SnackbarContent
            message="撮影日・プレイ条件で探す"
            sx={{ backgroundColor: '#333333', color: '#ffffff' }}
          />
          <Box sx={{ border: '1px solid #ced4da' }}>
            <Text
              variant="small"
              color={'black'}
              padding={2}
              margin={1}
              paddingTop={5}
            >
              撮影日
            </Text>
            {/* 撮影日区間 */}
            <Box margin={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Flex justifyContent={'flex-start'} flexWrap={'wrap'}>
                  {/* 開始日時 */}
                  <Box margin={1}>
                    <DateTimePicker
                      label="開始日時"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                  {/* 終了日時 */}
                  <Box margin={1}>
                    <DateTimePicker
                      label="終了日時"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                  <FormControlLabel
                    control={<Checkbox defaultChecked color="default" />}
                    label="日時未定"
                  />
                </Flex>
              </LocalizationProvider>
            </Box>
            {/* プレイ条件 */}
            <Box>
              <Text variant="small" color={'black'} padding={2} margin={1}>
                プレイ条件
              </Text>
              <Box marginLeft={2}>
                <PlayConditionSetting />
              </Box>
            </Box>
            <Box margin={2}>
              <Button
                onClick={() => {
                  /*do nothing*/
                }}
                backgroundColor={'#333333'}
                width={'100%'}
              >
                <Text variant="small" color={'white'}>
                  Search
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
  // #endregion Views
}
export default SearchActorControl
