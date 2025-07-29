import React, { useState } from "react";
import Ranker from "./ranker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./User";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState([]);

   const handleClaim = async (userId) => {
      try {
        const res = await axios.post(`http://localhost:3000/api/v1/user/claim/${userId}`);
        toast.success(`${res.data.point} ${res.data?.message || "Claimed successfully!"}`);
      } catch (err) {
        toast.error(err.response?.data?.message || "Claim failed!");
      }
    };


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/v1/user/");
      setUser(res.data.data);
    };
    fetchData();
  }, [handleClaim]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", image); // `file` is the key your backend expects

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setShowModal(false);
      setName("");
      setImage("");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-white relative flex flex-col">
      <h1 className="text-2xl sm:text-xl md:text-5xl font-bold text-center">
        Live Ranking
      </h1>

      {/* Add User Button */}
      <div className="text-center mt-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 text-white mb-1 px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          Add User
        </button>
      </div>

      {/* Background & Cards */}
      <div
        className='h-[95vh] w-full bg-cover bg-center
      bg-[url("https://media.craiyon.com/2025-04-06/ji4soH7fREiLKvHjwBz2eQ.webp")] z-0'
      >
        <div className="min-h-screen z-10 flex lg:px-32 px-[6px] lg:gap-20 pt-10 relative">
          {user.slice(0, 3).map((userItem, index) => (
            <Ranker key={index} user={userItem} index={index} handleClaim={() => handleClaim(userItem._id)} />
          ))}
        </div>
        <div className="h-[60vh] overflow-y-auto relative bottom-[65vh] lg:bottom-[54vh] z-10">
          {user.slice(3, user.size).map((userItem, index) => (
            <User key={index} user={userItem} index={index} handleClaim={() => handleClaim(userItem._id)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Add New User</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded-md"
                required
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="border p-2 rounded-md"
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default Home;
