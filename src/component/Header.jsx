import React, { useState } from 'react'
import Homeicon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import Feature from '@material-ui/icons/FeaturedPlayListOutlined'
import { Avatar, Input } from '@material-ui/core'
import Logo from '../assets/48.png'
import CloseIcon from '@material-ui/icons/Close'
import '../css/Header.css'
import { Modal } from 'react-responsive-modal'
import axios from 'axios';
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-hot-toast';;


import { AssignmentTurnedInOutlined, NotificationsOutlined, PeopleAltOutlined, Search, ExpandMore } from '@material-ui/icons'
import 'react-responsive-modal/styles.css'

const Header = () => {

  const [IsModalOpen, setIsModalOpen] = useState(false)
  const Close = (<CloseIcon />)
  const [InputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
        const result = await axios.post("http://localhost:3000/api/questions", { data: body });
        console.log(result);
        if (result.data.status) {
          toast.success('Question added successfully!', {
            position:"top-center"
        
           
          });
    
          window.location.href = "/";
        }

      }
    }
    catch (e) {
      console.log(e);
     
    }
  }

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
    <div className=' bg-white sticky top-0 z-10 shadow-md flex'>
      <div className='flex flex-row w-[100%] md:px-10 justify-between'>
       
        <div className="qHeader__logo flex fle-row">
          <img className="h-14 object-contain" src={Logo} alt="Logo" />
          <h1 className=' ml-2 font-bold py-2 text-2xl max-md:hidden'>Community By IT</h1>
        </div>      
        <div className='flex flex-row items-center gap-4 mr-1'>
        <div className="">
          <span onClick={handleLogout} className='cursor-pointer'>
            <Avatar src={user?.photo} />
          </span>
        </div>
        <div className="bg-blue-500 rounded px-3 py-0   cursor-pointer hover:bg-blue-600 ">
          <Button  className='font-sans md:font-serif'onClick={() => setIsModalOpen(true)} >Add Question</Button>
        </div>
        </div>
      </div>
      <Modal open={IsModalOpen} CloseIcon={Close}
        onClose={() => setIsModalOpen(false)
        } center classNames={{
          modal: 'customModal',
        }}
      >


        <div className="flex items-center mb-5 border-b border-opacity-50 border-gray-500 w-[100%]">
          <h5 className='text-gray-500 text-2xl cursor-pointer font-semibold mr-8 hover:text-red-600'>Add Question</h5>
          <h5 className='text-gray-500 text-2xl cursor-pointer font-semibold mr-8 hover:text-red-600'>Share Link</h5>
        </div>
        <div className="flex items-center mt-10">
          <Avatar src={user?.photo} />
          <div className="flex items-center text-gray-600 px-2 ml-2 bg-gray-300 rounded-full cursor-pointer">
            <PeopleAltOutlined />
            <p className='ml-2 text-sm text-gray-500'>Public</p>
            <ExpandMore />
          </div>
        </div>
        <div className="flex flex-col mt-10 flex-1 ">
          <Input value={question} onChange={(e) => setQuestion(e.target.value)} type='text' placeholder='Start Your question ' />
          <div style={{
            display: "flex",
            flexDirection: 'column'
          }}>
            <input value={InputUrl}
              onChange={(e) => setInputUrl(e.target.value)} type='text' placeholder='Optional: Content Link' className='flex-1  outline-none  mt-4 max-md:font-sm border-gray-400 border-b' />
            {InputUrl !== "" && <img style={{
              height: "40vh",
              objectFit: "contain",
            }} src={InputUrl} alt='displayimage' />}
          </div>
        </div>
        <div className="flex flex-col-reverse mt-10 items-center">
          <button onClick={() => setIsModalOpen(false)} className=' hover:text-red-500  border border-gray-800  m-2 max-md:mt-10 md:mt-5 outline-none font-semibold px-4 py-2 rounded-full cursor-pointer'>Cancel</button>
          <button onClick={handleSubmit} type='submit' className='border border-gray-800 outline-none m-2 max-md:mt-10 md:mt-5  hover:bg-blue-600 hover:text-gray-900 font-bold px-4 py-2 rounded-full cursor-pointer w-1/2'> Add Question</button>

        </div>
      </Modal>


    </div>
    // </div>
  )
}

export default Header
