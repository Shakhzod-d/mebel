import React, { useState } from "react";

interface ToggleableListProps {
  items: string[];
}

const ToggleableList: React.FC<ToggleableListProps> = ({ items }) => {
  const [isRowView, setIsRowView] = useState<boolean>(true);

  const toggleView = () => {
    setIsRowView(!isRowView);
  };

  return (
    <div>
      <button onClick={toggleView}>
        Toggle View: {isRowView ? "Row" : "Column"}
      </button>
      <div style={{ display: isRowView ? "flex" : "block" }}>
        {items.map((item, index) => (
          <div key={index} style={{ margin: "8px" }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleableList;
