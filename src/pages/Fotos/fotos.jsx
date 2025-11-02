import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading/loading';
import { useEffect, useState } from 'react';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/modules/authSlice';

export default function Fotos() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState();
  const [foto, setFoto] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(data.Fotos?.[0]?.url ?? '');
        setIsLoading(false);
      } catch {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);

        navigate('/');
      }
    };

    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto enviada com sucesso');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = err.response ?? '';

      toast.error('Erro ao enviar foto');

      if (status === 401) dispatch(logout());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
