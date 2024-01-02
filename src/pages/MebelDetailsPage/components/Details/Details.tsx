import React, { useEffect, useState } from "react";
import {
  Item,
  deleteItem,
  postMebelToFavorite,
} from "../../../../store/mebelsSlice";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import "./Details.scss";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { useAppDispatch } from "../../../../store/store";

interface IDetailsProps {
  mebelDetails: Item;
}

const Details = ({ mebelDetails }: IDetailsProps) => {
  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(mebelDetails.isLiked || false);
  const [price, setPrice] = useState(mebelDetails?.price);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    setCount(count + 1);
    setPrice(price + 100);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setPrice(price - 100);
    }
  };

  const addItemFavoriteList = () => {
    const obj = {
      setIsAddFavorite: () => setIsFavorite(true),
      ...mebelDetails,
    };

    dispatch(postMebelToFavorite(obj));

    const deleteObj = {
      id: mebelDetails.id,
      setIsAddFavorite: () => setIsFavorite(false),
    };

    // console.log(isFavorite);
    // if (isFavorite) {
    // delete item if something is already there
    //   dispatch(deleteItem(deleteObj));
    // } else {
    // }
  };

  return (
    <div className="center-container">
      <div className="furniture-details">
        <img
          src={mebelDetails.imageUrl}
          alt="Furniture"
          className="furniture-image"
        />
        <div className="details">
          <h2>{mebelDetails.name}</h2>
          <p>Price: ${price}</p>
          <div className="counter">
            <button
              onClick={handleDecrement}
              disabled={count === 1}
              className="counter-button"
            >
              -
            </button>
            <span>{count}</span>
            <button onClick={handleIncrement} className="counter-button">
              +
            </button>
          </div>
          <br />
          {/* className={isFavorite ? "favorite-btn active" : "favorite-btn"} */}
          <AiFillHeart
            onClick={addItemFavoriteList}
            size={22}
            color={isFavorite ? "red" : ""}
            className={isFavorite ? "favorite-btn active" : "favorite-btn"}
          />

          <AddToCartButton currentItem={mebelDetails} />
        </div>
      </div>
    </div>
  );
};

export default Details;
