// Card.tsx
import React from "react";
import "./Card.scss"; // Import the SCSS file for styles

import { FaTrash } from "react-icons/fa";

interface CardProps {
  imageUrl: string;
  title: string;
  info: string;
  price: number;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  info,
  price,
  onDelete,
}) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={imageUrl} alt="Product Image" className="card-image" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-info">{info}</p>
        <p className="card-price">${price.toFixed(2)}</p>
      </div>
      <button className="delete-button" onClick={onDelete}>
        <FaTrash className="delete-icon" />
      </button>
    </div>
  );
};

export default Card;
