import { Navigate, useLocation, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ isClosed }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isClosed && !isLoggedIn) {
    return (
      <Navigate to="/login" replace state={{ prevPath: location.pathname }} />
    );
  }

  return <Outlet />;
}

PrivateRoute.defaultProps = {
  isClosed: false,
};

PrivateRoute.propTypes = {
  isClosed: PropTypes.bool,
};
