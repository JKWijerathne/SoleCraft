import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Trash2, Shield, ShieldOff, Phone, MapPin } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const API_URL = (import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000') + '/api/admin/users';
        const { data } = await axios.get(API_URL, config);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const API_URL = (import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000') + `/api/admin/users/${id}`;
        await axios.delete(API_URL, config);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-[#071A2F]">
            Users
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6 font-semibold">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-10 font-bold text-[#071A2F]">
            Loading users...
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-transparent border-b border-[#CBD5E1]/50">
                    <th className="p-4 font-extrabold text-[#071A2F] text-sm uppercase tracking-wider">
                      Name
                    </th>
                    <th className="p-4 font-extrabold text-[#071A2F] text-sm uppercase tracking-wider">
                      Email
                    </th>
                    <th className="p-4 font-extrabold text-[#071A2F] text-sm uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="p-4 font-extrabold text-[#071A2F] text-sm uppercase tracking-wider">
                      Role
                    </th>
                    <th className="p-4 font-extrabold text-[#071A2F] text-sm uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th className="p-4 font-extrabold text-[#071A2F] text-sm uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-[#CBD5E1]/50 hover:bg-[#F8FAFC] transition-colors"
                      >
                        <td className="p-4 text-sm font-medium text-[#111827] min-w-[150px]">
                          {user.name}
                        </td>

                        <td className="p-4 text-sm font-normal text-[#111827]/70">
                          {user.email}
                        </td>
                        
                        <td className="p-4 text-sm font-normal text-[#111827]/70">
                          {user.phone ? (
                             <span className="flex items-center gap-1"><Phone className="w-3 h-3"/>{user.phone}</span>
                          ) : (
                             <span className="text-gray-400 italic">Not provided</span>
                          )}
                        </td>

                        <td className="p-4 text-sm font-normal text-[#111827]/70">
                          {user.isAdmin ? (
                            <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full text-xs font-bold">
                              <Shield className="w-3 h-3" /> Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full text-xs font-bold">
                              <ShieldOff className="w-3 h-3" /> Customer
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-sm font-normal text-[#111827]/70 whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {!user.isAdmin && (
                                <button
                                  type="button"
                                  onClick={() => handleDelete(user._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete user"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-8 text-center text-[#111827]/60 font-medium"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
