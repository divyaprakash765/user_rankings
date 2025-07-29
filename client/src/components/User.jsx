import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const User = ({ user, index, handleClaim }) => {
  const navigate = useNavigate();

  const handleHistory = () => {
    navigate(`/history/${user._id}`);
    toast.info(`Showing history for ${user?.name || 'User'}`);
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6">
      <div className="flex flex-wrap items-center justify-between bg-white hover:bg-zinc-100 rounded-lg shadow-md py-3 px-4 transition-all duration-200 overflow-hidden">

        {/* Left: Rank, Avatar, Name */}
        <div className="flex items-center gap-3 flex-shrink min-w-[150px] max-w-full overflow-hidden">
          <span className="text-md font-semibold w-5 text-center">{index + 4}</span>

          <img
            src={user.profile || "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover border border-gray-300 flex-shrink-0"
          />

          <div className="flex items-center gap-1 truncate">
            <span className="font-semibold text-zinc-700 text-sm sm:text-md truncate">{user.name}</span>
            <i className="ri-user-add-fill text-yellow-500 text-lg"></i>
          </div>
        </div>

        {/* Middle: Buttons */}
        <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap sm:flex-nowrap">
          <button
            onClick={handleClaim}
            className="bg-yellow-400 text-sm text-black px-3 py-1 rounded-md font-medium hover:bg-yellow-300 transition"
          >
            Claim
          </button>
          <button
            onClick={handleHistory}
            className="bg-red-400 text-sm text-white px-3 py-1 rounded-md font-medium hover:bg-red-300 transition"
          >
            History
          </button>
        </div>

        {/* Right: Points */}
        <div className="flex items-center gap-1 mt-2 sm:mt-0">
          <i className="ri-medal-fill text-yellow-500 text-lg"></i>
          <span className="font-semibold text-md text-zinc-700">{user.points || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
