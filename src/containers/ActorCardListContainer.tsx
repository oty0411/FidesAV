import Link from 'next/link'
import type { User } from '../types/userTypes'
import RectLoader from 'components/atoms/RectLoader'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Card from 'components/organisms/ActorCard'

interface ActorCardListProps {
  isLoading: boolean
  actors: User[]
}

/**
 * 女優カードリストコンテナ
 */
const ActorCardListContainer = ({ isLoading, actors }: ActorCardListProps) => {
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
      {!isLoading && actors != null && actors.length != 0 && (
        <Box>
          <Flex
            flexDirection={'row'}
            flexWrap={'wrap'}
            justifyContent={'flex-start'}
            alignContent={'flex-start'}
            alignItems={'flex-start'}
          >
            {actors.map((p) => (
              <Box key={p.id} margin={1}>
                <Link
                  href={`/actor/users/${p.id}?view_mode_mine=false`}
                  passHref
                >
                  <a>
                    {/* 女優カード */}
                    <Card title={p.user_name} imageUrl={p.image_path} />
                  </a>
                </Link>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </>
  )
}

export default ActorCardListContainer
