import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MyRoute({ children, isClosed }) {
  const isLoggedIn = false;
  const location = useLocation();

  if (isClosed && !isLoggedIn) {
    return (
      <Navigate to="/login" replace state={{ prevPath: location.pathname }} />
    );
  }

  return children;
}

MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isClosed: PropTypes.bool,
};
