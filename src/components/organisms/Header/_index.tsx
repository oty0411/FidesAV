import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import { PersonIcon } from 'components/atoms/IconButton'
import ShapeImage from 'components/atoms/ShapeImage'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import { useAuthContext } from 'contexts/AuthContext'
import { GetUrlOfImageFileInDataServer } from 'utils'

// ヘッダーのルート
const HeaderRoot = styled.header`
  height: 88px;
  padding: ${({ theme }) => theme.space[2]} 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

// ナビゲーション
const Nav = styled(Flex)`
  & > span:not(:first-child) {
    margin-left: ${({ theme }) => theme.space[2]};
  }
`

// ナビゲーションのリンク
const NavLink = styled.span`
  display: inline;
`

// アンカー
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

/**
 * ヘッダー
 */
const Header = () => {
  // #region Fields
  const router = useRouter()
  const { authUser, isloggdIn } = useAuthContext()
  const headerBackgroundColor = '#FFBDF9'
  const textColor = '#333333'
  // #endregion Fields

  // #region Functions
  // 初回のみの実行
  useEffect(() => {
    // if (!authUser || authUser.id <= 0 || !isloggdIn) {
    //   router.push('/')
    // }
  }, [])

  // ログアウトボタンクリック時の確認
  function confirmLogout(): void {
    const result = confirm('ログアウトしますか？')
    if (result) {
      // ログイン画面へ遷移
      router.push('/')
    }
  }
  // #endregion Functions

  return (
    <HeaderRoot
      style={{
        background: headerBackgroundColor,
      }}
    >
      <div>
        <Flex paddingLeft={1} paddingRight={3} justifyContent="space-between">
          <Text
            variant="extraLarge"
            fontWeight="bold"
            backgroundColor={headerBackgroundColor}
            color={textColor}
            paddingTop={0}
            paddingBottom={0}
            paddingLeft={2}
            paddingRight={2}
          >
            AV DATABASE
          </Text>
          <Flex
            alignContent={'flex-end'}
            alignItems={'flex-end'}
            justifyContent={'flex-end'}
          >
            <Nav as="nav" height="20px" alignItems="center">
              {/*ギャラリー*/}
              <NavLink>
                <Box display={{ base: 'none', md: 'block' }}>
                  <Link href={`/actor/gallery/${authUser.id}`} passHref>
                    <Anchor as="a">
                      <Text
                        variant="medium"
                        fontWeight="bold"
                        // style={{ textDecoration: 'underline' }}
                        color={textColor}
                      >
                        ギャラリー
                      </Text>
                    </Anchor>
                  </Link>
                </Box>
              </NavLink>
              {/*探す*/}
              <NavLink>
                <Box display={{ base: 'none', md: 'block' }}>
                  <Link href={`/actor/search`} passHref>
                    <Anchor as="a">
                      <Text
                        variant="medium"
                        fontWeight="bold"
                        // style={{ textDecoration: 'underline' }}
                        color={textColor}
                      >
                        探す
                      </Text>
                    </Anchor>
                  </Link>
                </Box>
              </NavLink>
              {/*お気に入り*/}
              <NavLink>
                <Box display={{ base: 'none', md: 'block' }}>
                  <Link href={`/actor/favorite/${authUser.id}`} passHref>
                    <Anchor as="a">
                      <Text
                        variant="medium"
                        fontWeight="bold"
                        // style={{ textDecoration: 'underline' }}
                        color={textColor}
                      >
                        お気に入り
                      </Text>
                    </Anchor>
                  </Link>
                </Box>
              </NavLink>
              {/*メッセージ*/}
              <NavLink>
                <Box display={{ base: 'none', md: 'block' }}>
                  <Link href={`/actor/message/${authUser.id}`} passHref>
                    <Anchor as="a">
                      <Text
                        variant="medium"
                        fontWeight="bold"
                        // style={{ textDecoration: 'underline' }}
                        color={textColor}
                      >
                        メッセージ
                      </Text>
                    </Anchor>
                  </Link>
                </Box>
              </NavLink>
              {/*スケジュール*/}
              <NavLink>
                <Box display={{ base: 'none', md: 'block' }}>
                  <Link href={`/actor/schedule/${authUser.id}`} passHref>
                    <Anchor as="a">
                      <Text
                        variant="medium"
                        fontWeight="bold"
                        // style={{ textDecoration: 'underline' }}
                        color={textColor}
                      >
                        スケジュール
                      </Text>
                    </Anchor>
                  </Link>
                </Box>
              </NavLink>
              {/*プロフィール*/}
              <NavLink>
                <Box display={{ base: 'none', md: 'block' }}>
                  <Link href={`/actor/users/${authUser.id}`} passHref>
                    <Anchor as="a">
                      <Text
                        variant="medium"
                        fontWeight="bold"
                        // style={{ textDecoration: 'underline' }}
                        color={textColor}
                      >
                        プロフィール
                      </Text>
                    </Anchor>
                  </Link>
                </Box>
              </NavLink>
            </Nav>
          </Flex>
          <Nav as="nav" height="20px" alignItems="center">
            <NavLink>
              {(() => {
                // 認証していたらログアウトボタンを表示
                if (authUser && authUser.id > 0) {
                  return (
                    <Flex
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      alignContent={'center'}
                    >
                      <Text
                        variant="small"
                        marginBottom={1}
                        color={'lightgrey'}
                      >
                        {authUser.user_name}
                      </Text>
                      <Button onClick={confirmLogout}>Logout</Button>
                    </Flex>
                  )
                }
              })()}
            </NavLink>
          </Nav>
        </Flex>
      </div>
    </HeaderRoot>
  )
}

export default Header
