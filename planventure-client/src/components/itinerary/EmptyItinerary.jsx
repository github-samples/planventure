import {
  Box,
  Typography,
  Button,
  Paper,
  Stack
} from '@mui/material';
import { PostAdd as PostAddIcon, AutoAwesome as AutoAwesomeIcon } from '@mui/icons-material';

const EmptyItinerary = ({ onCreateEmpty, onUseTemplate }) => {
  return (
    <Paper 
      sx={{ 
        p: 4, 
        textAlign: 'center',
        bgcolor: 'background.default' 
      }}
    >
      <Typography variant="h6" gutterBottom>
        Start Planning Your Trip
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Create an itinerary to organize your daily activities, meals, and travel arrangements.
      </Typography>
      
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button
          variant="outlined"
          startIcon={<PostAddIcon />}
          onClick={onCreateEmpty}
        >
          Start from Scratch
        </Button>
        <Button
          variant="contained"
          startIcon={<AutoAwesomeIcon />}
          onClick={onUseTemplate}
        >
          Use Template
        </Button>
      </Stack>
    </Paper>
  );
};

export default EmptyItinerary;
