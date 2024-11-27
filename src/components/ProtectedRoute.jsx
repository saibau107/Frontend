import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { canAccessRoute } from '../utils/permissions';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!canAccessRoute(user.role, allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}