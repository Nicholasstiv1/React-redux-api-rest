import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/login';
import Aluno from '../pages/Aluno/aluno';
import Alunos from '../pages/Alunos/alunos';
import Fotos from '../pages/Fotos/fotos';
import Cadastro from '../pages/Cadastro/cadastro';

import Page404 from '../pages/Page404/page404';
import MyRoute from './myRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Protegidas */}

      <Route element={<MyRoute isClosed={true} />}>
        <Route path="/" element={<Alunos />} />
        <Route path="/aluno/:id" element={<Aluno />} />
        <Route path="/aluno/:id/edit" element={<Aluno />} />
        <Route path="/fotos/:id" element={<Fotos />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
