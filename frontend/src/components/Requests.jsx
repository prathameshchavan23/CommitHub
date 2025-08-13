import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [err, setError] = useState("");
  const [loading, setLoading] = useState({});

  const reviewRequest = async (status, _id) => {
    setLoading((prev) => ({ ...prev, [_id]: status }));
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, [_id]: null }));
    }
  };

  const fetchRequest = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.data));
      console.log(response.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-6xl">📮</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            No Connection Requests
          </h1>
          <p className="text-gray-400">
            When someone sends you a connection request, it will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Connection Requests
          </h1>
          <p className="text-gray-400">
            {requests.length} pending{" "}
            {requests.length === 1 ? "request" : "requests"}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Error Display */}
        {err && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-center">
            {err}
          </div>
        )}

        {/* Requests List */}
        <div className="space-y-6">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoURL, age, gender, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="group bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-800 overflow-hidden"
              >
                {/* Card Header with gradient */}
                <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    {/* Left Section - Profile Info */}
                    <div className="flex items-center space-x-6 flex-1">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-r from-purple-500 to-blue-500">
                          <img
                            alt="profile"
                            className="w-full h-full rounded-full object-cover border-2 border-gray-900"
                            src={
                              photoURL ||
                              "https://via.placeholder.com/80x80?text=👤"
                            }
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/80x80?text=👤";
                            }}
                          />
                        </div>
                        {/* New request indicator */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full border-2 border-gray-900 flex items-center justify-center animate-pulse">
                          <span className="text-white text-xs font-bold">
                            !
                          </span>
                        </div>
                      </div>

                      {/* Profile Details */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                          {firstName} {lastName}
                        </h2>

                        {/* Age and Gender Tags */}
                        {(age || gender) && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {age && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/50 text-blue-300 border border-blue-800">
                                🎂 {age} years
                              </span>
                            )}
                            {gender && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-900/50 text-pink-300 border border-pink-800">
                                {gender === "Male"
                                  ? "👨"
                                  : gender === "Female"
                                  ? "👩"
                                  : "👤"}{" "}
                                {gender}
                              </span>
                            )}
                          </div>
                        )}

                        {/* About Section */}
                        {about && (
                          <p className="text-gray-300 leading-relaxed text-sm line-clamp-2">
                            {about}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Section - Action Buttons */}
                    <div className="flex flex-col gap-3 ml-6">
                      <button
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 min-w-[120px] ${
                          loading[request._id] === "accepted"
                            ? "bg-green-600 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl"
                        }`}
                        onClick={() => reviewRequest("accepted", request._id)}
                        disabled={loading[request._id]}
                      >
                        {loading[request._id] === "accepted" ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Accepting...
                          </div>
                        ) : (
                          <>✅ Accept</>
                        )}
                      </button>

                      <button
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 min-w-[120px] ${
                          loading[request._id] === "rejected"
                            ? "bg-red-600 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl"
                        }`}
                        onClick={() => reviewRequest("rejected", request._id)}
                        disabled={loading[request._id]}
                      >
                        {loading[request._id] === "rejected" ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Rejecting...
                          </div>
                        ) : (
                          <>❌ Reject</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom spacing */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default Requests;
