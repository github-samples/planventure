import { Box, Container, Typography, Link, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: (theme) => theme.palette.grey[100],
        zIndex: 1000
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Planventure.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="https://gh.io/gfb-copilot" alt="GitHub Copilot" target="_blank" color="text.secondary" underline="hover">
            Built with GitHub Copilot 🤖
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;