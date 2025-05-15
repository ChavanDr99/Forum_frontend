import React from 'react'
import Header from './Header'
import Feed from './Feed'
import SideImage from './SideImage'
const Forum = () => {
  return (
    <div className="w-[100%] bg-gradient-to-tr from-[#1e2a36] via-[#1a252f] to-[#1f3d55] text-gray-300">
      <Header/>
     
      <div className="flex flex-row justify-between px-10 mt-1 max-md:flex-col w-[100%] pb-5 ">
      <SideImage/>
      <Feed/>
    </div>
   </div>

  )
}

export default Forum
