import GlobalStyle from './styles/GlobalStyles';
import Header from './components/header/header';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
