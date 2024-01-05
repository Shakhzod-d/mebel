import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchItems, itemsSelector } from "../../store/mebelsSlice";
import MebelGrid from "../../components/MebelGrid/MebelGrid";

import "./Favorites.scss";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const { items = { items: [], meta: {} }, loading = false } =
    useAppSelector(itemsSelector);
  console.log(`items`, items);

  useEffect(() => {
    dispatch(
      fetchItems({
        pathname: `favorite`,
      })
    );
  }, []);

  return (
    <div>
      <div className="container">
        {Array.isArray(items) && items?.length === 0 && "No favorite items yet"}
        {Array.isArray(items) && <MebelGrid mebels={items} loading={loading} />}
      </div>
    </div>
  );
};

export default Favorites;
