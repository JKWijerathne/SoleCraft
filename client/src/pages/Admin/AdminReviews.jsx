import React from 'react';
import { Star } from 'lucide-react';

const AdminReviews = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
      <div className="w-20 h-20 bg-[#F5B942]/20 rounded-full flex items-center justify-center mb-6">
        <Star className="w-10 h-10 text-[#071A2F]" />
      </div>
      <h1 className="text-3xl font-extrabold text-[#071A2F] mb-4">Manage Reviews</h1>
      <p className="text-[#111827]/60 max-w-md mx-auto text-lg">
        This feature is coming soon. You will be able to moderate and respond to product reviews from this page.
      </p>
    </div>
  );
};

export default AdminReviews;
