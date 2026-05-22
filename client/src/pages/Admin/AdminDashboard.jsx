import React from 'react';
import { Link } from 'react-router-dom';
import { Package, PlusCircle, Settings, Users, BarChart } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-[#071A2F] mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/admin/products" className="bg-white p-6 rounded-2xl shadow-sm border border-[#CBD5E1]/50 hover:shadow-md transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#F5B942]/20 transition-colors">
              <Package className="w-6 h-6 text-[#071A2F]" />
            </div>
            <h3 className="text-lg font-bold text-[#111827]">Manage Products</h3>
            <p className="text-sm text-[#111827]/60 mt-1">View, edit, and delete products</p>
          </Link>

          <Link to="/admin/add-product" className="bg-white p-6 rounded-2xl shadow-sm border border-[#CBD5E1]/50 hover:shadow-md transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#F5B942]/20 transition-colors">
              <PlusCircle className="w-6 h-6 text-[#071A2F]" />
            </div>
            <h3 className="text-lg font-bold text-[#111827]">Add Product</h3>
            <p className="text-sm text-[#111827]/60 mt-1">Create a new product listing</p>
          </Link>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#CBD5E1]/50 opacity-60 cursor-not-allowed">
            <div className="w-12 h-12 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#071A2F]" />
            </div>
            <h3 className="text-lg font-bold text-[#111827]">Manage Users</h3>
            <p className="text-sm text-[#111827]/60 mt-1">Coming soon</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#CBD5E1]/50 opacity-60 cursor-not-allowed">
            <div className="w-12 h-12 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-4">
              <BarChart className="w-6 h-6 text-[#071A2F]" />
            </div>
            <h3 className="text-lg font-bold text-[#111827]">Analytics</h3>
            <p className="text-sm text-[#111827]/60 mt-1">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
