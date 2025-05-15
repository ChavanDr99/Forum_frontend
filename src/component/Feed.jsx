import React, { useEffect, useState } from 'react';
import FeedBox from './FeedBox';
import Post from './Post';
import Loader from './Loader';
import axios from 'axios';
import { useSiteMode } from "./Context";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { siteMode } = useSiteMode();

  useEffect(() => {
    axios
      .get("https://forum-backend-sooty.vercel.app/api/questions")
      .then((res) => {
        setPosts(res.data.reverse());
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className={`flex flex-col rounded-lg p-4 transition-all duration-300 ${
      siteMode === "dark" ? "bg-gray-900" : "bg-gray-50"
    }`}>
      {loading ? null : <FeedBox />}
      {loading ? (
        <Loader className='flex items-center justify-center' />
      ) : (
        posts.length > 0 ? (
          posts.map((post, index) => (
            <Post key={index} post={post} />
          ))
        ) : (
          <p className={`flex items-center justify-center mt-5 p-4 rounded-lg ${
            siteMode === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
          }`}>
            No posts to display
          </p>
        )
      )}
    </div>
  );
};

export default Feed;