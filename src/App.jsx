import { useEffect, useRef, useState } from 'react'
import one from './assets/1.jpg'
import two from './assets/2.jpg'
import three from './assets/3.jpg'
import four from './assets/4.jpg'
import five from './assets/5.jpg'
import './App.css'

const imgs = ['one','two','three','four','five']

function App() {
  const [currIndex, setcurrIndex] = useState(0)

  useEffect(() => {
    const slider = document.querySelector('.slider');
    slider.style.left = -currIndex*1366 + "px";
  },[])

  useEffect(() => {
    const dots = document.querySelectorAll('.dot')
    dots[0].classList.add('w-5')
  },[])

  
  function next() {
    setcurrIndex((prevIndex) => {
      let newIndex = (prevIndex + 1) % 5;
      console.log(newIndex)
      slide(newIndex < 0 ? -newIndex : newIndex);
      return newIndex;
    })
  }
  
  function prev() {
    setcurrIndex((prevIndex) => {
      let newIndex = (prevIndex - 1) % 5;
      console.log(-newIndex)
      slide(newIndex < 0 ? newIndex = 4 : newIndex)
      return newIndex < 0 ? -newIndex : newIndex;
    })
  }

  // clicking on dots
  const handleDotClick = (index) => {
    setcurrIndex(index);
    slide(index)
  }

  function slide(newIndex) {
    const slider = document.querySelector('.slider')
    const dots = document.querySelectorAll('.dot');

    slider.style.left = -newIndex * 1366  + 'px';
    
    const lastActive = document.querySelector('ul li.w-5');
    lastActive.classList.remove('w-5')
    dots[newIndex].classList.add('w-5');
  }

  return (
    <div className='relative h-screen overflow-hidden'>
      <div className="slider transition-all absolute w-max list overflow-hidden flex ">
        <div className="item">
          <img className='h-screen transition-all w-screen' src={one} alt="" />
        </div>
        <div className="item">
          <img className='h-screen transition-all w-screen' src={two} alt="" />
        </div>
        <div className="item">
          <img className='h-screen transition-all w-screen' src={three} alt="" />
        </div>
        <div className="item">
          <img className='h-screen transition-all w-screen' src={four} alt="" />
        </div>
        <div className="item">
          <img className='h-screen transition-all w-screen' src={five} alt="" />
        </div>
      </div>

      <div className="buttons absolute top-[45%] left-[5%] w-[90%] flex justify-between">
        <button id="prev" onClick={prev} className='py-4 px-6 bg-[#f7f7f742] hover:bg-[#f7f7f770] transition-colors rounded-full'><i className="fa-solid fa-angle-left text-white text-lg"></i></button>
        <button id="next" onClick={next} className='py-4 px-6 bg-[#f7f7f742] hover:bg-[#f7f7f770] transition-colors rounded-full'><i className="fa-solid fa-angle-right text-white text-lg"></i></button>
      </div>
      <ul className='absolute bottom-8 flex justify-center w-screen gap-6'>
      {[...Array(5)].map((_, index) => (
          <li
            key={index}
            className={`dot w-2 h-2 rounded-full bg-white cursor-pointer ${currIndex === index ? 'w-5' : ''}`} // Adds a larger width for the active dot
            onClick={() => handleDotClick(index)} // Captures the index when clicked
          ></li>
        ))}
      </ul>
    </div>
  )
}

export default App
