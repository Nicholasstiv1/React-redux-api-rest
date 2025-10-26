import { useEffect, useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/modules/authSlice';
import Loading from '../../components/Loading/loading';

export default function Login() {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }

    if (formErrors) return;

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      if (error.errors && error.errors.length > 0) {
        toast.error(error.errors[0]);
      } else {
        toast.error('Erro ao fazer login');
      }
      console.log(error);
    }
  }, [error]);

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />
        <button type="submit">Login</button>
      </Form>
    </Container>
  );
}
