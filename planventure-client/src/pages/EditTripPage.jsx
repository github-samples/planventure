import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Alert, Button, Skeleton } from '@mui/material';
import EditTripForm from '../components/trips/EditTripForm';
import { tripService } from '../services/tripService';

const EditTripPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await tripService.getTrip(tripId);
        if (!response || !response.trip) {
          throw new Error('Trip not found');
        }
        setTrip(response.trip);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  if (loading) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Alert 
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (!trip) {
    return null;
  }

  return <EditTripForm trip={trip} />;
};

export default EditTripPage;
