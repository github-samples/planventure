import {
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const EmptyOverviewSection = ({ title, description, onAdd }) => {
  return (
    <Paper 
      sx={{ 
        p: 3, 
        textAlign: 'center',
        bgcolor: 'background.default',
        mb: 2
      }}
    >
      <Typography variant="h6" gutterBottom>
        No {title} Added Yet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        Add {title}
      </Button>
    </Paper>
  );
};

export default EmptyOverviewSection;
