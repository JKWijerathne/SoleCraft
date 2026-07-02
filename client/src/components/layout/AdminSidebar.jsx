import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Star, ArrowLeft, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../../store/slices/authSlice';

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
  ];

  return (
    <div className="w-64 bg-white border-r border-[#CBD5E1]/70 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50">
      <div className="p-6 border-b border-[#CBD5E1]/40 flex items-center gap-2">
        <span className="text-xl font-extrabold tracking-tighter text-[#071A2F] uppercase">
          Sole<span className="text-[#F5B942]">Craft</span> <span className="text-xs text-[#111827]/60 ml-1">Admin</span>
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                isActive
                  ? 'bg-[#F5B942]/10 text-[#F5B942] border border-[#F5B942]/20'
                  : 'text-[#111827]/60 hover:bg-[#F8FAFC] hover:text-[#071A2F]'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#CBD5E1]/40 space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-[#111827]/60 hover:bg-[#F8FAFC] hover:text-[#071A2F]"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </NavLink>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-red-500 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
