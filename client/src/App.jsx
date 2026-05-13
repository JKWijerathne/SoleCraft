import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] text-white selection:bg-purple-500/30">
        <Routes>
          <Route path="/" element={<div className="flex items-center justify-center min-h-screen"><h1>SoleCraft Home (Coming Soon)</h1></div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
