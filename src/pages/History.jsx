import { Box, Grid, LinearProgress, Paper, Typography, Chip, Avatar } from '@mui/material'
import { motion } from 'framer-motion'
import { useHealth } from '../hooks/useHealth'
import { LocalFireDepartment, AutoAwesome, CameraAlt, AccountCircle } from '@mui/icons-material'

const History = () => {
  const { historyEvents, streaks } = useHealth();

  const getEventIcon = (type) => {
    switch (type) {
      case 'plan': return <AutoAwesome color="primary" />;
      case 'scan': return <CameraAlt color="secondary" />;
      case 'profile': return <AccountCircle color="action" />;
      default: return <AutoAwesome />;
    }
  };

  const getEventLabel = (type) => {
    switch (type) {
      case 'plan': return 'AI Recommendation';
      case 'scan': return 'Food Scan';
      case 'profile': return 'Profile Update';
      default: return 'Activity';
    }
  };

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Paper className="panel-card" sx={{ textAlign: 'center', background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase">Activity Streak</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 1 }}>
              <LocalFireDepartment sx={{ fontSize: 60, color: '#ff9800' }} />
            </Box>
            <Typography variant="h2" fontWeight={900} color="#e65100">{streaks.current}</Typography>
            <Typography variant="body1" fontWeight={700} color="#ef6c00">Days in a row!</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Personal Best: {streaks.highest} days
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} lg={8}>
          <Paper className="panel-card">
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Activity Timeline</Typography>
            <Box sx={{ maxHeight: 400, overflowY: 'auto', pr: 1 }}>
              {historyEvents.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography variant="body1" color="text.secondary">No history events yet.</Typography>
                  <Typography variant="body2" color="text.secondary">Use the AI Planner or Food Scanner to build your history.</Typography>
                </Box>
              ) : (
                historyEvents.map((event) => {
                  const dateObj = new Date(event.timestamp);
                  const dateString = dateObj.toLocaleDateString();
                  const timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  
                  return (
                    <Box key={event.id} sx={{ display: 'flex', gap: 2, mb: 2, p: 2, borderRadius: 2, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <Avatar sx={{ bgcolor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        {getEventIcon(event.type)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="body1" fontWeight={700}>{getEventLabel(event.type)}</Typography>
                          <Typography variant="caption" color="text.secondary">{dateString} {timeString}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, whiteSpace: 'pre-line' }}>
                          {event.details}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </motion.section>
  )
}

export default History
