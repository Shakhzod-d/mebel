import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchItems, itemsSelector } from "../../store/mebelsSlice";
import MebelGrid from "../../components/MebelGrid/MebelGrid";

import "./Favorites.scss";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const { items = [], loading = false } = useAppSelector(itemsSelector);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  return (
    <div>
      <div className="container">
        <MebelGrid mebels={items} loading={loading} />
      </div>
    </div>
  );
};

export default Favorites;