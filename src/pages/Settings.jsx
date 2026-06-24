import { useState } from 'react'
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import { motion } from 'framer-motion'

const Settings = () => {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper className="panel-card">
            <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>Preferences</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Email" defaultValue="alex@example.com" />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Units</InputLabel>
                  <Select defaultValue="metric" label="Units">
                    <MenuItem value="metric">Metric</MenuItem>
                    <MenuItem value="imperial">Imperial</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={<Switch checked={notifications} onChange={() => setNotifications(!notifications)} />}
                label="Daily reminders"
              />
              <FormControlLabel
                control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                label="Compact mode"
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper className="panel-card">
            <Typography variant="h6" fontWeight={800}>Account security</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Keep your profile secure and synced across devices.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 3 }}>
              <Button variant="outlined">Change password</Button>
              <Button variant="outlined">Download data</Button>
              <Button variant="contained" className="button-primary">Save settings</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </motion.section>
  )
}

export default Settings
