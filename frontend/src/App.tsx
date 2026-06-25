import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Expedientes } from './pages/Expedientes';
import { Personas } from './pages/Personas';
import { Organismos } from './pages/Organismos';
import { Maestros } from './pages/Maestros';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/" element={<MainLayout />}>
          {}
          <Route index element={<Dashboard />} />
          <Route path="expedientes" element={<Expedientes />} />
          <Route path="personas" element={<Personas />} />
          <Route path="organismos" element={<Organismos />} />
          <Route path="maestros" element={<Maestros />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;