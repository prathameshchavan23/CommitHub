import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [photoURL, setphotoURL] = useState(user.photoURL);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000); // Auto-hide after 3 sec
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  const saveProfile = async () => {
    try {
      const response = await axios.patch(
        BASE_URL + "/Profile/edit",
        {
          firstName,
          lastName,
          age,
          photoURL,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data.data));
      setShowToast(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Edit Your Profile
          </h1>
          <p className="text-gray-400">
            Update your information and see the live preview
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Edit Form */}
          <div className="relative">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-700/50">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full translate-y-8 -translate-x-8 opacity-20"></div>

              <div className="relative z-10 space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Profile Information
                  </h2>
                </div>

                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-sm font-semibold text-white flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-purple-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        First Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      placeholder="Enter your first name"
                      className="input w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-black"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="text-sm font-semibold text-white flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-pink-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Last Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      placeholder="Enter your last name"
                      className="input w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-200 bg-black"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Photo URL */}
                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-semibold text-white flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Photo URL
                    </span>
                  </label>
                  <input
                    type="url"
                    value={photoURL}
                    placeholder="Enter your photo URL"
                    className="input w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-black"
                    onChange={(e) => setphotoURL(e.target.value)}
                  />
                </div>

                {/* Age and Gender */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-sm font-semibold text-white flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Age
                      </span>
                    </label>
                    <input
                      type="number"
                      value={age}
                      placeholder="Enter your age"
                      className="input w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-black"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="text-sm font-semibold text-white flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-indigo-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                          />
                        </svg>{" "}
                        Gender
                      </span>
                    </label>
                    <select
                      value={gender}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-600 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 transition-all duration-200 bg-gray-800/50 text-white outline-none appearance-none cursor-pointer"
                      onChange={(e) => setGender(e.target.value)}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.75rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option value="" disabled className="text-black">
                        Select gender
                      </option>
                      <option value="Male" className="text-gray-900">
                        Male
                      </option>
                      <option value="Female" className="text-gray-900">
                        Female
                      </option>
                      <option value="Other" className="text-gray-900">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* About */}
                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-semibold text-white flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      About Me
                    </span>
                  </label>
                  <textarea
                    value={about}
                    placeholder="Tell us something about yourself..."
                    className="textarea w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-black resize-none"
                    rows={4}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>

                {/* Save Button */}
                <div className="form-control mt-8">
                  <button
                    className="group relative w-full px-6 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                    onClick={saveProfile}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative flex items-center justify-center space-x-2">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Save Changes</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-violet-300 mb-2">
                  Live Preview
                </h3>
              </div>

              <div className="relative">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl transform rotate-2 opacity-30"></div>
                <div className="relative transform -rotate-1">
                  <UserCard
                    user={{ firstName, lastName, age, gender, about, photoURL }}
                  />
                </div>
                {showToast && (
                  <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade">
                    <div className="flex items-center gap-3 px-6 py-4 bg-green-100 text-green-800 rounded-xl shadow-lg border border-green-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Profile saved successfully.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
