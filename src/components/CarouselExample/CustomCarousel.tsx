import React, { useState } from "react";
import "./CustomCarousel.scss";
import { ICustomCarouselProps } from "./types";

import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CustomCarousel = ({ slides = [] }: ICustomCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderBulletPoints = () => {
    return slides.map((_, index) => (
      <span
        key={index}
        className={`bullet ${index === currentIndex ? "active" : ""}`}
        onClick={() => goToSlide(index)}
      />
    ));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="custom-carousel-container">
      <h2>{t("body.theBestMebelInTheWorldWatchAndOrderYourFirstFurniture")}</h2>
      <div className="carousel-outer-wrapper">
        <FaChevronCircleLeft
          className="carousel-button prev"
          size={25}
          onClick={goToPrevSlide}
        />

        <div className="carousel-inner-wrapper">
          <div className="carousel-content">
            <img src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
          </div>
          <div className="bullet-container">{renderBulletPoints()}</div>
        </div>
        <FaChevronCircleRight
          className="carousel-button next"
          size={25}
          onClick={goToNextSlide}
        />
      </div>
    </div>
  );
};

export default CustomCarousel;
