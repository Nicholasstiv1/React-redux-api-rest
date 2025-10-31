import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { useEffect, useState } from 'react';
import { AlunoContainer, ProfilePicture } from './styled';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import { toast } from 'react-toastify';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get('/alunos');
        setAlunos(response.data);
      } catch (error) {
        toast.error('Erro ao carregar alunos');
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  const handleDelete = async (id, index) => {
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      toast.success('Aluno deletado com sucesso');
    } catch (error) {
      const errors = error?.response?.data?.errors ?? [];
      errors.forEach((err) => toast.error(err));
    } finally {
      setIsLoading(false);
      setConfirmDeleteId(null);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={aluno.id}>
            <ProfilePicture>
              {aluno.Fotos?.[0]?.url ? (
                <img src={aluno.Fotos[0].url} alt={aluno.nome} />
              ) : (
                <FaUserCircle size={48} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            {confirmDeleteId === aluno.id ? (
              <button
                type="button"
                onClick={() => handleDelete(aluno.id, index)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <FaExclamation size={16} color="red" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDeleteId(aluno.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <FaWindowClose size={16} />
              </button>
            )}
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
