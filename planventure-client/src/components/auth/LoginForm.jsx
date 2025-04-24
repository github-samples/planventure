import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setIsAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  // Add state for success message
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || ''
  );

  // Pre-fill email if coming from signup
  useEffect(() => {
    if (location.state?.email) {
      setFormData(prev => ({
        ...prev,
        email: location.state.email
      }));
    }
  }, [location.state]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!re.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError || passwordError) {
      setFormErrors({
        email: emailError,
        password: passwordError
      });
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await api.auth.login(formData);
      console.log('Login response:', response);

      if (response.token) {
        login(response); // Pass the entire response
        console.log('Login successful, redirecting to dashboard...');
        navigate('/dashboard', { replace: true });
      } else {
        setError('Invalid login response');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom textAlign="center">
        Login to Planventure
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        disabled={isLoading}
        required
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        error={!!formErrors.password}
        helperText={formErrors.password}
        disabled={isLoading}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>

      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Button onClick={() => navigate('/signup')} stx={{ testTransform: 'none' }}>
          Sign up
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;