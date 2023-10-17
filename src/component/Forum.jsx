import React from 'react'
import Header from './Header'
import Feed from './Feed'
import SideImage from './SideImage'
const Forum = () => {
  return (
    <div className="w-[100%]">
      <Header/>
     
      <div className="flex flex-row justify-between px-10 mt-1 max-md:flex-col w-[100%] pb-5 ">
      <SideImage/>
      <Feed/>
    </div>
   </div>

  )
}

export default Forum
