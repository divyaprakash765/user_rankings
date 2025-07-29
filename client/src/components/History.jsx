import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const History = () => {
  const { userId } = useParams();
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://user-rankings.onrender.com/api/v1/user/${userId}`);
        setHistoryData(res.data.user.point_history); // Ensure this is an array
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/30">
      <div className="bg-white p-6 max-w-md w-full rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">User Claim History</h2>

        <div className="max-h-[300px] overflow-y-auto space-y-2 px-2">
          {historyData.length > 0 ? (
            historyData.map((item, index) => {
              const formattedDate = new Date(item.updatedAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <div key={item._id || index} className="border-b py-2 text-sm flex justify-between">
                  <span>{formattedDate}</span>
                  <span className="font-medium text-green-700">+{item.value} pts</span>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">No history found.</p>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default History;
