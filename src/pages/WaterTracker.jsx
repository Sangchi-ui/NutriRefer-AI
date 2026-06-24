import { useState, useEffect } from 'react'
import { Box, Button, Chip, Grid, Paper, Typography, CircularProgress } from '@mui/material'
import { motion } from 'framer-motion'
import { LocalDrink, Add, NotificationsActive } from '@mui/icons-material'
import { useHealth } from '../hooks/useHealth'

const WaterTracker = () => {
  const { waterLogs, waterGoal, addWater } = useHealth();
  const [todayTotal, setTodayTotal] = useState(0);
  const [todayLogs, setTodayLogs] = useState([]);

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todays = waterLogs.filter(log => log.timestamp.startsWith(todayStr));
    setTodayLogs(todays.reverse()); // latest first
    const total = todays.reduce((sum, log) => sum + log.amount, 0);
    setTodayTotal(total);
  }, [waterLogs]);

  const percentage = Math.min(100, Math.round((todayTotal / waterGoal) * 100));

  const handleAddWater = (amount) => {
    addWater(amount);
  };

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper className="panel-card water-panel" sx={{ position: 'relative', overflow: 'hidden' }}>
            <Typography variant="caption" color="text.secondary">Hydration</Typography>
            <Typography variant="h4" fontWeight={800}>Daily water intake</Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4, position: 'relative' }}>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={100} size={240} thickness={4} sx={{ color: '#eef8f2' }} />
                <CircularProgress variant="determinate" value={percentage} size={240} thickness={4} sx={{ color: '#0d8b5d', position: 'absolute', left: 0 }} />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant="h3" fontWeight={900}>{(todayTotal / 1000).toFixed(1)}L</Typography>
                  <Typography variant="caption" color="text.secondary">of {(waterGoal / 1000).toFixed(1)}L</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" className="button-primary" onClick={() => handleAddWater(250)}>
                <Add sx={{ mr: 1 }} /> 250ml
              </Button>
              <Button variant="contained" className="button-primary" onClick={() => handleAddWater(500)}>
                <Add sx={{ mr: 1 }} /> 500ml
              </Button>
              <Button variant="outlined" className="button-secondary" startIcon={<NotificationsActive />}>
                Set reminder
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper className="panel-card">
            <Typography variant="h6" fontWeight={800}>Today's Hydration Log</Typography>
            <Box sx={{ mt: 2, maxHeight: 400, overflowY: 'auto', pr: 1 }}>
              {todayLogs.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                  No water logged yet today. Drink up!
                </Typography>
              ) : (
                todayLogs.map((log) => {
                  const dateObj = new Date(log.timestamp);
                  const timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  return (
                    <Box key={log.id} className="water-row" sx={{ mb: 1, p: 1.5, borderRadius: 2, background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight={600}>{timeString}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalDrink color="success" />
                        <Typography fontWeight={700}>{log.amount}ml</Typography>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
            <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="caption" sx={{ width: '100%', mb: 1 }}>Quick tags</Typography>
              {['Morning boost', 'Post-workout', 'Evening reset'].map((tag) => (
                <Chip key={tag} label={tag} onClick={() => handleAddWater(300)} sx={{ background: '#eef8f2', color: '#0d8b5d', cursor: 'pointer', '&:hover': { background: '#d1f0df' } }} />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </motion.section>
  )
}

export default WaterTracker
