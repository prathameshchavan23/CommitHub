import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [err, setError] = useState("");
  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response.data.data));
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">🤝</div>
        <h1 className="text-2xl font-bold text-purple-400 mb-2">
          No Connections Found
        </h1>
        <p className="text-gray-400">
          Start connecting with people to see them here!
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4 tracking-tight">
            My Connections
          </h1>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-6 py-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-pink-300 font-semibold text-lg">
                {connections.length}{" "}
                {connections.length === 1 ? "Connection" : "Connections"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-purple-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full animate-pulse"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
          </div>

          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Your network of meaningful connections and friendships
          </p>
        </div>
        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoURL, age, gender, about } =
              connection;

            return (
              <div
                key={_id}
                className="group bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-800 overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>

                <div className="p-6">
                  {/* Profile Section */}
                  <div className="flex items-start space-x-4">
                    <div className="relative">
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
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-gray-900 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {firstName} {lastName}
                      </h2>

                      {/* Age and Gender Tags */}
                      {(age || gender) && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {age && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-800">
                              🎂 {age} years
                            </span>
                          )}
                          {gender && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-900/50 text-pink-300 border border-pink-800">
                              {gender === "male"
                                ? "👨"
                                : gender === "female"
                                ? "👩"
                                : "👤"}{" "}
                              {gender}
                            </span>
                          )}
                        </div>
                      )}

                      {/* About Section */}
                      {about && (
                        <div className="relative">
                          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                            {about}
                          </p>
                          {about.length > 100 && (
                            <div className="absolute bottom-0 right-0 bg-gradient-to-l from-gray-900 via-gray-900 to-transparent pl-8">
                              <span className="text-purple-400 text-xs font-medium cursor-pointer hover:text-purple-300">
                                Read more
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
