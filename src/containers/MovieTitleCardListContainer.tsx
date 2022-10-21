import Link from 'next/link'
import type { Portfolio } from '../types/userTypes'
import Button from 'components/atoms/Button'
import RectLoader from 'components/atoms/RectLoader'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Card from 'components/organisms/MovieTitleCard'
import { GetUrlOfImageFileInDataServer } from '../utils'

interface MovieTitleCardListProps {
  isLoading: boolean
  portfolios: Portfolio[]
}

/**
 * 動画タイトルカードリストコンテナ
 */
const MovieTitleCardListContainer = ({
  isLoading,
  portfolios,
}: MovieTitleCardListProps) => {
  return (
    <>
      {/* ロード中はレクトローダーを表示 */}
      {isLoading &&
        Array.from(Array(16), (_, k) => (
          <Box key={k}>
            <Box display={{ base: 'none', md: 'block' }}>
              <RectLoader width={240} height={240} />
            </Box>
            <Box display={{ base: 'block', md: 'none' }}>
              <RectLoader width={160} height={160} />
            </Box>
          </Box>
        ))}
      {!isLoading && portfolios != null && portfolios.length != 0 && (
        <Box>
          <Flex
            flexDirection={'row'}
            flexWrap={'wrap'}
            justifyContent={'flex-start'}
            alignContent={'flex-start'}
            alignItems={'flex-start'}
          >
            {portfolios.map((p) => (
              <Box key = { p.id } margin = {1}>
                <Button
                  onClick={() => {
                    window.open(p.url)
                  }}
                  backgroundColor={'#ffffff'}
                >
                  {/* 動画タイトルカード */}
                  <Card title={p.title} imageUrl={GetUrlOfImageFileInDataServer(p.image_path)} url={p.url} />
                </Button>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </>
  )
}

export default MovieTitleCardListContainer
