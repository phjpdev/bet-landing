import React, { useState, useEffect } from "react";
import './ImageSlider.css';

const ImageSlider = () => {
  const images = [
    { src: "/image/FB3732_260825_4E_ch.jpg", alt: "韓職名家：大田市民強勢「蔚」所欲為" },
    { src: "/image/FB3736_260825_4E_ch.jpg", alt: "亞洲足球名宿：費薩里主勝有辦「法」" },
    { src: "/image/RG_All-in-one_640x274_TC.jpg", alt: "適可而止 時刻自律" },
    { src: "/image/FB3751_260825_4E_ch.jpg", alt: "東南亞錦標賽專家：信越南贏波捧盃" },
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
