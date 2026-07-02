import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../store/slices/authSlice';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && (user.isAdmin || user.role === 'admin')) {
      navigate('/admin/dashboard');
    }
    dispatch(reset());
  }, [user, success, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-[#CBD5E1]/70">
        <h2 className="text-2xl font-extrabold text-center text-[#071A2F] mb-8">Admin Login</h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm font-semibold">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#111827] mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F5B942] hover:bg-[#D99A20] text-[#071A2F] font-extrabold uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg shadow-[#F5B942]/20"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
