import { styled } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Badge, { BadgeProps } from '@mui/material/Badge'
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied'
import EmailIcon from '@mui/icons-material/Email'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import * as React from 'react'
import { useAuthContext } from '../../../contexts/AuthContext'
import { GetUrlOfImageFileInDataServer } from 'utils'
import { GetAppearanceRequestList } from 'api/schedule'
import { ApiContext, AppErrorCode, LoginUserType } from 'types/userTypes'

interface ResponsiveAppBarProps {
  /**
   * ユーザータイプ
   */
  userType?: 'actor' | 'maker'
}

const pagesActor = [
  { label: 'Message', link: '/message/chat', addUserId: false },
  { label: 'Schedule', link: '/actor/schedule', addUserId: true },
]
const settingsActor = [
  { label: 'Profile', link: '/actor/users', addUserId: true },
  { label: 'Logout', link: '/', addUserId: false },
]

const pagesMaker = [
  { label: 'Search', link: '/maker/search', addUserId: false },
]
const settingsMaker = [
  //{ label: 'Profile', link: '/maker/users', addUserId: true },
  { label: 'Logout', link: '/', addUserId: false },
]

// バッジのスタイルカスタム
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

/**
 * ヘッダーメニュー
 * @returns
 */
const ResponsiveAppBar = (props: ResponsiveAppBarProps) => {
  // #region Fields
  const apiContext: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
  }
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  // 認証済ユーザー
  const { authUser } = useAuthContext()
  // ページリンク
  const pages: { label: string; link: string; addUserId: boolean }[] =
    props.userType == 'actor' ? pagesActor : pagesMaker
  const settings: { label: string; link: string; addUserId: boolean }[] =
    props.userType == 'actor' ? settingsActor : settingsMaker
  // 出演依頼件数
  const [numberOfAppearanceRequests, setNumberOfAppearanceRequests] =
    React.useState(0)

  // #endregion Fields

  // #region Functions
  // 初期化処理
  React.useEffect(() => {
    // 出演依頼件数取得
    GetAppearanceRequestList(apiContext, authUser.id).then((apiResult) => {
      console.log(apiResult)
      if (apiResult.result.Code == AppErrorCode.Success) {
        setNumberOfAppearanceRequests(apiResult.data.length)
      } else {
        setNumberOfAppearanceRequests(0)
      }
    })
  }, [])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  // #endregion Functions

  // #region Views
  return (
    <AppBar
      position="fixed" //"static"
      style={{
        backgroundColor: props.userType == 'actor' ? '#FFDDFF' : '#E6FFE9',
        color: '#333333',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Fides
          </Typography> */}
          <img
            //`url(${'/common/app_title.png'})`
            src={'/common/app_logo.png'}
            height={'50px'}
            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            // alt={item.title}
            //loading="lazy"
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page.label}
                href={
                  page.addUserId ? page.link + '/' + authUser.id : page.link
                }
                passHref
              >
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  style={{
                    backgroundColor:
                      props.userType == 'actor' ? '#FFDDFF' : '#E6FFE9',
                    color: '#333333',
                  }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
          {/* メールINBOXバッジ */}
          <Box sx={{ flexGrow: 0 }} marginRight={2}>
            <Link href={'/message/inbox'} passHref>
              <Tooltip title="メール">
                <IconButton aria-label="mail-box">
                  <StyledBadge badgeContent={1} color="primary">
                    <EmailIcon />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
            </Link>
          </Box>
          {/* 出演依頼バッジ */}
          {authUser.type == LoginUserType.Actor && (
            <Box sx={{ flexGrow: 0 }} marginRight={2}>
              <Link href={'/message/appearancerequest/inbox'} passHref>
                <Tooltip title="出演依頼">
                  <IconButton aria-label="appearance_request">
                    <StyledBadge
                      badgeContent={numberOfAppearanceRequests}
                      color="primary"
                    >
                      <SensorOccupiedIcon />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
          )}
          {/* 設定メニュー */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="個人メニュー">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={GetUrlOfImageFileInDataServer(
                    authUser.profile_image_path,
                  )}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link
                  key={setting.label}
                  href={
                    setting.addUserId
                      ? setting.link + '/' + authUser.id
                      : setting.link
                  }
                  passHref
                >
                  <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
  // #endregion Views
}
export default ResponsiveAppBar
