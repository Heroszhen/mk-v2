import { Outlet, Navigate, useLocation } from 'react-router-dom';

const MaintenanceGuard = () => {
  const reactLocation = useLocation();
  
  return import.meta.env.VITE_MAINTENANCE === '1' && !reactLocation.pathname.includes('maintenance') ? <Navigate to="/maintenance" /> : <Outlet />;
};
export default MaintenanceGuard;