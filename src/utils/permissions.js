import { ROLES } from './constants';

export const hasPermission = (userRole, requiredRole) => {
  const roleHierarchy = {
    [ROLES.ADMIN]: 3,
    [ROLES.USER]: 2,
    [ROLES.GUEST]: 1
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

export const canAccessRoute = (userRole, allowedRoles) => {
  return allowedRoles.some(role => hasPermission(userRole, role));
};