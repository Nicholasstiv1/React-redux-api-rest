import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login/login';
import Page404 from '../pages/Page404/page404';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
