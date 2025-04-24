import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { publicRoutes, protectedRoutes } from './routes/routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            {publicRoutes.map((route) => (
              <Route 
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            
            {protectedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;