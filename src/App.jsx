import GlobalStyle from './styles/GlobalStyles';
import Header from './components/header/header';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <GlobalStyle />
      <ToastContainer autoClose={3000} className="toast-container" />
    </BrowserRouter>
  );
}

export default App;
