import { Box, Button, Chip, Grid, Paper, TextField, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { AutoAwesome, Send } from '@mui/icons-material'

const suggestions = [
  'Add more leafy greens to lunch',
  'Swap soda for infused water',
  'Increase protein at breakfast'
]

const mealIdeas = [
  { time: 'Breakfast', title: 'Berry Oat Bowl', calories: '340 kcal' },
  { time: 'Lunch', title: 'Mediterranean Plate', calories: '510 kcal' },
  { time: 'Dinner', title: 'Tofu Stir-fry', calories: '460 kcal' }
]

const Assistant = () => {
  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper className="panel-card assistant-panel">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AutoAwesome color="success" />
              <Typography variant="h5" fontWeight={800}>AI Nutrition Assistant</Typography>
            </Box>
            <Box className="chat-box">
              <Box className="chat-message ai">
                <Typography variant="body2">Hi! Based on your goals, I recommend keeping your protein intake around 130g and adding more hydration this afternoon.</Typography>
              </Box>
              <Box className="chat-message user">
                <Typography variant="body2">Can you suggest a light lunch with low carbs?</Typography>
              </Box>
              <Box className="chat-message ai">
                <Typography variant="body2">Absolutely — try a grilled chicken salad with quinoa, avocado, cucumber, and olive oil dressing.</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <TextField fullWidth placeholder="Ask your nutrition coach..." />
              <Button variant="contained" className="button-primary">
                <Send />
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper className="panel-card">
            <Typography variant="caption" color="text.secondary">Today’s recommendations</Typography>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Focus areas</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {suggestions.map((item) => (
                <Chip key={item} label={item} sx={{ background: '#eef8f2', color: '#0d8b5d', fontWeight: 600 }} />
              ))}
            </Box>
            <Box className="macro-card">
              <Typography variant="body2" color="text.secondary">Macro balance</Typography>
              <Typography variant="h3" fontWeight={900}>72%</Typography>
              <Typography variant="body2" color="text.secondary">Protein 38% · Carbs 35% · Fats 27%</Typography>
            </Box>
          </Paper>
          <Paper className="panel-card" sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Suggested meals</Typography>
            {mealIdeas.map((item) => (
              <Box key={item.title} className="meal-row">
                <Box>
                  <Typography fontWeight={700}>{item.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{item.time}</Typography>
                </Box>
                <Typography fontWeight={700}>{item.calories}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </motion.section>
  )
}

export default Assistant
