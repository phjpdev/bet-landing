import React, { useState, useEffect } from "react";
import './ImageSlider.css';

const ImageSlider = () => {
  const images = [
    { src: "/image/slider1.jpg", alt: "同場過關：沙卡勢助兵工廠雙喜臨門" },
    { src: "/image/slider2.jpg", alt: "世盃決賽組合有得玩" },
    { src: "/image/slider3.jpg", alt: "適可而止 時刻自律" },
    { src: "/image/slider4.jpg", alt: "世盃冠軍、小組首名及一二名有得玩" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      <div className="slider" >
        <img
          src={images[(currentIndex - 1 + images.length) % images.length].src}
          alt={images[(currentIndex - 1 + images.length) % images.length].alt}
          className="slider-image prev-image"
        />
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="slider-image current-image"
        />
        <img
          src={images[(currentIndex + 1) % images.length].src}
          alt={images[(currentIndex + 1) % images.length].alt}
          className="slider-image next-image"
        />
        
      </div>
      <button className="prev-btn" onClick={goToPrevious}>
        <img src='/image/arrow-left.svg' alt='set-icon' width={26}></img>
      </button>
      <button className="next-btn" onClick={goToNext}>
        <img src='/image/arrow-right.svg' alt='set-icon' width={26}></img>
      </button>
    </div>
  );
};

export default ImageSlider;
