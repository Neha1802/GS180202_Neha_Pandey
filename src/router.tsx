import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stores from './pages/Stores';
import SKUs from './pages/SKUs';
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
        <Route path="/stores" element={<Stores />} />
        <Route path="/skus" element={<SKUs />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;