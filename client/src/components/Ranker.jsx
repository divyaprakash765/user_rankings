import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import History from './History';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Ranker = ({ user, index, handleClaim }) => {
  const navigate = useNavigate();

  const handleHistory = async () => {
    navigate(`/history/${user._id}`);
    setHistoryVisible(true);
    toast.info(`Showing history for ${user?.name || 'User'}`);

  };

  return (
    <div>
    <div className="transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-xl">
      <div className='w-[18vh] h-[30vh] lg:w-[50vh] lg:h-[40vh] bg-white rounded-t-md mb-[2vh] flex items-center justify-center'>
        <div className="relative flex flex-col items-center">
          <img 
            src={user?.profile || "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"} 
            alt="profile" 
            className='rounded-full bg-gray-300 w-[8vh] h-[8vh] lg:w-[20vh] lg:h-[20vh] mb-3 border-2 border-yellow-400' 
          />

          <span className='absolute bottom-[14vh] lg:bottom-[15vh] left-1/2 transform -translate-x-1/2 w-[4vh] h-[3vh] lg:w-[5vh] lg:h-[4vh] bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold'>
            {index + 1}
          </span>

          <div className='flex flex-col items-center mt-2'>
            <div className='flex gap-1'>
              <h3 className='font-semibold text-lg text-zinc-600'>{user?.name || 'Unknown'}</h3>
              <i className="ri-user-add-fill text-yellow-500 text-lg"></i>
            </div>
            <div className='flex gap-1'>
              <i className="ri-medal-fill text-yellow-500 text-md"></i>
              <h3 className='font-semibold text-md'>{user?.points || 0}</h3>
            </div>
          </div>

          <div className='mt-1 lg:mt-5 flex lg:gap-6 gap-1'>
            <button 
              onClick={handleClaim}
              className='lg:px-3 lg:py-1 px-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-300'
            >
              Claim
            </button>
             <button 
      onClick={handleHistory}
      className='px-2 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-400'
    >
      History
    </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Ranker;
