import { Box, Container } from '@mui/material';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%',
      position: 'relative'
    }}>
      <Navbar />
      <Container 
        component="main" 
        maxWidth="lg"
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          py: 3,
          px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
          mt: 8,
          mb: 10
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;
