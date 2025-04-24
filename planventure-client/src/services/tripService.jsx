import { api } from './api';

export const tripService = {
  getAllTrips: async () => {
    try {
      console.log('Fetching trips with auth token:', localStorage.getItem('token')); // Debug log
      const response = await api.get('/api/trips');
      console.log('Trips response:', response); // Debug log
      return response;
    } catch (error) {
      console.error('Error in getAllTrips:', error); // Debug log
      if (error.message.includes('Session expired')) {
        // Handle session expiration specifically
        return { trips: [] };
      }
      throw error;
    }
  },

  createTrip: async (tripData) => {
    try {
      const response = await api.post('/api/trips', tripData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create trip');
    }
  },

  getTrip: async (tripId) => {
    try {
      console.log('Fetching trip with ID:', tripId);
      const response = await api.get(`/api/trips/${tripId}`);
      console.log('Raw trip response:', response);
      
      // If the response itself is the trip data
      if (response && response.id) {
        return { trip: response };
      }
      
      // If the trip is nested in a data or trips property
      if (response && (response.data || response.trips)) {
        return { trip: response.data || response.trips };
      }

      throw new Error('Invalid response format from server');
    } catch (error) {
      console.error('Error in getTrip:', error);
      throw new Error(error.message || 'Failed to fetch trip details');
    }
  },

  updateTrip: async (tripId, tripData) => {
    try {
      console.log('Updating trip:', tripId, tripData);
      const response = await api.put(`/api/trips/${tripId}`, tripData);
      console.log('Update response:', response);
      return response;
    } catch (error) {
      console.error('Error in updateTrip:', error);
      throw new Error(error.message || 'Failed to update trip');
    }
  },

  deleteTrip: async (tripId) => {
    try {
      const response = await api.delete(`/api/trips/${tripId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete trip');
    }
  }
};
