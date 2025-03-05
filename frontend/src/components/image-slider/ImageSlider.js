import React, { useState, useEffect } from "react";
import './ImageSlider.css';

const ImageSlider = () => {
  const images = [
    "https://common.hkjc.com/bannerad/images/banner/BEC_productQ1-2025_19/4E_tc.jpg",
    "https://common.hkjc.com/bannerad/images/banner/FLM_UECMOTD-2025_09/UEC_SP4E_ch_mu.jpg",
    "https://common.hkjc.com/bannerad/images/banner/FLM_UCLExpert-2025_31/1_ucl_20250304_c.jpg",
    "https://common.hkjc.com/bannerad/images/banner/BEC_productQ1-2025_13/bannerAdImagePreview_CHI.jpg",
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
      goToNext();
    }, 10000); // Change image every 10 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component is unmounted
    };
  }, []);

  return (
    <div className="slider-container">
      <div className="slider">
        <img
          src={images[(currentIndex - 1 + images.length) % images.length]}
          alt={`Previous Slide`}
          className="slider-image prev-image"
        />
        <img
          src={images[currentIndex]}
          alt={`Current Slide`}
          className="slider-image current-image"
        />
        <img
          src={images[(currentIndex + 1) % images.length]}
          alt={`Next Slide`}
          className="slider-image next-image"
        />
        <button className="prev-btn" onClick={goToPrevious}>
          <img src='/image/arrow-left.svg' alt='set-icon' width={26}></img>
        </button>
        <button className="next-btn" onClick={goToNext}>
          <img src='/image/arrow-right.svg' alt='set-icon' width={26}></img>
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
