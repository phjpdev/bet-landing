import React, { useState, useEffect } from "react";
import './MobileImageSlider.css';

const MobileImageSlider = () => {
  const images = [
    { src: "/image/slider1.jpg", alt: "同場過關：沙卡勢助兵工廠雙喜臨門" },
    { src: "/image/slider2.jpg", alt: "世盃決賽組合有得玩" },
    { src: "/image/slider3.jpg", alt: "適可而止 時刻自律" },
    { src: "/image/slider4.jpg", alt: "世盃冠軍、小組首名及一二名有得玩" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="mobile-slider-container">
      {/* <div className="mobile-slider">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="mobile-slider-image"
        />
      </div> */}
      <div className="mobile-slider" >
        <img
          src={images[(currentIndex - 1 + images.length) % images.length].src}
          alt={images[(currentIndex - 1 + images.length) % images.length].alt}
          className="mobile-slider-image prev-image"
        />
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="mobile-slider-image current-image"
        />
        <img
          src={images[(currentIndex + 1) % images.length].src}
          alt={images[(currentIndex + 1) % images.length].alt}
          className="mobile-slider-image next-image"
        />
      </div>

      {/* Image Indicator */}
      <div className="mobile-slider-indicator">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator-dot ${index === currentIndex ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default MobileImageSlider;
