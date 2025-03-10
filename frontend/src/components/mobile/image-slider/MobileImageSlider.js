import React, { useState, useEffect } from "react";
import './MobileImageSlider.css';

const MobileImageSlider = () => {
  const images = [
    "https://common.hkjc.com/bannerad/images/banner/BEC_productQ1-2025_19/4E_tc.jpg",
    "https://common.hkjc.com/bannerad/images/banner/FLM_UECMOTD-2025_09/UEC_SP4E_ch_mu.jpg",
    "https://common.hkjc.com/bannerad/images/banner/FLM_UCLExpert-2025_31/1_ucl_20250304_c.jpg",
    "https://common.hkjc.com/bannerad/images/banner/BEC_productQ1-2025_13/bannerAdImagePreview_CHI.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
          src={images[(currentIndex - 1 + images.length) % images.length]}
          alt={`Previous Slide`}
          className="mobile-slider-image prev-image"
        />
        <img
          src={images[currentIndex]}
          alt={`Current Slide`}
          className="mobile-slider-image current-image"
        />
        <img
          src={images[(currentIndex + 1) % images.length]}
          alt={`Next Slide`}
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
