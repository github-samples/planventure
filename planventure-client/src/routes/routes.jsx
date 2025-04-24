import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';
import NewTripPage from '../pages/NewTripPage';
import TripDetailsPage from '../pages/TripDetailsPage';
import EditTripPage from '../pages/EditTripPage';

export const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  }
];

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: <DashboardLayout><Dashboard /></DashboardLayout>,
  },
  {
    path: '/trips',
    element: <DashboardLayout><Dashboard /></DashboardLayout>,
  },
  {
    path: '/trips/new',
    element: <DashboardLayout><NewTripPage /></DashboardLayout>,
  },
  {
    path: '/trips/:tripId',
    element: <DashboardLayout><TripDetailsPage /></DashboardLayout>,
  },
  {
    path: '/trips/:tripId/edit',
    element: <DashboardLayout><EditTripPage /></DashboardLayout>,
  }
];