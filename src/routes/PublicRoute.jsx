import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PublicRoute() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to={location.state?.prevPath ?? '/'} replace />;
  }

  return <Outlet />;
}
