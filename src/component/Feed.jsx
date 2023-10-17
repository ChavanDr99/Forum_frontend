import React, { useEffect, useState } from 'react';
import FeedBox from './FeedBox';
import Post from './Post';
import Loader from './Loader';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/questions")
      .then((res) => {
        console.log(res.data.reverse());
        setPosts(res.data);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((e) => {
        console.log(e);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <div className="flex flex-col">
      {loading ? null : <FeedBox />} {/* Conditionally render FeedBox */}
      {loading ? (
        <Loader className='flex items-center justify-center' /> 
      ) : (
        posts.length > 0 ? (
          posts.map((post, index) => (
            <Post key={index} post={post} />
          ))
        ) : (
          <p className='flex items-center justify-center mt-5 bg-text-500'>No posts to display</p>
        )
      )}
    </div>
  );
};

export default Feed;
