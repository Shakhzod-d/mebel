import React from "react";
import ContentLoader from "react-content-loader";

import "./DetailsLoader.scss";

const DetailsContentLoader = (props: any) => (
  <div className="center-container">
    <ContentLoader
      className="furniture-details"
      speed={2}
      width={1000}
      height={400}
      viewBox="0 0 1000 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Furniture Image Loader */}
      <rect x="0" y="0" rx="8" ry="8" width="700" height="400" />

      {/* Details Container Loader */}
      <rect x="700" y="0" rx="8" ry="8" width="300" height="400" />

      {/* Furniture Name Loader */}
      <rect x="720" y="40" rx="8" ry="8" width="200" height="20" />

      {/* Price Loader */}
      <rect x="720" y="80" rx="8" ry="8" width="100" height="20" />

      {/* Counter Container Loader */}
      <rect x="720" y="120" rx="8" ry="8" width="180" height="30" />
      <rect x="720" y="160" rx="8" ry="8" width="40" height="30" />
      <rect x="770" y="160" rx="8" ry="8" width="20" height="30" />

      {/* Favorite Button Loader */}
      <rect x="720" y="210" rx="8" ry="8" width="150" height="40" />
    </ContentLoader>
  </div>
);

export default DetailsContentLoader;
