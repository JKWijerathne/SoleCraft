import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { LogOut, Package, User as UserIcon, Mail, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="flex-1 bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#111827] mb-8"
        >
          My Profile
        </motion.h1>

        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-8 mb-8 gap-6 sm:gap-0">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-6"
              >
                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold uppercase shadow-sm">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                    {user.name}
                    {user.isAdmin && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </span>
                    )}
                  </h2>
                  <p className="text-gray-500 mt-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-gray-400" />
                  Account Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-5 space-y-4 border border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="font-medium text-[#111827]">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="font-medium text-[#111827]">{user.email}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  Quick Links
                </h3>
                <Link
                  to="/orders"
                  className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:border-[#111827] hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-2.5 rounded-md text-[#111827] group-hover:bg-[#111827] group-hover:text-white transition-colors">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[#111827]">Order History</p>
                      <p className="text-sm text-gray-500">View and track your past orders</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-6 border-t border-gray-100 flex justify-end"
            >
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
