import React, { useState } from "react";
import Feed from "./Feed";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  if (!user) return <div>No user data available.</div>;
  const { _id, firstName, lastName, age, gender, photoURL, about } = user;
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative w-96 mx-auto overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10"></div>

      <figure className="relative overflow-hidden">
        <img
          className="h-72 w-full object-cover transition-transform duration-700 hover:scale-110"
          src={
            photoURL ||
            "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg"
          }
          alt={`${firstName} ${lastName}`.trim() || "User"}
          onError={(e) => {
            e.target.src =
              "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg";
          }}
        />
        {/* Floating heart icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </figure>

      <div className="relative z-20 p-6 space-y-4 bg-gradient-to-r from-black to-gray-50">
        {/* Name with gradient text */}
        <h2 className="text-2xl font-bold bg-gradient-to-r text-white via-pink-600 to-red-500 bg-clip-text text-transparent">
          {`${firstName} ${lastName}`.trim() || "Anonymous User"}
        </h2>

        {(age || gender) && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
            <p className="text-white-700 font-medium text-lg">
              {[age && `${age} years`, gender].filter(Boolean).join(", ")}
            </p>
          </div>
        )}

        {about && (
          <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border-l-4 border-green-300">
            {about}
          </p>
        )}

        {/* Action buttons with enhanced styling */}
        <div className="flex justify-center space-x-4 pt-6">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="group relative px-8 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="relative flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Ignore</span>
            </span>
          </button>

          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="group relative px-8 py-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-600 to-purple-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="relative flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Interested</span>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
    </div>
  );
};

export default UserCard;
