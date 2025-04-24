import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../../services/tripService';

const NewTripForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: dayjs(),
    endDate: dayjs().add(7, 'day')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tripData = {
        title: formData.title,
        destination: formData.destination,
        start_date: formData.startDate.format('YYYY-MM-DD'),
        end_date: formData.endDate.format('YYYY-MM-DD'),
        status: 'Upcoming'
      };

      const response = await tripService.createTrip(tripData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isDateRangeValid = () => {
    return formData.endDate.isAfter(formData.startDate) || 
           formData.endDate.isSame(formData.startDate);
  };

  const isFormValid = () => {
    return formData.title && 
           formData.destination && 
           isDateRangeValid() &&
           !loading;
  };

  return (
    <Paper elevation={2} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Plan a New Trip
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Trip Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={formData.startDate}
            onChange={(newValue) => {
              setFormData(prev => ({ ...prev, startDate: newValue }));
            }}
            minDate={dayjs()}
            slotProps={{
              textField: { fullWidth: true }
            }}
          />

          <DatePicker
            label="End Date"
            value={formData.endDate}
            onChange={(newValue) => {
              setFormData(prev => ({ ...prev, endDate: newValue }));
            }}
            minDate={formData.startDate}
            slotProps={{
              textField: { 
                fullWidth: true,
                error: !isDateRangeValid(),
                helperText: !isDateRangeValid() ? 'End date must be after start date' : ''
              }
            }}
          />
        </LocalizationProvider>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            sx={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid()}
            sx={{ flex: 1 }}
          >
            {loading ? 'Creating...' : 'Create Trip'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default NewTripForm;
