import React, { useState, useEffect } from "react";
import './MobileImageSlider.css';

const MobileImageSlider = () => {
  const images = [
    { src: "/image/FB3732_260825_4E_ch.jpg", alt: "韓職名家：大田市民強勢「蔚」所欲為" },
    { src: "/image/FB3736_260825_4E_ch.jpg", alt: "亞洲足球名宿：費薩里主勝有辦「法」" },
    { src: "/image/RG_All-in-one_640x274_TC.jpg", alt: "適可而止 時刻自律" },
    { src: "/image/FB3751_260825_4E_ch.jpg", alt: "東南亞錦標賽專家：信越南贏波捧盃" },
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
