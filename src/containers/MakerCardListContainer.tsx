import Link from 'next/link'
import type { MakerUser } from '../types/userTypes'
import RectLoader from 'components/atoms/RectLoader'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Card from 'components/organisms/ActorCard'
import { GetUrlOfImageFileInDataServer } from 'utils'

interface MakerCardListProps {
  isLoading: boolean
  users: MakerUser[]
}

/**
 * メーカーカードリストコンテナ
 */
const MakerCardListContainer = ({ isLoading, users }: MakerCardListProps) => {
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
      {!isLoading && users != null && users.length != 0 && (
        <Box>
          <Flex
            flexDirection={'row'}
            flexWrap={'wrap'}
            justifyContent={'flex-start'}
            alignContent={'flex-start'}
            alignItems={'flex-start'}
          >
            {users.map((p) => (
              <Box key={p.id} margin={1}>
                <Link
                  href={`/maker/users/${p.id}?view_mode_mine=false`}
                  passHref
                >
                  <a>
                    {/* カード */}
                    <Card
                      title={p.maker_name}
                      imageUrl={
                        p.image_path.startsWith('storage')
                          ? GetUrlOfImageFileInDataServer(p.image_path)
                          : p.image_path
                      }
                    />
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

export default MakerCardListContainer
