// components/MebelGrid.tsx
import React from "react";
import MebelCard, { IMebel } from "../MebelCard/MebelCard";
// import MebelCard from "./MebelCard";
import "./MebelGrid.scss";
import DevtoCard from "../ContentLoader/ContentLoader";

interface MebelGridProps {
  mebels: IMebel[]; // Assuming you have an array of Mebel items
  loading: boolean;
}

const MebelGrid: React.FC<MebelGridProps> = ({ mebels, loading }) => (
  <div className="mebel-grid">
    {!loading &&
      mebels.map((mebel) => <MebelCard key={mebel.id} mebel={mebel} />)}

    {loading &&
      new Array(8)
        .fill(0)
        .map((_, index) => index + 1)
        .map((item) => {
          return <DevtoCard key={item} />;
        })}
  </div>
);

export default MebelGrid;
