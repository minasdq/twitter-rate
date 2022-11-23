import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Fallback from 'Components/Fallback';
import Layout from 'Components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Report = lazy(() => import('./pages/Report'));

const App = () => (
  <Suspense fallback={<Fallback />}>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="report/:username" element={<Report />} />
      </Routes>
    </Layout>
  </Suspense>
);

export default App;
