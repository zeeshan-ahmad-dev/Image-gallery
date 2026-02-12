import { useEffect, useState } from "react";
import assets from "./assets/assets.js";
import "./App.css";

function App() {
  const [currIndex, setcurrIndex] = useState(0);
  const imgs = assets;

  useEffect(() => {
    const slider = document.querySelector(".slider");
    slider.style.left = -currIndex * 1366 + "px";
  }, [currIndex]);

  useEffect(() => {
    const dots = document.querySelectorAll(".dot");
    dots[0].classList.add("w-5");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  function next() {
    const imgs = document.querySelectorAll(".item");
    setcurrIndex((prevIndex) => {
      let newIndex = (prevIndex + 1) % imgs.length;
      slide(newIndex < 0 ? -newIndex : newIndex);
      return newIndex;
    });
  }

  function prev() {
    const imgs = document.querySelectorAll(".item");
    setcurrIndex((prevIndex) => {
      let newIndex = (prevIndex - 1) % imgs.length;
      slide(newIndex < 0 ? (newIndex = assets.length - 1) : newIndex);
      return newIndex < 0 ? -newIndex : newIndex;
    });
  }

  // clicking on dots
  const handleDotClick = (index) => {
    setcurrIndex(index);
    slide(index);
  };

  function slide(newIndex) {
    const slider = document.querySelector(".slider");
    const dots = document.querySelectorAll(".dot");

    slider.style.left = -newIndex * 100 + "vw";

    const lastActive = document.querySelector("ul li.w-5");
    lastActive.classList.remove("w-5");
    dots[newIndex].classList.add("w-5");
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute flex overflow-hidden transition-all slider w-max list ">
        {imgs.map((val, index) => (
          <div key={index} className="item">
            <img
              className="w-screen h-screen transition-all"
              src={val}
              alt=""
            />
          </div>
        ))}
      </div>

      <div className="buttons absolute top-[45%] left-[5%] w-[90%] flex justify-between">
        <button
          id="prev"
          onClick={prev}
          className="py-4 px-6 bg-[#f7f7f742] hover:bg-[#f7f7f770] transition-colors rounded-full"
        >
          <i className="text-lg text-white fa-solid fa-angle-left"></i>
        </button>
        <button
          id="next"
          onClick={next}
          className="py-4 px-6 bg-[#f7f7f742] hover:bg-[#f7f7f770] transition-colors rounded-full"
        >
          <i className="text-lg text-white fa-solid fa-angle-right"></i>
        </button>
      </div>
      <ul className="absolute flex justify-center w-screen gap-6 bottom-8">
        {[...Array(imgs.length)].map((_, index) => (
          <li
            key={index}
            className={`dot w-2 h-2 rounded-full bg-white cursor-pointer ${currIndex === index ? "w-5" : ""}`} // Adds a larger width for the active dot
            onClick={() => handleDotClick(index)} // Captures the index when clicked
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
