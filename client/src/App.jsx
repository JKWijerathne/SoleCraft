import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Men from './pages/Men/Men';
import Women from './pages/Women/Women';
import Boys from './pages/Boys/Boys';
import Girls from './pages/Girls/Girls';
import ProductDetails from './pages/ProductDetails/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827] selection:bg-[#F5B942]/30 selection:text-[#071A2F]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/woman" element={<Women />} />
          <Route path="/women" element={<Women />} />
          <Route path="/boys" element={<Boys />} />
          <Route path="/girls" element={<Girls />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;