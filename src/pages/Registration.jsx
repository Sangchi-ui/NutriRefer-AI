import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Switch
} from '@mui/material'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const initialForm = {
  // Personal
  fullName: '', age: '', gender: '', height: '', weight: '', country: '', occupation: '',
  // Lifestyle
  activityLevel: '', dailySteps: '', sleepDuration: '', stressLevel: '', waterIntake: '', smokingStatus: '', alcoholConsumption: '',
  // Food
  dietaryPreference: '', favoriteFoods: '', dislikedFoods: '', foodAllergies: '', lactoseIntolerance: false, glutenSensitivity: false, mealsPerDay: '', fastFoodFrequency: '', fruitIntake: '', vegIntake: '',
  // Health
  medicalConditions: '', diabetesStatus: '', bloodPressureStatus: '', cholesterolStatus: '', medications: '', familyHistory: '', recentConcerns: '',
  // Fitness
  primaryGoal: '', targetWeight: '', targetTimeline: '', workoutFrequency: '', preferredExercises: ''
}

const steps = ['Personal Details', 'Lifestyle Info', 'Food Habits', 'Health Info', 'Fitness Goals']

const Registration = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState(initialForm)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('nutrimind-user') || 'null')
    if (stored) {
      setFormData({ ...initialForm, ...stored })
    }
  }, [])

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const validateStep = (step) => {
    switch (step) {
      case 0:
        if (!formData.fullName || !formData.age || !formData.gender || !formData.height || !formData.weight) {
          toast.error('Please fill all basic personal details.')
          return false
        }
        return true
      case 1:
        if (!formData.activityLevel || !formData.dailySteps) {
          toast.error('Please select an activity level and enter daily steps.')
          return false
        }
        return true
      case 2:
        if (!formData.dietaryPreference || !formData.mealsPerDay) {
          toast.error('Please specify your diet preference and meals per day.')
          return false
        }
        return true
      case 3:
        if (!formData.diabetesStatus || !formData.bloodPressureStatus) {
          toast.error('Please complete the basic health indicators.')
          return false
        }
        return true
      case 4:
        if (!formData.primaryGoal || !formData.targetWeight || !formData.targetTimeline) {
          toast.error('Please specify your fitness goals.')
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validateStep(activeStep)) return;
    
    localStorage.setItem('nutrimind-user', JSON.stringify(formData))
    toast.success('Profile saved successfully!')
    navigate('/plan')
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}><TextField label="Full Name" fullWidth value={formData.fullName} onChange={handleChange('fullName')} /></Grid>
            <Grid item xs={6} md={3}><TextField label="Age" fullWidth type="number" value={formData.age} onChange={handleChange('age')} /></Grid>
            <Grid item xs={6} md={3}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select value={formData.gender} label="Gender" onChange={handleChange('gender')}><MenuItem value="Male">Male</MenuItem><MenuItem value="Female">Female</MenuItem><MenuItem value="Other">Other</MenuItem></Select></FormControl></Grid>
            <Grid item xs={6} md={3}><TextField label="Height (cm)" fullWidth type="number" value={formData.height} onChange={handleChange('height')} /></Grid>
            <Grid item xs={6} md={3}><TextField label="Weight (kg)" fullWidth type="number" value={formData.weight} onChange={handleChange('weight')} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Country" fullWidth value={formData.country} onChange={handleChange('country')} /></Grid>
            <Grid item xs={12} md={3}><TextField label="Occupation" fullWidth value={formData.occupation} onChange={handleChange('occupation')} /></Grid>
          </Grid>
        )
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Activity Level</InputLabel><Select value={formData.activityLevel} label="Activity Level" onChange={handleChange('activityLevel')}><MenuItem value="Sedentary">Sedentary</MenuItem><MenuItem value="Lightly Active">Lightly Active</MenuItem><MenuItem value="Moderately Active">Moderately Active</MenuItem><MenuItem value="Very Active">Very Active</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} md={6}><TextField label="Average Daily Steps" fullWidth type="number" value={formData.dailySteps} onChange={handleChange('dailySteps')} /></Grid>
            <Grid item xs={12} md={4}><TextField label="Sleep Duration (hours)" fullWidth type="number" value={formData.sleepDuration} onChange={handleChange('sleepDuration')} /></Grid>
            <Grid item xs={12} md={4}><FormControl fullWidth><InputLabel>Stress Level</InputLabel><Select value={formData.stressLevel} label="Stress Level" onChange={handleChange('stressLevel')}><MenuItem value="Low">Low</MenuItem><MenuItem value="Medium">Medium</MenuItem><MenuItem value="High">High</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} md={4}><TextField label="Daily Water Intake (L)" fullWidth type="number" value={formData.waterIntake} onChange={handleChange('waterIntake')} /></Grid>
            <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Smoking Status</InputLabel><Select value={formData.smokingStatus} label="Smoking Status" onChange={handleChange('smokingStatus')}><MenuItem value="Never">Never</MenuItem><MenuItem value="Occasional">Occasional</MenuItem><MenuItem value="Regular">Regular</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Alcohol Consumption</InputLabel><Select value={formData.alcoholConsumption} label="Alcohol Consumption" onChange={handleChange('alcoholConsumption')}><MenuItem value="Never">Never</MenuItem><MenuItem value="Occasional">Occasional</MenuItem><MenuItem value="Regular">Regular</MenuItem></Select></FormControl></Grid>
          </Grid>
        )
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Dietary Preference</InputLabel><Select value={formData.dietaryPreference} label="Dietary Preference" onChange={handleChange('dietaryPreference')}><MenuItem value="Omnivore">Omnivore</MenuItem><MenuItem value="Vegetarian">Vegetarian</MenuItem><MenuItem value="Vegan">Vegan</MenuItem><MenuItem value="Keto">Keto</MenuItem><MenuItem value="Paleo">Paleo</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} md={6}><TextField label="Meals Per Day" fullWidth type="number" value={formData.mealsPerDay} onChange={handleChange('mealsPerDay')} /></Grid>
            <Grid item xs={12} md={6}><TextField label="Favorite Foods" fullWidth multiline rows={2} value={formData.favoriteFoods} onChange={handleChange('favoriteFoods')} /></Grid>
            <Grid item xs={12} md={6}><TextField label="Disliked Foods" fullWidth multiline rows={2} value={formData.dislikedFoods} onChange={handleChange('dislikedFoods')} /></Grid>
            <Grid item xs={12}><TextField label="Food Allergies" fullWidth value={formData.foodAllergies} onChange={handleChange('foodAllergies')} /></Grid>
            <Grid item xs={6} md={3}><FormControlLabel control={<Switch checked={formData.lactoseIntolerance} onChange={handleChange('lactoseIntolerance')} />} label="Lactose Intolerant" /></Grid>
            <Grid item xs={6} md={3}><FormControlLabel control={<Switch checked={formData.glutenSensitivity} onChange={handleChange('glutenSensitivity')} />} label="Gluten Sensitive" /></Grid>
            <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Fast Food Frequency</InputLabel><Select value={formData.fastFoodFrequency} label="Fast Food Frequency" onChange={handleChange('fastFoodFrequency')}><MenuItem value="Rarely">Rarely</MenuItem><MenuItem value="1-2 times/week">1-2 times/week</MenuItem><MenuItem value="3+ times/week">3+ times/week</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} md={6}><TextField label="Daily Fruit Intake (servings)" fullWidth type="number" value={formData.fruitIntake} onChange={handleChange('fruitIntake')} /></Grid>
            <Grid item xs={12} md={6}><TextField label="Daily Vegetable Intake (servings)" fullWidth type="number" value={formData.vegIntake} onChange={handleChange('vegIntake')} /></Grid>
          </Grid>
        )
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField label="Existing Medical Conditions" fullWidth multiline rows={2} value={formData.medicalConditions} onChange={handleChange('medicalConditions')} /></Grid>
            <Grid item xs={12} md={4}><FormControl fullWidth><InputLabel>Diabetes Status</InputLabel><Select value={formData.diabetesStatus} label="Diabetes Status" onChange={handleChange('diabetesStatus')}><MenuItem value="None">None</MenuItem><MenuItem value="Type 1">Type 1</MenuItem><MenuItem value="Type 2">Type 2</MenuItem><MenuItem value="Pre-diabetes">Pre-diabetes</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} md={4}><FormControl fullWidth><InputLabel>Blood Pressure</InputLabel><Select value={formData.bloodPressureStatus} label="Blood Pressure" onChange={handleChange('bloodPressureStatus')}><MenuItem value="Normal">Normal</MenuItem><MenuItem value="Elevated">Elevated</MenuItem><MenuItem value="High">High</MenuItem><MenuItem value="Low">Low</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} md={4}><FormControl fullWidth><InputLabel>Cholesterol</InputLabel><Select value={formData.cholesterolStatus} label="Cholesterol" onChange={handleChange('cholesterolStatus')}><MenuItem value="Normal">Normal</MenuItem><MenuItem value="Borderline">Borderline</MenuItem><MenuItem value="High">High</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12}><TextField label="Current Medications" fullWidth multiline rows={2} value={formData.medications} onChange={handleChange('medications')} /></Grid>
            <Grid item xs={12}><TextField label="Family Medical History" fullWidth multiline rows={2} value={formData.familyHistory} onChange={handleChange('familyHistory')} /></Grid>
            <Grid item xs={12}><TextField label="Recent Health Concerns" fullWidth multiline rows={2} value={formData.recentConcerns} onChange={handleChange('recentConcerns')} /></Grid>
          </Grid>
        )
      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Primary Goal</InputLabel><Select value={formData.primaryGoal} label="Primary Goal" onChange={handleChange('primaryGoal')}><MenuItem value="Weight Loss">Weight Loss</MenuItem><MenuItem value="Weight Gain">Weight Gain</MenuItem><MenuItem value="Muscle Gain">Muscle Gain</MenuItem><MenuItem value="Maintenance">Maintenance</MenuItem><MenuItem value="Health Improvement">Health Improvement</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} md={6}><TextField label="Target Weight (kg)" fullWidth type="number" value={formData.targetWeight} onChange={handleChange('targetWeight')} /></Grid>
            <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Target Timeline</InputLabel><Select value={formData.targetTimeline} label="Target Timeline" onChange={handleChange('targetTimeline')}><MenuItem value="1 Month">1 Month</MenuItem><MenuItem value="3 Months">3 Months</MenuItem><MenuItem value="6 Months">6 Months</MenuItem><MenuItem value="1 Year">1 Year</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Workout Frequency</InputLabel><Select value={formData.workoutFrequency} label="Workout Frequency" onChange={handleChange('workoutFrequency')}><MenuItem value="0 days/week">0 days/week</MenuItem><MenuItem value="1-2 days/week">1-2 days/week</MenuItem><MenuItem value="3-4 days/week">3-4 days/week</MenuItem><MenuItem value="5+ days/week">5+ days/week</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12}><TextField label="Preferred Exercise Types" fullWidth multiline rows={2} value={formData.preferredExercises} onChange={handleChange('preferredExercises')} /></Grid>
          </Grid>
        )
      default:
        return 'Unknown step';
    }
  };

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <Paper className="panel-card registration-panel" sx={{ maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase">Comprehensive Profiling</Typography>
          <Typography variant="h4" fontWeight={800}>AI Consultant Setup</Typography>
        </Box>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}
          
          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button type="submit" variant="contained" className="button-primary">
                  Generate AI Report
                </Button>
              ) : (
                <Button variant="contained" className="button-primary" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Paper>
    </motion.section>
  )
}

export default Registration
