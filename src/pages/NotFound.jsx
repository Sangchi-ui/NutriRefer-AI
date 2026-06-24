import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SearchOff } from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <SearchOff sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
      </motion.div>
      <Typography variant="h2" fontWeight={900} color="primary.main">404</Typography>
      <Typography variant="h5" fontWeight={700} sx={{ mt: 1, mb: 2 }}>Page Not Found</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mb: 4 }}>
        Oops! We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ borderRadius: 2, px: 4, py: 1.5 }}>
        Return to Home
      </Button>
    </Box>
  );
};

export default NotFound;
