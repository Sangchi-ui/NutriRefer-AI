import { Box, Button, Chip, Grid, Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { CameraAlt, CloudUpload, FlashOn } from '@mui/icons-material'

const detectedFoods = [
  { name: 'Avocado Toast', calories: 320, protein: 12, carbs: 28, fat: 14 },
  { name: 'Greek Yogurt', calories: 180, protein: 18, carbs: 14, fat: 6 },
  { name: 'Mixed Salad', calories: 140, protein: 5, carbs: 12, fat: 8 }
]

const FoodScanner = () => {
  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper className="panel-card scanner-panel">
            <Box className="scanner-view">
              <CameraAlt sx={{ fontSize: 64, color: '#21b26a' }} />
              <Typography variant="h5" fontWeight={800}>Scan your meal</Typography>
              <Typography variant="body2" color="text.secondary">Point the camera at your food to estimate calories and nutrients.</Typography>
              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button variant="contained" className="button-primary">
                  <CameraAlt sx={{ mr: 1 }} /> Start Scan
                </Button>
                <Button variant="outlined" className="button-secondary">
                  <CloudUpload sx={{ mr: 1 }} /> Upload Photo
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Paper className="panel-card">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={800}>Detected items</Typography>
              <Chip label="High accuracy" color="success" />
            </Box>
            <Box sx={{ mt: 2 }}>
              {detectedFoods.map((item) => (
                <Box key={item.name} className="scanner-result">
                  <Box>
                    <Typography fontWeight={700}>{item.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.calories} kcal</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip size="small" label={`P ${item.protein}g`} />
                    <Chip size="small" label={`C ${item.carbs}g`} />
                    <Chip size="small" label={`F ${item.fat}g`} />
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: 2, p: 2, background: '#f5fbf7', borderRadius: 3 }}>
              <Typography variant="body2" color="text.secondary">Estimated meal total</Typography>
              <Typography variant="h4" fontWeight={900}>640 kcal</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </motion.section>
  )
}

export default FoodScanner
