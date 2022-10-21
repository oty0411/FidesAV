import type { NextPage } from 'next'
import * as React from 'react'
import SnackbarContent from '@mui/material/SnackbarContent'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import * as ST_Button from 'components/atoms/Button'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import {
  ApiContext,
} from 'types/userTypes'

const ComplateTransactionPage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  const [checked, setChecked] = React.useState(false);

  // 評価ボタン
  const evaluationButtons = [
    <Button key="good" color="error" size="large" startIcon={<SentimentVerySatisfiedIcon />}>
      <Box marginRight={1}>GOOD</Box>
      <FormControlLabel value="1" control={<Radio />} label="" />
    </Button>,
    <Button key="normal" color="warning" size="large" startIcon={<SentimentSatisfiedIcon />}>
      <Box marginRight={1}>NORMAL</Box>
      <FormControlLabel value="2" control={<Radio />} label="" />
    </Button>,
    <Button key="bad" color="primary" size="large" startIcon={<MoodBadIcon />}>
      <Box marginRight={1}>BAD</Box>
      <FormControlLabel value="3" control={<Radio color="default"/>} label="" />
    </Button>,
];
  // #endregion Fields

  // #region Functions
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  // #endregion Functions

  // #region View
  return (
    <Layout userType={'actor'}>
      <MainPartLayout>
        <Separator />
        <Box width="100%">
          <Flex flexDirection={'column'}>
            <Text
              as="h3"
              fontWeight="bold"
              variant="mediumLarge"
              marginTop={0}
              paddingLeft={1}
            >
              取引完了
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex
                justifyContent={'flex-start'}
                flexDirection={'column'}
                alignItems={'flex-start'}
              >
                {/* 撮影内容確認 */}
                <Box width="100%"  marginTop={0}>
                  <SnackbarContent
                    message="撮影内容確認"
                    sx={{ backgroundColor: '#333333', color: '#ffffff' }}
                  />
                  <Box margin={2}>
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
                      <Box marginTop={1}>
                        <Flex justifyContent={'center'}>
                          <FormControlLabel control={
                            <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                          } label="撮影内容を確認しました" />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>  
                </Box>
                {/* ユーザー評価(必須) */}
                <Box width="100%" marginTop={2}>
                  <SnackbarContent
                    message="ユーザー評価"
                    sx={{ backgroundColor: '#333333', color: '#ffffff' }}
                  />
                  <Box marginTop={2} marginLeft={2}>
                    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'}>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <ButtonGroup size="large" aria-label="large button group" variant="contained">
                          <Flex justifyContent={'center'} flexWrap={'wrap'}>
                            {evaluationButtons}
                          </Flex>
                      </ButtonGroup>
                        </RadioGroup>
                      </FormControl>

                      <Box width='100%' marginTop={2}>
                        <TextField
                          label="評価コメント"
                          value={'この度は数ある素敵な女優さんの中から私を選んでいただきありがとうございました。\n今後も現場にたくさん呼んでくださいね！'}
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
                  <ST_Button.default
                    onClick={() => {
                      /*do nothing*/
                    }}
                    backgroundColor={'#333333'}
                    width={'100%'}
                  >
                    <Text variant="medium" color={'white'}>
                      評価を投稿し取引を完了する
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

export default ComplateTransactionPage
