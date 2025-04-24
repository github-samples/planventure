import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import planventureLogo from '../assets/planventure-logo.svg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <img 
          src={planventureLogo} 
          alt="Planventure Logo"
          style={{
            height: '200px',
            marginBottom: '2rem'
          }}
        />
        <Typography 
          variant="h3" 
          component="h1"
          sx={{ 
            mb: 2, 
            textAlign: 'center',
            color: 'secondary.main'
          }}
        >
          Welcome to Planventure
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            mb: 2, 
            textAlign: 'center',
            color: 'secondary.light'
          }}
        >
          Your next adventure begins here. Start planning unforgettable trips with our intuitive planning tools and make every journey memorable.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/login')}
          sx={{ mt: 2 }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Home;