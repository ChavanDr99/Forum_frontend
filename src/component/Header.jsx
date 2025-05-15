import React, { useState } from 'react';
import { Avatar, Input } from '@material-ui/core';
import Logo from '../assets/images.png';
import CloseIcon from '@material-ui/icons/Close';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { useSiteMode } from "./Context";
import { PeopleAltOutlined, ExpandMore } from '@material-ui/icons';
import 'react-responsive-modal/styles.css';

const Header = () => {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [InputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { siteMode, setSiteMode } = useSiteMode();
  const Close = (<CloseIcon />);

  const toggleTheme = () => {
    setSiteMode(siteMode === "light" ? "dark" : "light");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (question === null || question.trim() === '') {
        toast.error("Please Enter your Question.");
      }
      else if (question !== "") {
        const body = {
          questionName: question,
          questionUrl: InputUrl,
          user: user,
        }
        const result = await axios.post("https://forum-backend-sooty.vercel.app/api/questions", { data: body });
        if (result.data.status) {
          toast.success('Question added successfully!', { position: "top-center" });
          window.location.href = "/";
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure to logout ?")) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          console.log("Logged out");
        })
        .catch(() => {
          console.log("error in logout");
        });
    }
  };

  return (
    <header className={`sticky top-0 z-50 shadow-md transition-all duration-300 ${
      siteMode === "dark"
        ? "bg-gradient-to-tr from-[#1e2a36] via-[#1a252f] to-[#1f3d55] text-gray-300"
        : "bg-white text-black"
    }`}>
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        <div className="flex  items-center">
          <img className="h-12 w-12  object-contain" src={Logo} alt="Logo" />
          <h1 className='ml-2 font-bold text-2xl hidden md:block'>Community By VJTI</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
              siteMode === "dark"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Add Question
          </button>

          <div className="relative group">
            <Avatar src={user?.photo} className="cursor-pointer" onClick={handleLogout} />
            <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 hidden group-hover:block ${
              siteMode === "dark" ? "bg-gray-800" : "bg-white"
            }`}>
              <button
                onClick={handleLogout}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  siteMode === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal 
  open={IsModalOpen} 
  CloseIcon={Close}
  onClose={() => setIsModalOpen(false)}
  center
  classNames={{
    modal: `rounded-lg max-w-md w-full p-6 bg-gray-900 text-gray-100 shadow-lg`,
  }}
>
  <div>
    {/* Modal Header */}
    <h2 className="text-2xl font-bold mb-6">Ask a New Question</h2>
    
    {/* Question Input Label + Input */}
    <label className="block mb-1 font-semibold">
      Your Question <span className="text-red-500">*</span>
    </label>
    <textarea
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      placeholder="Type your question here..."
      className="w-full p-3 mb-6 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
      rows={4}
    />
    
    {/* Content Link Label + Input */}
    <label className="block mb-1 font-semibold">Optional Content Link</label>
    <input
      type="url"
      value={InputUrl}
      onChange={(e) => setInputUrl(e.target.value)}
      placeholder="Paste content URL (optional)"
      className="w-full p-3 mb-8 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    
    {/* Buttons */}
    <div className="flex justify-end space-x-4">
      <button
        onClick={() => setIsModalOpen(false)}
        className="px-5 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition text-gray-300 font-semibold"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 transition text-white font-semibold"
      >
        Add Question
      </button>
    </div>
  </div>
</Modal>

    </header>
  );
};

export default Header;