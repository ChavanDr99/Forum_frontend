import React from 'react'
import Logo1 from '../assets/Logo.png'


const SideImage = () => {
  return (
    <div className='mt-3 ml-2 '>
      <div className='flex flex-row   sticky top-20 '>
                <img src={Logo1} alt="logo" className=' animate-bounce h-[400px] mt-20 w-[400px]  max-md:ml-0 max-md:mt-5 max-md:py-5 ' />
                
              </div>
    </div>
    
  )
}

export default SideImage