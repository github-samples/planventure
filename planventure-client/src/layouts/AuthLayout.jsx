import { Box, Container } from '@mui/material';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const AuthLayout = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      bgcolor: 'background.default'
    }}>
      <Navbar />
      <Container 
        component="main" 
        maxWidth="xs"
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
          px: { xs: 2, sm: 3 },
          mt: 8,
          mb: 10
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 1,
            width: '100%'
          }}
        >
          {children}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default AuthLayout;