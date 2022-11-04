import SnackbarContent from '@mui/material/SnackbarContent'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import SearchMakerControl from '../../../components/organisms/SearchMakerControl'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import MakerCardListContainer from 'containers/MakerCardListContainer'
import {
  ApiContext,
  AppErrorCode,
  MakerUser,
  GetObj_MakerUser,
} from 'types/userTypes'

// プロフィールページへ渡すクエリパラメータ
const query = {
  view_mode_mine: 'false',
}

/**
 * メーカー検索ページ
 * @returns
 */
const MakerSearchPage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 検索結果
  const [users, setUsers] = useState<MakerUser[]>([])
  // 検索結果ロード中
  const [isLoading, setIsLoading] = useState(false)
  // #endregion Fields

  // #region Functions

  /**
   * 検索条件変更イベントハンドラ
   * @param selected
   */
  const handleSearchConditionChange = (selected: string[]) => {
    // 条件をクエリへ追加
    router.push({
      pathname: router.pathname,
      query: {
        condition: selected,
      },
    })
    console.log(selected)
    // 検索
    //setIsLoading(true)
    // SearchLectures(apiContext, selected).then((apiResult) => {
    //   //console.log(apiResult);
    //   if (apiResult.result.Code == AppErrorCode.Success) {
    //     setLectures(apiResult.data)
    //     console.log(lectures)
    //   }
    //   setIsLoading(false)
    // })
  }

  // 初期化処理
  useEffect(() => {
    // 講義一覧取得
    //setIsLoading(true)
    const selected: string[] = []
  }, [])

  // 検索結果をリフレッシュ
  function refreshToSearchedMakerList(userList: MakerUser[]) {
    setUsers([...userList.filter((user) => user.id > 5)])
  }
  // #endregion Functions

  // #region View
  return (
    <Layout userType={'actor'}>
      <MainPartLayout>
        <Separator />
        <Box>
          <Flex flexDirection={'column'}>
            <Text
              as="h3"
              fontWeight="bold"
              variant="mediumLarge"
              marginTop={0}
              paddingLeft={1}
            >
              メーカー(制作会社)検索
            </Text>
            <Box width="100%" paddingLeft={2} paddingRight={2}>
              <Flex flexDirection={'column'}>
                <SearchMakerControl
                  refreshToSearchedMakerList={refreshToSearchedMakerList}
                />
                {/* 女優カードリストコンテナ 検索結果からカードリストを表示 */}
                <Box marginLeft={0} marginTop={2}>
                  <SnackbarContent
                    message="検索結果"
                    sx={{ backgroundColor: '#afb7c0', color: '#000000' }}
                  />
                  <Box marginTop={1}>
                    <MakerCardListContainer
                      isLoading={isLoading}
                      users={users}
                    />
                  </Box>
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

export default MakerSearchPage
