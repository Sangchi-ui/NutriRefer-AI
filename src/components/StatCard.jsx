import { Box, Typography, Chip } from '@mui/material'
import { motion } from 'framer-motion'

const StatCard = ({ icon, label, value, trend, tone = 'primary' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        className={`stat-card stat-card--${tone}`}
        sx={{
          p: 2.5,
          borderRadius: 4,
          background: 'linear-gradient(180deg, #ffffff 0%, #f7fbf8 100%)',
          border: '1px solid #e6f0e8',
          minHeight: 140,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box className="stat-icon">{icon}</Box>
          <Chip
            label={trend}
            size="small"
            sx={{
              background: tone === 'success' ? '#e8f7f0' : '#eef6ff',
              color: tone === 'success' ? '#138857' : '#1f5ed8',
              fontWeight: 700
            }}
          />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={800} color="text.primary">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  )
}

export default StatCard
