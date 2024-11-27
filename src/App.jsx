import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuth from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import { ROLES } from './utils/constants';

// Lazy load components
const AdminDashboard = React.lazy(() => import('./components/Dashboard/AdminDashboard'));
const UserDashboard = React.lazy(() => import('./components/Dashboard/UserDashboard'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  const initialize = useAuth((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Toaster position="top-right" />
        
        <main className="container mx-auto px-4 py-8">
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </React.Suspense>
        </main>
      </div>
    </Router>
  );
}