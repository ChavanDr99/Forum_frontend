import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase";
import Spin from '../Spin';
const Login = () => {
    const handleSubmit = async () => {
        await signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      return (
        <div className="flex items-center justify-center min-h-screen min-w-screen bg-black">
        <div className="flex items-center flex-col bg-black text-white">
          <Spin />
          <h1 className="text-3xl font-semibold mt-6 font-sans md:font-serif">Welcome To IT Dept Community</h1>
          <p className="text-sm text-gray-400 mt-2 font-sans md:font-serif">Please Log In To Continue</p>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 mt-4 bg-blue-600 md:font-serif hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 text-white rounded-md font-mono cursor-pointer focus:outline-none"
          >
            Login To Continue
          </button>
        </div>
      </div>
      );
    }
    
    export default Login;
