import { Nav } from './styled';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const estadoBotao = useSelector((state) => state.test.estadoBotao);

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/teste">
        <FaSignInAlt size={24} />
      </Link>

      <p style={{ color: 'white' }}>{`${estadoBotao}`}</p>
    </Nav>
  );
}
