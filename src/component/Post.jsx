import { Avatar } from "@material-ui/core";
import { useState } from 'react';
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from "@material-ui/icons";
import { Modal } from 'react-responsive-modal';
import CloseIcon from '@material-ui/icons/Close';
import 'react-responsive-modal/styles.css';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ReactTimeAgo from "react-time-ago";
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useSiteMode } from "./Context";

function LastSeen({ date }) {
  return <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />;
}

const Post = ({ post, index }) => {
  const [answer, setAnswer] = useState("");
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const user = useSelector(selectUser);
  const { siteMode } = useSiteMode();
  const Close = (<CloseIcon />);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer === null || answer.trim() === '') {
      toast.error("Please Enter your answer.");
    } 
    else if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        user: user,
      };
      try {
        const res = await axios.post("https://forum-backend-sooty.vercel.app/api/answers", body, config);
        toast.success('Answer added successfully!', { position: "top-center" });
        setIsModalOpen(false);
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-6 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
        siteMode === "dark" 
          ? "bg-gray-800 border border-gray-700" 
          : "bg-white border border-gray-200"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center">
          <Avatar src={post?.user?.photo} />
          <div className="ml-3">
            <h4 className={`text-sm font-medium ${
              siteMode === "dark" ? "text-gray-300" : "text-gray-800"
            }`}>
              {post?.user?.userName}
            </h4>
            {post?.createdAt && (
              <small className={`text-xs ${
                siteMode === "dark" ? "text-gray-500" : "text-gray-400"
              }`}>
                <LastSeen date={post.createdAt} />
              </small>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h3 className={`text-lg font-bold mb-3 ${
            siteMode === "dark" ? "text-white" : "text-gray-900"
          }`}>
            {post?.questionName}
          </h3>
          
          {post.questionUrl !== "" && (
            <img 
              src={post.questionUrl} 
              alt="url" 
              className="max-w-full h-auto rounded-lg mb-4"
            />
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className={`text-sm font-semibold ${
            siteMode === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {post?.allAnswers.length} Answer(s)
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className={`px-3 py-1 rounded-md text-md font-medium ${
              siteMode === "dark"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Answer
          </button>
        </div>
      </div>

      <div className={`border-t ${
        siteMode === "dark" ? "border-gray-700" : "border-gray-200"
      }`}>
        <button
          onClick={toggleAnswers}
          className={`w-full py-2 text-sm font-medium flex items-center justify-center ${
            siteMode === "dark" 
              ? "text-gray-400 hover:bg-gray-700" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {showAnswers ? (
            <>
              <ArrowUpwardOutlined className="mr-1" /> Hide Answers
            </>
          ) : (
            <>
              <ArrowDownwardOutlined className="mr-1" /> Show Answers
            </>
          )}
        </button>

        {showAnswers && (
          <div className="p-4">
            {post?.allAnswers?.length > 0 ? (
              post.allAnswers.map((_a) => (
                <div 
                  key={_a._id} 
                  className={`py-3 border-b ${
                    siteMode === "dark" 
                      ? "border-gray-700" 
                      : "border-gray-200"
                  }`}
                >
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: _a?.answer }}
                  ></div>
                  
                  <div className={`flex items-center text-xs mt-3 ${
                    siteMode === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}>
                    <span className="font-medium">{_a?.user?.userName}</span>
                    <span className="mx-2">•</span>
                    <LastSeen date={_a?.createdAt} />
                  </div>
                </div>
              ))
            ) : (
              <p className={`text-center py-4 ${
                siteMode === "dark" ? "text-gray-500" : "text-gray-400"
              }`}>
                No answers yet
              </p>
            )}
          </div>
        )}
      </div>

      <Modal 
        open={IsModalOpen} 
        CloseIcon={Close}
        onClose={() => setIsModalOpen(false)}
        center
        classNames={{
          modal: `rounded-lg md:max-w-2xl sm:max-w- xl w-full ${
            siteMode === "dark" ? "bg-gray-800" : "bg-white"
          }`,
        }}
      >
        <div className={`p-8 ${siteMode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
          <div className="mb-6">
            <h1 className={`text-3xl text-center font-bold mb-2 ${
              siteMode === "dark" ? "text-white" : "text-black"
            }`}>
              {post?.questionName}
            </h1>
            <p className={`text-sm text-center${
              siteMode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Asked by <span className="font-medium text-center">{post?.user?.userName}</span> on {' '}
              {new Date(post?.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mb-6">
            <ReactQuill 
              theme="snow"
              value={answer} 
              onChange={handleQuill}
              placeholder="Enter your answer..."
              className={`rounded ${
                siteMode === "dark" 
                  ? "bg-gray-200  text-black  border-gray-600" 
                  : "bg-white text-black border-gray-300"
              }`}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className={`px-4 py-2 rounded-md font-medium ${
                siteMode === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className={`px-4 py-2 rounded-md font-medium ${
                siteMode === "dark"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Add Answer
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Post;