import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import * as React from 'react'
import { useAuthContext } from '../../../contexts/AuthContext'

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
  { label: 'Profile', link: '/maker/users', addUserId: true },
  { label: 'Logout', link: '/', addUserId: false },
]

/**
 * ヘッダーメニュー
 * @returns
 */
const ResponsiveAppBar = (props: ResponsiveAppBarProps) => {
  // #region Fields
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
  // #endregion Fields

  // #region Functions
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
      position="static"
      style={{
        backgroundColor: props.userType == 'actor' ? '#FFFFFF' : '#FFFFFF',
        color: '#333333',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
          </Typography>
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
                      props.userType == 'actor' ? '#FFFFFF' : '#FFFFFF',
                    color: '#333333',
                  }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
          {/* バッジ */}
          <Box sx={{ flexGrow: 0 }} marginRight={2}>
            <Tooltip title="出演依頼">
              <Badge badgeContent={4} color="primary">
                <SensorOccupiedIcon color="action" />
              </Badge>
            </Tooltip>
          </Box>
          {/* 設定メニュー */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="個人メニュー">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/users/ActorDefault.png" />
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
