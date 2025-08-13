import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // axios.post(url, data, config);
      //Even if the logout endpoint doesn't require any data, axios.post() requires that second argument (data) if you're passing a third argument (config like withCredentials) else it'll interpret withCredentials as the data parameter
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-black shadow-md px-4 py-2">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-semibold text-primary-content">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-4 ">
          <div className="dropdown dropdown-end ">
            <p>Welcome, {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border border-gray-300"
            >
              <div className="w-12 rounded-full">
                <img alt="user profile photo" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-10 mt-3 w-56 p-3 shadow-lg border border-gray-200"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout} className="text-red-400">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
