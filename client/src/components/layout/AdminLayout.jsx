import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#F4E9E0] text-[#111827] selection:bg-[#F5B942]/30 selection:text-[#071A2F]">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
