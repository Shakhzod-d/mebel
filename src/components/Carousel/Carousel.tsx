import React, { useState, useEffect } from "react";
import { Slide } from "../../pages/HomePage/Home";

interface CarouselItem {
  id: number;
  imageUrl: string;
  // Add other properties if needed
}

interface CarouselProps<T> {
  items: T[];
  interval?: number;
}

const ReusableCarousel = <T extends CarouselItem>({
  items,
  interval = 5000,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [items.length, interval]);

  return (
    <div className="carousel-container">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`carousel-item ${index === currentIndex ? "active" : ""}`}
        >
          <div
            style={{
              backgroundImage: `url(${item?.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff", // Text color on top of the image
            }}
          >
            {/* You can add additional content or styling on top of the image */}
            <h2>{`Slide ${index + 1}`}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReusableCarousel;
