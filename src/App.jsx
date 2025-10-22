import GlobalStyle from './styles/GlobalStyles';
import Header from './components/header/header';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ToastContainer } from 'react-toastify';
import { store, persistor } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <AppRoutes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} className="toast-container" />
      </PersistGate>
    </Provider>
  );
}

export default App;
