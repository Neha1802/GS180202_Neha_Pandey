import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './pages/Stores';
import SKU from './pages/SKUs';
import Planning from './pages/Planning';
import Chart from './pages/Chart';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/stores" element={<Store />} />
        <Route path="/skus" element={<SKU />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;