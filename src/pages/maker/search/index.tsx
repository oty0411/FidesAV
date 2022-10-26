import SnackbarContent from '@mui/material/SnackbarContent'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import SearchActorControl from '../../../components/organisms/SearchActorControl'
import Separator from 'components/atoms/Separator'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Layout from 'components/templates/Layout'
import MainPartLayout from 'components/templates/Layout/mainPartLayout'
import ActorCardListContainer from 'containers/ActorCardListContainer'
import { ApiContext, AppErrorCode, User, GetObj_User } from 'types/userTypes'

// 検索条件
type Condition = 'html' | 'css' | 'javascript' | 'php'

// 女優プロフィールページへ渡すクエリパラメータ
const query = {
  view_mode_mine: 'false',
}

/**
 * 女優検索ページ
 * @returns
 */
const ActorSearchPage: NextPage = () => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  // ページルート
  const router = useRouter()
  // 検索結果
  const [actors, setActors] = useState<User[]>([])
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

    // const actorList: User[] = []
    // actorList.push(GetObj_User())
    // actorList[0].id = 1
    // actorList[0].user_name = '佐倉絆'
    // actorList[0].image_path = '/users/itou_mayuki.jpg'
    // actorList.push(GetObj_User())
    // actorList[1].id = 2
    // actorList[1].user_name = '佐倉絆2'
    // actorList[1].image_path = '/users/suzumura_airi.jpg'
    // actorList.push(GetObj_User())
    // actorList[2].id = 1
    // actorList[2].user_name = '佐倉絆'
    // actorList[2].image_path = '/users/itou_mayuki.jpg'
    // actorList.push(GetObj_User())
    // actorList[3].id = 2
    // actorList[3].user_name = '佐倉絆2'
    // actorList[3].image_path = '/users/suzumura_airi.jpg'
    // actorList.push(GetObj_User())
    // actorList[4].id = 1
    // actorList[4].user_name = '佐倉絆'
    // actorList[4].image_path = '/users/itou_mayuki.jpg'
    // setActors(actorList)

    // SearchLectures(apiContext, selected).then((apiResult) => {
    //   //console.log(apiResult);
    //   if (apiResult.result.Code == AppErrorCode.Success) {
    //     setLectures(apiResult.data)
    //     console.log(lectures)
    //   }
    //   setIsLoading(false)
    // })
  }, [])

  // 検索結果をリフレッシュ
  function refreshToSearchedActorList(actorList: User[]) {
    setActors([...actorList.filter((user) => user.id > 5)])
  }
  // #endregion Functions

  // #region View
  return (
    <Layout userType={'maker'}>
      <MainPartLayout>
        <Separator />
        <Box>
          <Flex flexDirection={'column'}>
            <SearchActorControl
              refreshToSearchedActorList={refreshToSearchedActorList}
            />
            {/* 女優カードリストコンテナ 検索結果からカードリストを表示 */}
            <Box marginLeft={2} marginTop={2}>
              <SnackbarContent
                message="検索結果"
                sx={{ backgroundColor: '#afb7c0', color: '#000000' }}
              />
              <Box marginTop={1}>
                <ActorCardListContainer isLoading={isLoading} actors={actors} />
              </Box>
            </Box>
          </Flex>
        </Box>
      </MainPartLayout>
    </Layout>
  )
  // #endregion View
}

export default ActorSearchPage
