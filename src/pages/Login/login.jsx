import { Title } from './styled';
import { Container } from '../../styles/GlobalStyles';
import { useDispatch } from 'react-redux';
import { botaoClicado } from '../../features/testSlice';

export default function Login() {
  const dispatch = useDispatch();

  return (
    <Container>
      <Title>Login</Title>
      <p>Placeholder</p>
      <button onClick={() => dispatch(botaoClicado())} type="button">
        Enviar
      </button>
    </Container>
  );
}
