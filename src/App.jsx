import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from './services/axios';
import GlobalStyle from './styles/GlobalStyles';
import Header from './components/header/header';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.Authorization;
    }
  }, [token]);

  return (
    <>
      <Header />
      <AppRoutes />
      <GlobalStyle />
      <ToastContainer autoClose={3000} className="toast-container" />
    </>
  );
}
