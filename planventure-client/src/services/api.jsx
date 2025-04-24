const BASE_URL = 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  if (response.status === 404) {
    throw new Error('Trip not found');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Request failed');
  }

  console.log('API Response:', data); // Debug log
  return data;
};

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  
  post: async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  auth: {
    login: async (credentials) => {
      return api.post('/auth/login', credentials);
    },

    register: async (userData) => {
      return api.post('/auth/register', userData);
    }
  }
};

export default api;