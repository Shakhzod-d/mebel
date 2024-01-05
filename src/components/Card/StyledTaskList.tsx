import React from "react";
import ContentLoader from "react-content-loader";

const StyledTaskList = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={600}
      height={250} // Adjust the height based on your design
      viewBox="0 0 600 250"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      {/* Card container */}
      <rect x="15" y="15" rx="10" ry="10" width="570" height="220" />

      {/* Image placeholder */}
      <rect x="30" y="30" rx="8" ry="8" width="150" height="150" />

      {/* Title placeholder */}
      <rect x="200" y="40" rx="4" ry="4" width="300" height="20" />

      {/* Price placeholder */}
      <rect x="200" y="80" rx="4" ry="4" width="100" height="15" />

      {/* Delete icon placeholder */}
      <rect x="530" y="30" rx="4" ry="4" width="30" height="30" />
    </ContentLoader>
  );
};

StyledTaskList.metadata = {
  name: "Your Name",
  github: "your-github-username",
  description: "Loading a styled task list with a beautiful card layout.",
  filename: "StyledTaskList",
};

export default StyledTaskList;
