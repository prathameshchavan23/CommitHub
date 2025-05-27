import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // If userData is not null, then we don't need to fetch user data again
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status == 401) {
        //* To have login as first page
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if(!userData){
      fetchUser();
    }
  }, []);

  return (
    <div className="bg-black">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
