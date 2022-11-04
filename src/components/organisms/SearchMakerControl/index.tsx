import Box from '@mui/material/Box'
import SnackbarContent from '@mui/material/SnackbarContent'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import Button from 'components/atoms/Button'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'
import { ApiContext, AppErrorCode, MakerUser } from 'types/userTypes'
import { GetMakerUserList } from 'api/users'

interface SearchMakerControlProps {
  refreshToSearchedMakerList?: (actorList: MakerUser[]) => void
}

/**
 * 女優検索コントロール
 */
const SearchMakerControl = (props: SearchMakerControlProps) => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }

  const [searchName, setSearchName] = React.useState('')
  // #endregion Fields

  // #region Functions
  // ユーザーを名前で検索
  function searchUsersByName() {
    GetMakerUserList(apiContext).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        const filteredList = apiResult.data.filter(
          (user) => user.maker_name.indexOf(searchName) > -1,
        )

        props.refreshToSearchedMakerList &&
          props.refreshToSearchedMakerList(filteredList)
      }
    })
  }

  // メーカー一覧取得
  function searchUsers() {
    GetMakerUserList(apiContext).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        props.refreshToSearchedMakerList &&
          props.refreshToSearchedMakerList(apiResult.data)
      }
    })
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
        <Box sx={{ bgcolor: '#ffffff', width: '100%' }}>
          <SnackbarContent
            message="名前で探す"
            sx={{ backgroundColor: '#333333', color: '#ffffff' }}
          />
          <Box sx={{ border: '1px solid #ced4da' }}>
            <Box margin={2}>
              <Flex justifyContent={'space-between'}>
                <TextField
                  label="名前"
                  defaultValue={''}
                  variant="outlined"
                  onChange={(event) => {
                    setSearchName(event.target.value)
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <Button onClick={searchUsersByName} backgroundColor={'#333333'}>
                  <Text variant="small" color={'white'}>
                    Search
                  </Text>
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
        {/* 検索条件なしで一覧表示 */}
        <Box marginTop={2} sx={{ bgcolor: '#ffffff', width: '100%' }}>
          <SnackbarContent
            message="全メーカー一覧"
            sx={{ backgroundColor: '#333333', color: '#ffffff' }}
          />
          <Box sx={{ border: '1px solid #ced4da' }}>
            <Box margin={2}>
              <Button
                onClick={() => {
                  searchUsers()
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
export default SearchMakerControl
