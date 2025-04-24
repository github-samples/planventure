import { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Alert,
  Button 
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TripCard from './TripCard';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../../services/tripService';

const TripList = ({ WelcomeMessage, ErrorState }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await tripService.getAllTrips();
        console.log('TripList received data:', data); // Debug log
        
        if (!data || !data.trips) {
          console.error('Invalid data format:', data);
          setError('Unexpected data format received');
          return;
        }
        
        setTrips(data.trips);
      } catch (err) {
        console.error('TripList error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Loading state with skeleton cards
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((skeleton) => (
          <Grid item xs={12} sm={6} md={4} key={skeleton}>
            <TripCard loading={true} />
          </Grid>
        ))}
      </Grid>
    );
  }

  // Error state
  if (error) {
    return <ErrorState />;
  }

  // Empty state
  if (trips.length === 0) {
    return <WelcomeMessage />;
  }

  // Loaded state with trips
  return (
    <Grid container spacing={3}>
      {trips.map((trip) => (
        <Grid item xs={12} sm={6} md={4} key={trip.id}>
          <TripCard trip={trip} />
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={4}>
        <Button
          variant="outlined"
          fullWidth
          sx={{ 
            height: '100%', 
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => navigate('/trips/new')}
        >
          <AddIcon sx={{ mb: 1 }} />
          <Typography>Add New Trip</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default TripList;
