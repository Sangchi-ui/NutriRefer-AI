import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Alert,
  AlertTitle,
  Divider,
  Tabs,
  Tab,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LocalDining,
  AutoAwesome,
  Refresh,
  Favorite,
  WarningAmber,
  MonitorHeart,
  Restaurant,
  DirectionsRun,
  Psychology,
  History,
  ExpandMore
} from '@mui/icons-material';
import { generateNutritionPlan } from '../services/geminiService';
import { useHealth } from '../hooks/useHealth';
import toast from 'react-hot-toast';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const NutritionPlan = () => {
  const navigate = useNavigate();
  const { addHistoryEvent, saveReport, getLatestReport, aiReports } = useHealth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [selectedReportId, setSelectedReportId] = useState('');

  const fetchNewReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const stored = JSON.parse(localStorage.getItem('nutrimind-user') || 'null');
      if (!stored) {
        navigate('/registration');
        return;
      }
      const newReport = await generateNutritionPlan(stored);
      saveReport(newReport);
      setReport(newReport);
      setSelectedReportId(newReport.id);
      addHistoryEvent('plan', 'Generated comprehensive AI Nutrition Consultant Report.');
      toast.success('Report generated successfully!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const latest = getLatestReport();
    if (latest) {
      setReport(latest);
      setSelectedReportId(latest.id);
    } else {
      fetchNewReport();
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReportChange = (event) => {
    const id = event.target.value;
    setSelectedReportId(id);
    const selected = aiReports.find(r => r.id === id);
    if (selected) setReport(selected);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <Psychology sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
        </motion.div>
        <Typography variant="h5" fontWeight={800}>AI Consultant is Analyzing Your Profile...</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, textAlign: 'center', maxWidth: 500 }}>
          Processing your health conditions, lifestyle data, and fitness goals to generate a comprehensive 20-point nutritional strategy.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 3 }}>
          <AlertTitle>Generation Failed</AlertTitle>
          {error}
        </Alert>
        <Button variant="contained" color="primary" onClick={fetchNewReport} sx={{ mt: 3, borderRadius: 2 }}>
          Retry Generation
        </Button>
      </Box>
    );
  }

  if (!report) return null;

  const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.section initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      
      {/* Header Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="caption" color="primary" fontWeight={800} sx={{ textTransform: 'uppercase', letterSpacing: 1.5 }}>
            Comprehensive AI Report
          </Typography>
          <Typography variant="h4" fontWeight={900}>
            Your Personal Consultant
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {aiReports.length > 1 && (
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>View History</InputLabel>
              <Select value={selectedReportId} label="View History" onChange={handleReportChange}>
                {aiReports.map((r, index) => (
                  <MenuItem key={r.id} value={r.id}>
                    Report: {new Date(r.timestamp).toLocaleDateString()} {index === 0 ? '(Latest)' : ''}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button variant="outlined" color="primary" startIcon={<Refresh />} onClick={fetchNewReport}>
            Regenerate
          </Button>
        </Box>
      </Box>

      {/* Motivation Banner */}
      <motion.div variants={cardVariants}>
        <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #138857 0%, #0d5c3a 100%)', color: 'white', borderRadius: 4 }}>
          <Box display="flex" gap={2} alignItems="center">
            <AutoAwesome sx={{ fontSize: 40, color: '#fde047' }} />
            <Box>
              <Typography variant="h6" fontWeight={800}>AI Insight</Typography>
              <Typography variant="body1">{report.personalizedMotivationalMessage}</Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Health Summary" icon={<Favorite />} iconPosition="start" />
          <Tab label="Nutrition Analysis" icon={<LocalDining />} iconPosition="start" />
          <Tab label="10-Day Plan" icon={<Restaurant />} iconPosition="start" />
          <Tab label="Strategies & Warnings" icon={<Psychology />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* TAB 1: Health Summary */}
      <CustomTabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="panel-card"><CardContent>
              <Typography variant="h6" fontWeight={800} color="primary" mb={1}>Nutrition Assessment</Typography>
              <Typography variant="body1">{report.nutritionAssessment}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="panel-card" sx={{ height: '100%' }}><CardContent>
              <Typography variant="h6" fontWeight={800} color="primary" mb={1}>Lifestyle Improvements</Typography>
              <Typography variant="body2">{report.lifestyleImprovementRecommendations}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="panel-card" sx={{ height: '100%' }}><CardContent>
              <Typography variant="h6" fontWeight={800} color="primary" mb={1}>Sleep Optimization</Typography>
              <Typography variant="body2">{report.sleepImprovementSuggestions}</Typography>
            </CardContent></Card>
          </Grid>
        </Grid>
      </CustomTabPanel>

      {/* TAB 2: Nutrition Analysis */}
      <CustomTabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="panel-card" sx={{ background: '#f8fafc' }}><CardContent>
              <Typography variant="caption" color="text.secondary">Target Calories</Typography>
              <Typography variant="h4" fontWeight={900} color="primary.main">{report.dailyCalorieTarget}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="panel-card" sx={{ background: '#f8fafc' }}><CardContent>
              <Typography variant="caption" color="text.secondary">Protein Target</Typography>
              <Typography variant="h4" fontWeight={900} color="secondary.main">{report.dailyProteinRequirement}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="panel-card" sx={{ background: '#f8fafc' }}><CardContent>
              <Typography variant="caption" color="text.secondary">Carbs Target</Typography>
              <Typography variant="h4" fontWeight={900} color="warning.main">{report.dailyCarbohydrateRecommendation}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="panel-card" sx={{ background: '#f8fafc' }}><CardContent>
              <Typography variant="caption" color="text.secondary">Fats Target</Typography>
              <Typography variant="h4" fontWeight={900} color="error.main">{report.dailyFatRecommendation}</Typography>
            </CardContent></Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="panel-card"><CardContent>
              <Typography variant="h6" fontWeight={800} color="success.main" mb={1}>Foods to Prioritize</Typography>
              <Typography variant="body2">{report.foodsToPrioritize}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="panel-card"><CardContent>
              <Typography variant="h6" fontWeight={800} color="error.main" mb={1}>Foods to Avoid</Typography>
              <Typography variant="body2">{report.foodsToAvoid}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12}>
            <Card className="panel-card"><CardContent>
              <Typography variant="h6" fontWeight={800} color="warning.main" mb={1}>Potential Deficiencies to Monitor</Typography>
              <Typography variant="body2">{report.nutritionalDeficienciesThatMayOccur}</Typography>
            </CardContent></Card>
          </Grid>
        </Grid>
      </CustomTabPanel>

      {/* TAB 3: 10-Day Meal Plan */}
      <CustomTabPanel value={tabValue} index={2}>
        {report.tenDayPlan?.map((dayPlan) => (
          <Accordion key={dayPlan.day} sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: 1 }}>
            <AccordionSummary expandIcon={<ExpandMore />} sx={{ backgroundColor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={800} color="primary">
                Day {dayPlan.day}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card className="panel-card" sx={{ height: '100%', border: '1px solid #e2e8f0', boxShadow: 'none' }}><CardContent>
                    <Typography variant="subtitle1" fontWeight={800} color="secondary" mb={1}>Breakfast</Typography>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {dayPlan.breakfast.map((item, idx) => <li key={idx}><Typography variant="body2">{item}</Typography></li>)}
                    </ul>
                  </CardContent></Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card className="panel-card" sx={{ height: '100%', border: '1px solid #e2e8f0', boxShadow: 'none' }}><CardContent>
                    <Typography variant="subtitle1" fontWeight={800} color="secondary" mb={1}>Lunch</Typography>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {dayPlan.lunch.map((item, idx) => <li key={idx}><Typography variant="body2">{item}</Typography></li>)}
                    </ul>
                  </CardContent></Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card className="panel-card" sx={{ height: '100%', border: '1px solid #e2e8f0', boxShadow: 'none' }}><CardContent>
                    <Typography variant="subtitle1" fontWeight={800} color="secondary" mb={1}>Dinner</Typography>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {dayPlan.dinner.map((item, idx) => <li key={idx}><Typography variant="body2">{item}</Typography></li>)}
                    </ul>
                  </CardContent></Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card className="panel-card" sx={{ height: '100%', border: '1px solid #e2e8f0', boxShadow: 'none' }}><CardContent>
                    <Typography variant="subtitle1" fontWeight={800} color="secondary" mb={1}>Snacks</Typography>
                    <ul style={{ paddingLeft: 20, margin: 0, marginBottom: 16 }}>
                      {dayPlan.snacks.map((item, idx) => <li key={idx}><Typography variant="body2">{item}</Typography></li>)}
                    </ul>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body2" fontWeight={700}>💧 Water Intake: {dayPlan.waterIntake}</Typography>
                  </CardContent></Card>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </CustomTabPanel>

      {/* TAB 4: Strategies & Warnings */}
      <CustomTabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="panel-card" sx={{ background: '#fff4f4', border: '1px solid #fecdd3' }}><CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <WarningAmber color="error" />
                <Typography variant="h6" fontWeight={800} color="error.main">Health Warnings & Risks</Typography>
              </Box>
              <Typography variant="body1">{report.potentialHealthRisks}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="panel-card" sx={{ height: '100%' }}><CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <DirectionsRun color="primary" />
                <Typography variant="h6" fontWeight={800}>Fitness Advice</Typography>
              </Box>
              <Typography variant="body2">{report.fitnessRecommendations}</Typography>
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="panel-card" sx={{ height: '100%' }}><CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <MonitorHeart color="primary" />
                <Typography variant="h6" fontWeight={800}>Long-Term Vision</Typography>
              </Box>
              <Typography variant="body2">{report.longTermHealthStrategy}</Typography>
            </CardContent></Card>
          </Grid>
        </Grid>
      </CustomTabPanel>

    </motion.section>
  );
};

export default NutritionPlan;
