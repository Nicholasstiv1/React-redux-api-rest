import { Container } from '../../styles/GlobalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAluno } from '../../store/modules/alunoSlice';

export default function Page404() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.aluno);

  return (
    <Container>
      <h1>Essa Página não existe</h1>
      <button onClick={() => dispatch(fetchAluno(7))}>Buscar aluno</button>

      {status === 'loading' && <p>Carregando</p>}
      {status === 'failed' && <p>Falha</p>}
      {status === 'succeeded' && <p>Nome: {data.nome}</p>}
    </Container>
  );
}
