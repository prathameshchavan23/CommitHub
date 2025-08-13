import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useState } from "react";
const Feed = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const feed = useSelector((store) => store.feed);
  const [isLoading, setIsLoading] = useState(true);
  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(response?.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Ensures it runs whether success or failure
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">📱</div>
        <h1 className="text-2xl font-bold text-purple-400 mb-2">
          No Users in Feed
        </h1>
        <p className="text-gray-400">
          Check back later for new profiles to discover!
        </p>
      </div>
    );
  }
  return feed && Array.isArray(feed) && feed.length > 0 ? (
    <>
      <div className="flex flex-col items-center gap-4 my-5">
        {feed && feed.map((user) => <UserCard key={user._id} user={user} />)}
        {/* <UserCard user={feed[0]} /> */}
      </div>
    </>
  ) : null;
};

export default Feed;
