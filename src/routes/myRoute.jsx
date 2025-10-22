import { Navigate, useLocation, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MyRoute({ isClosed }) {
  const isLoggedIn = false;
  const location = useLocation();

  if (isClosed && !isLoggedIn) {
    return (
      <Navigate to="/login" replace state={{ prevPath: location.pathname }} />
    );
  }

  return <Outlet />;
}

MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  isClosed: PropTypes.bool,
};
