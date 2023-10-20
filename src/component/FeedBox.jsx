import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";

function FeedBox() {
  const user = useSelector(selectUser);
  return (
    <div className="p-2  md:ml-8 w-[80%]  mt-2 shadow-xl max-md:w-[100%] border border-lightgray bg-white rounded-lg cursor-pointer hover:border-gray-400">
      <div className="text-gray-500 font-bold ml-2 text-lg">
      <Avatar src={user?.photo} />
      </div>
      
      <div className="flex mt-2">
        <h5 className="font-bold text-gray-800 font-sans md:font-serif">What is your question or link?</h5>
      </div>
    </div>
  );
}

export default FeedBox;