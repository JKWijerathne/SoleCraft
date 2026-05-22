import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || (!user.isAdmin && user.role !== 'admin')) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminRoute;
