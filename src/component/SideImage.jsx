import {React,useEffect} from 'react'
import Logo1 from '../assets/Logo.png'
import lottie from 'lottie-web';
import animationData from './lottie/lottie.json'

const SideImage = () => {
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: document.getElementById('lottie-container'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData, // Your animation data
    });
    return () => anim.destroy(); // Clean up animation on component unmount
  }, []);

  return (
    <div className='mt-2 ml-2 '>
      <div className='flex flex-row  md:mt-10 sticky top-20 '>
      <div className='md:mt-10' id="lottie-container" />
               {/* <img src={Logo1} alt="logo" className=' animate-bounce h-[300px] md:h-[400px] mt-20 md:w-[400px]  max-md:ml-0 max-md:mt-5 max-md:py-5 ' /> */}
              </div>
    </div>
    
  )
}

export default SideImage