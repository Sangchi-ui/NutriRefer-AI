import { Box, Button, Grid, Paper, Typography, Card, CardContent, Divider } from '@mui/material'
import { motion } from 'framer-motion'
import { useHealth } from '../hooks/useHealth'
import { Download, EmojiEvents, WaterDrop, CameraAlt, Lightbulb } from '@mui/icons-material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import StatCard from '../components/StatCard'

const Analytics = () => {
  const { waterLogs, historyEvents, achievements, streaks, exportData } = useHealth()

  // Prepare chart data for the last 7 days of water intake
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })

  const waterChartData = last7Days.map(dateStr => {
    const total = waterLogs
      .filter(log => log.timestamp.startsWith(dateStr))
      .reduce((sum, log) => sum + log.amount, 0)
    
    // Short date for X axis
    const shortDate = new Date(dateStr).toLocaleDateString([], { weekday: 'short' })
    return { name: shortDate, ml: total }
  })

  // Prepare stats
  const totalWater = waterLogs.reduce((sum, log) => sum + log.amount, 0)
  const scanCount = historyEvents.filter(e => e.type === 'scan').length
  const planCount = historyEvents.filter(e => e.type === 'plan').length

  const allPossibleBadges = [
    { id: '3-Day Streak', icon: <EmojiEvents color="warning" fontSize="large" />, desc: 'Active for 3 days' },
    { id: '7-Day Streak', icon: <EmojiEvents color="warning" fontSize="large" />, desc: 'Active for 7 days' },
    { id: 'Hydration Hero', icon: <WaterDrop color="info" fontSize="large" />, desc: 'Met daily water goal' },
    { id: 'First Scan', icon: <CameraAlt color="action" fontSize="large" />, desc: 'Logged first meal' }
  ]

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={900}>Health Analytics</Typography>
          <Typography variant="body2" color="text.secondary">Your wellness journey in numbers</Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Download />}
          onClick={exportData}
          sx={{ borderRadius: 2 }}
        >
          Export Report
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<WaterDrop color="info" />} 
            label="Total Water Logged" 
            value={`${(totalWater / 1000).toFixed(1)}L`} 
            trend="All time" 
            tone="primary" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<CameraAlt color="action" />} 
            label="Meals Scanned" 
            value={scanCount} 
            trend="All time" 
            tone="success" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<Lightbulb color="warning" />} 
            label="AI Plans Generated" 
            value={planCount} 
            trend="All time" 
            tone="primary" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<EmojiEvents color="warning" />} 
            label="Current Streak" 
            value={`${streaks.current} Days`} 
            trend={`Best: ${streaks.highest}`} 
            tone="success" 
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper className="panel-card" sx={{ height: 400 }}>
            <Typography variant="h6" fontWeight={800} mb={2}>Weekly Hydration Trend (ml)</Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={waterChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="ml" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Paper className="panel-card" sx={{ height: 400, overflowY: 'auto' }}>
            <Typography variant="h6" fontWeight={800} mb={2}>Achievements</Typography>
            <Grid container spacing={2}>
              {allPossibleBadges.map(badge => {
                const unlocked = achievements.includes(badge.id);
                return (
                  <Grid item xs={6} key={badge.id}>
                    <Card sx={{ 
                      textAlign: 'center', 
                      p: 2, 
                      opacity: unlocked ? 1 : 0.4,
                      filter: unlocked ? 'none' : 'grayscale(100%)',
                      background: unlocked ? '#fffbea' : '#f8fafc',
                      border: unlocked ? '1px solid #fde047' : '1px solid #e2e8f0',
                      boxShadow: 'none'
                    }}>
                      <Box sx={{ mb: 1 }}>{badge.icon}</Box>
                      <Typography variant="body2" fontWeight={700}>{badge.id}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">{badge.desc}</Typography>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
            {achievements.length === 0 && (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body2" color="text.secondary">Complete goals to unlock badges!</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </motion.section>
  )
}

export default Analytics
