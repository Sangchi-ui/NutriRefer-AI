import { Box, Button, Chip, Grid, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AutoAwesome,
  MonitorHeart,
  RestaurantMenu,
  CameraAlt,
  Timeline,
  WaterDrop
} from '@mui/icons-material'
import StatCard from '../components/StatCard'

const highlights = [
  { label: 'Calories', value: '1,820 kcal', trend: '+4.2%', tone: 'success' },
  { label: 'Protein', value: '132 g', trend: '+8.1%', tone: 'primary' },
  { label: 'Hydration', value: '78%', trend: '+12%', tone: 'success' },
  { label: 'Sleep Score', value: '89/100', trend: 'Stable', tone: 'primary' }
]

const featureCards = [
  {
    title: 'AI Meal Planner',
    icon: <RestaurantMenu fontSize="large" />,
    text: 'Get personalized meal suggestions based on your goals and preferences.'
  },
  {
    title: 'Food Scanner',
    icon: <CameraAlt fontSize="large" />,
    text: 'Scan meals and instantly estimate nutrition values with precision.'
  },
  {
    title: 'Progress Tracking',
    icon: <Timeline fontSize="large" />,
    text: 'Review progress, habits, and daily insights over time.'
  }
]

const Home = () => {
  return (
    <Box>
      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <Paper className="hero-panel">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ maxWidth: 620 }}>
                <Chip
                  icon={<AutoAwesome />}
                  label="Smart nutrition intelligence"
                  sx={{ mb: 2, background: '#e9f7ef', color: '#0d8b5d', fontWeight: 700 }}
                />
                <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
                  Your personalized nutrition companion for healthier living.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Track meals, stay hydrated, scan food, and get AI-guided insights to reach your goals faster.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button component={Link} to="/registration" variant="contained" size="large" className="button-primary">
                    Start your profile
                  </Button>
                  <Button component={Link} to="/assistant" variant="outlined" size="large" className="button-secondary">
                    Try AI assistant
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box className="dashboard-preview">
                <Box className="preview-ring">
                  <Typography variant="h3" fontWeight={900}>84%</Typography>
                  <Typography variant="caption" color="text.secondary">Goal progress</Typography>
                </Box>
                <Box className="preview-stat-list">
                  <Box className="preview-stat">
                    <Typography variant="body2" color="text.secondary">Daily intake</Typography>
                    <Typography variant="h6" fontWeight={800}>1,860 / 2,100</Typography>
                  </Box>
                  <Box className="preview-stat">
                    <Typography variant="body2" color="text.secondary">Water</Typography>
                    <Typography variant="h6" fontWeight={800}>2.4L</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </motion.section>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        {highlights.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...item} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={8}>
          <Paper className="panel-card">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">Today’s plan</Typography>
                <Typography variant="h5" fontWeight={800}>Balanced meals</Typography>
              </Box>
              <Button variant="text" color="success">View full plan</Button>
            </Box>
            <Grid container spacing={2}>
              {[
                { meal: 'Breakfast', item: 'Greek Yogurt Bowl', time: '08:00 AM', calories: '320 kcal' },
                { meal: 'Lunch', item: 'Grilled Chicken Salad', time: '01:00 PM', calories: '540 kcal' },
                { meal: 'Snack', item: 'Apple + Almonds', time: '04:30 PM', calories: '180 kcal' },
                { meal: 'Dinner', item: 'Salmon & Quinoa', time: '07:30 PM', calories: '620 kcal' }
              ].map((entry) => (
                <Grid item xs={12} sm={6} key={entry.meal}>
                  <Box className="meal-row">
                    <Box>
                      <Typography fontWeight={700}>{entry.meal}</Typography>
                      <Typography variant="body2" color="text.secondary">{entry.item}</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography fontWeight={700}>{entry.calories}</Typography>
                      <Typography variant="caption" color="text.secondary">{entry.time}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper className="panel-card">
            <Typography variant="caption" color="text.secondary">Wellness insight</Typography>
            <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
              Your body is responding well.
            </Typography>
            <Box className="insight-circle">
              <Typography variant="h2" fontWeight={900}>92%</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Nutrient balance is improving and your energy is steady.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {featureCards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper className="feature-card">
              <Box className="feature-icon">{card.icon}</Box>
              <Typography variant="h6" fontWeight={800} mb={1}>{card.title}</Typography>
              <Typography variant="body2" color="text.secondary">{card.text}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home
