import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import "./AddToCartButton.scss";
import { Item, postMebelToCart } from "../../../../store/mebelsSlice";
import { useAppDispatch } from "../../../../store/store";

interface IAddToCartButton {
  currentItem: Item;
}

const AddToCartButton = ({ currentItem }: IAddToCartButton) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const newCurrentItem = {
      handleStopLoading: () => setIsLoading(false),
      ...currentItem,
    };

    setIsLoading(true);
    dispatch(postMebelToCart(newCurrentItem));
  };

  return (
    <button
      onClick={handleClick}
      className={`cart-button ${isLoading ? "loading" : ""}`}
    >
      {isLoading ? (
        <AiOutlineLoading className="spinner-icon" />
      ) : (
        <>
          <FaShoppingCart className="cart-icon" />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
