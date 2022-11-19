import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Fallback from 'Components/Fallback';

const Home = lazy(() => import('./pages/Home'));
const Report = lazy(() => import('./pages/Report'));

const App = () => (
  <Suspense fallback={<Fallback />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="report/:username" element={<Report />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Suspense>
);

export default App;
