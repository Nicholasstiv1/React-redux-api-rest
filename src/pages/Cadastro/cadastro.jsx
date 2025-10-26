import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/loading';

import axios from '../../services/axios';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    setIsLoading(true);

    try {
      await axios.post('/users/', {
        nome,
        password,
        email,
      });

      toast.success('Cadastro concluído com sucesso');
      setIsLoading(false);

      navigate('/login');
    } catch (error) {
      const errors = error?.response?.data?.errors ?? [];

      errors.map((e) => toast.error(e));
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Crie sua conta</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu Nome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">Criar conta</button>
      </Form>
    </Container>
  );
}
