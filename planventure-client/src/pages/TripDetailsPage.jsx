import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  Skeleton,
  Alert,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import {
  AccessTime,
  LocationOn,
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { tripService } from '../services/tripService';
import dayjs from 'dayjs';
import ItineraryDay from '../components/itinerary/ItineraryDay';
import { generateTemplateForDate } from '../data/itineraryTemplates';
import EmptyItinerary from '../components/itinerary/EmptyItinerary';
import AccommodationCard from '../components/overview/AccommodationCard';
import TransportationCard from '../components/overview/TransportationCard';
import EmptyOverviewSection from '../components/overview/EmptyOverviewSection';
import { Add as AddIcon } from '@mui/icons-material';

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} style={{ padding: '24px 0' }}>
    {value === index && children}
  </div>
);

const TripDetailsPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [itinerary, setItinerary] = useState({});
  const [accommodations, setAccommodations] = useState([]);
  const [transportation, setTransportation] = useState([]);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        const response = await tripService.getTrip(tripId);
        console.log('TripDetailsPage received:', response);

        if (!response || !response.trip) {
          throw new Error('Trip not found');
        }

        setTrip(response.trip);
      } catch (err) {
        console.error('Error fetching trip:', err);
        setError(err.message || 'Failed to load trip details');
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddSlot = (date, newSlot) => {
    setItinerary(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), newSlot]
    }));
  };

  const handleUpdateSlot = (date, updatedSlot) => {
    setItinerary(prev => ({
      ...prev,
      [date]: prev[date].map(slot => 
        slot.id === updatedSlot.id ? updatedSlot : slot
      )
    }));
  };

  const handleDeleteSlot = (date, slotId) => {
    setItinerary(prev => ({
      ...prev,
      [date]: prev[date].filter(slot => slot.id !== slotId)
    }));
  };

  const handleCreateEmptyItinerary = () => {
    const dates = getDatesArray(trip.start_date, trip.end_date);
    const emptyItinerary = dates.reduce((acc, date) => {
      acc[date] = [];
      return acc;
    }, {});
    setItinerary(emptyItinerary);
  };

  const handleUseTemplate = () => {
    const dates = getDatesArray(trip.start_date, trip.end_date);
    const templateItinerary = dates.reduce((acc, date) => {
      acc[date] = generateTemplateForDate(date);
      return acc;
    }, {});
    setItinerary(templateItinerary);
  };

  const handleAddAccommodation = () => {
    const newAccommodation = {
      id: Date.now(),
      name: '',
      address: '',
      checkIn: new Date().toISOString().slice(0, 16),
      checkOut: new Date().toISOString().slice(0, 16),
      bookingRef: ''
    };
    setAccommodations([...accommodations, newAccommodation]);
  };

  const handleAddTransportation = () => {
    const newTransport = {
      id: Date.now(),
      type: 'flight',
      from: '',
      to: '',
      departure: new Date().toISOString().slice(0, 16),
      arrival: new Date().toISOString().slice(0, 16),
      bookingRef: ''
    };
    setTransportation([...transportation, newTransport]);
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Skeleton variant="text" height={40} width={200} />
        <Skeleton variant="rectangular" height={200} sx={{ mt: 2 }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
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
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Alert severity="error">
          Trip not found
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 3 }}
      >
        Back to Dashboard
      </Button>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {trip.title}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                icon={<LocationOn />}
                label={trip.destination}
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<AccessTime />}
                label={`${dayjs(trip.start_date).format('MMM D')} - ${dayjs(trip.end_date).format('MMM D, YYYY')}`}
                variant="outlined"
              />
            </Stack>
          </Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/trips/${tripId}/edit`)}
          >
            Edit Trip
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Overview" />
          <Tab label="Itinerary" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Accommodations</Typography>
                {accommodations.length > 0 && (
                  <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddAccommodation}
                  >
                    Add Accommodation
                  </Button>
                )}
              </Box>
              
              {accommodations.length === 0 ? (
                <EmptyOverviewSection
                  title="Accommodations"
                  description="Add details about where you'll be staying during your trip, including hotels, rentals, or other lodging arrangements."
                  onAdd={handleAddAccommodation}
                />
              ) : (
                accommodations.map(accommodation => (
                  <AccommodationCard
                    key={accommodation.id}
                    accommodation={accommodation}
                    onUpdate={(updated) => {
                      setAccommodations(accommodations.map(acc =>
                        acc.id === updated.id ? updated : acc
                      ));
                    }}
                    onDelete={(id) => {
                      setAccommodations(accommodations.filter(acc => acc.id !== id));
                    }}
                  />
                ))
              )}
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Transportation</Typography>
                {transportation.length > 0 && (
                  <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddTransportation}
                  >
                    Add Transportation
                  </Button>
                )}
              </Box>
              
              {transportation.length === 0 ? (
                <EmptyOverviewSection
                  title="Transportation"
                  description="Add your travel arrangements including flights, trains, rental cars, or other modes of transportation."
                  onAdd={handleAddTransportation}
                />
              ) : (
                transportation.map(transport => (
                  <TransportationCard
                    key={transport.id}
                    transport={transport}
                    onUpdate={(updated) => {
                      setTransportation(transportation.map(t =>
                        t.id === updated.id ? updated : t
                      ));
                    }}
                    onDelete={(id) => {
                      setTransportation(transportation.filter(t => t.id !== id));
                    }}
                  />
                ))
              )}
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Itinerary
            </Typography>
            {Object.keys(itinerary).length === 0 ? (
              <EmptyItinerary
                onCreateEmpty={handleCreateEmptyItinerary}
                onUseTemplate={handleUseTemplate}
              />
            ) : (
              trip && getDatesArray(trip.start_date, trip.end_date).map(date => (
                <ItineraryDay
                  key={date}
                  date={date}
                  slots={itinerary[date] || []}
                  onAddSlot={handleAddSlot}
                  onUpdateSlot={handleUpdateSlot}
                  onDeleteSlot={handleDeleteSlot}
                />
              ))
            )}
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

// Helper function to generate dates array
const getDatesArray = (startDate, endDate) => {
  const dates = [];
  let currentDate = dayjs(startDate);
  const lastDate = dayjs(endDate);

  while (currentDate.isBefore(lastDate) || currentDate.isSame(lastDate, 'day')) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};

export default TripDetailsPage;
