// CustomCard.tsx
import React from "react";
import "./MebelCard.scss";
import { Link } from "react-router-dom";

export interface IMebel {
  id: number;
  imageUrl: string;
  title: string;
  info: string;
  price: number;
}

interface CustomCardProps {
  mebel: IMebel; // Assuming you have a Mebel interface
}

const CustomCard: React.FC<CustomCardProps> = ({ mebel }) => (
  <Link to={`/mebel-details/${mebel.id}`} className="custom-card">
    <img src={mebel.imageUrl} alt={mebel.title} className="card-image" />
    <div className="card-content">
      <h3 className="card-title">{mebel.title}</h3>
      <h3 className="card-info">${mebel.price}</h3>
      <p className="card-info">{mebel.info}</p>
    </div>
  </Link>
);

export default CustomCard;
