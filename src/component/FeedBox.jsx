import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import { useSiteMode } from "./Context";

function FeedBox() {
  const user = useSelector(selectUser);
  const { siteMode } = useSiteMode();

  return (
    <div className={`p-4 mb-4 rounded-lg shadow-md transition-all duration-300 ${
      siteMode === "dark" 
        ? "bg-gray-800 border border-gray-700 hover:border-gray-600" 
        : "bg-white border border-gray-200 hover:border-gray-400"
    }`}>
      <div className="flex items-center">
        <Avatar src={user?.photo} />
        <div className="ml-3">
          <h5 className={`font-bold ${
            siteMode === "dark" ? "text-gray-300" : "text-gray-800"
          }`}>
            What is your question or link?
          </h5>
        </div>
      </div>
    </div>
  );
}

export default FeedBox;