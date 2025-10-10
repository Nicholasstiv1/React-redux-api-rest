import GlobalStyle from './styles/GlobalStyles';
import Header from './components/header/header';
import AppRoutes from './routes';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <AppRoutes />
      <GlobalStyle />
      <ToastContainer autoClose={3000} className="toast-container" />
    </Provider>
  );
}

export default App;
