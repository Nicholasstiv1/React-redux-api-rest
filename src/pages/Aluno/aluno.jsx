import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../styles/GlobalStyles';
import { useEffect, useState } from 'react';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/loading';
import axios from '../../services/axios';
import { Form, ProfilePicture, Title } from './styled';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/modules/authSlice';
import { persistor } from '../../store/store';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Aluno() {
  const { id } = useParams();
  const alunoId = Number(id) || 0;

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!alunoId) return;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${alunoId}`);
        const Foto = data.Fotos?.[0]?.url ?? '';

        setFoto(Foto);
        setNome(data.nome ?? '');
        setSobrenome(data.sobrenome ?? '');
        setEmail(data.email ?? '');
        setIdade(String(data.idade ?? ''));
        setPeso(String(data.peso ?? ''));
        setAltura(String(data.altura ?? ''));
      } catch (err) {
        const status = err.response?.status ?? 0;
        const errors = err.response?.data?.errors ?? [];

        if (status === 400) errors.forEach((error) => toast.error(error));
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [alunoId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres.');
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres.');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('E-mail inválido.');
      formErrors = true;
    }

    if (!isInt(idade, { min: 0, max: 150 })) {
      toast.error('Idade precisa ser um número inteiro válido.');
      formErrors = true;
    }

    if (!isFloat(peso, { min: 0 })) {
      toast.error('Peso precisa ser um número válido.');
      formErrors = true;
    }

    if (!isFloat(altura, { min: 0 })) {
      toast.error('Altura precisa ser um número válido.');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (alunoId) {
        await axios.put(`/alunos/${alunoId}`, {
          nome,
          sobrenome,
          email,
          idade: Number(idade),
          peso: Number(peso),
          altura: Number(altura),
        });
        toast.success('Aluno editado com sucesso!');
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade: idade,
          peso: peso,
          altura: altura,
        });
        toast.success('Aluno criado com sucesso!');
        navigate(`/aluno/${data.id}/edit`);
      }

      setIsLoading(false);
    } catch (err) {
      const errors = err.response?.data?.errors ?? [];
      const status = err.response?.status ?? 0;
      if (errors.length > 0) {
        errors.forEach((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) {
        dispatch(logout());
        persistor.purge();
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar aluno' : 'Novo aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${alunoId}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />

        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />

        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
