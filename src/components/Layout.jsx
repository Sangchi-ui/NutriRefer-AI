import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  useMediaQuery,
  useTheme
} from '@mui/material'
import {
  Menu,
  Notifications,
  Dashboard,
  Person,
  RestaurantMenu,
  CameraAlt,
  Timeline,
  WaterDrop,
  Settings,
  Home,
  BarChart
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const drawerWidth = 280

const navItems = [
  { label: 'Home', path: '/', icon: <Home /> },
  { label: 'User Registration', path: '/registration', icon: <Person /> },
  { label: 'AI Nutrition Assistant', path: '/assistant', icon: <RestaurantMenu /> },
  { label: 'Food Scanner', path: '/scanner', icon: <CameraAlt /> },
  { label: 'Nutrition History', path: '/history', icon: <Timeline /> },
  { label: 'Water Tracker', path: '/water', icon: <WaterDrop /> },
  { label: 'Analytics', path: '/analytics', icon: <BarChart /> },
  { label: 'Settings', path: '/settings', icon: <Settings /> }
]

const Layout = ({ children, title, subtitle }) => {
  const theme = useTheme()
  const location = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('nutrimind-user') || 'null')
    setUser(storedUser)
  }, [])

  const drawer = (
    <Box sx={{ height: '100%', background: 'linear-gradient(180deg, #0f1720 0%, #13251d 100%)', color: '#f8faf9' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box className="brand-icon">N</Box>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
            HealthOS
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            NutriMind AI
          </Typography>
        </Box>
      </Box>
      <Box sx={{ px: 2 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path
          return (
            <Link key={item.path} to={item.path} className={`nav-item ${active ? 'active' : ''}`}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.6 }}>
                {item.icon}
                <Typography variant="body2" fontWeight={600}>
                  {item.label}
                </Typography>
              </Box>
            </Link>
          )
        })}
      </Box>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <Box className="sidebar-footer">
          <Avatar sx={{ width: 48, height: 48, bgcolor: '#21b26a' }}>
            {user?.fullName?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={700}>
              {user?.fullName || 'Guest User'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              {user?.goal || 'Daily wellness'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'rgba(255,255,255,0.9)',
          color: '#0f1720',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #ebf0ec'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: 'none' } }}
            >
              <Menu />
            </IconButton>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
              <Typography variant="h6" fontWeight={800}>
                {title}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Badge badgeContent={3} color="success">
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
            </Badge>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, ml: 1 }}>
              <Avatar sx={{ width: 42, height: 42, bgcolor: '#0f8d5e' }}>
                {user?.fullName?.charAt(0) || 'U'}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" fontWeight={700}>
                  {user?.fullName || 'Guest'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.goal || 'Wellness'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none'
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          p: { xs: 2, md: 4 },
          pt: { xs: 10, md: 12 },
          background: '#f5f7f5'
        }}
      >
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {children}
        </motion.div>
      </Box>
    </Box>
  )
}

export default Layout
