import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Report from './pages/Report';

const App = () => (
  <Routes>
    <Route path="*" element={<Home />} />
    <Route path="report/:profileId" element={<Report />} />
  </Routes>
);

export default App;
