import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchItems, itemsSelector } from "../../store/mebelsSlice";
import MebelGrid from "../../components/MebelGrid/MebelGrid";

import "./Cart.scss";
import Card from "../../components/Card/Card";
import StyledTaskList from "../../components/Card/StyledTaskList";
import { FakeTaskData } from "./helper";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items = [], loading = false } = useAppSelector(itemsSelector);
  const { t } = useTranslation();

  const totalSum =
    Array.isArray(items) &&
    items?.reduce((acc: number, obj: any) => acc + obj.price, 0);
  // console.log(items.hasOwnProperty("items"));

  const handleDelete = () => {
    // Implement delete functionality
    console.log("Item deleted");
  };

  useEffect(() => {
    dispatch(
      fetchItems({
        pathname: `cart`,
      })
    );
  }, []);

  return (
    <div style={{ padding: "7rem 0" }}>
      {/* <ToggleableList items={[]} /> */}
      <div className="cart_container">
        {loading &&
          FakeTaskData.map((item) => <StyledTaskList key={item.id} />)}

        {Array.isArray(items) &&
          items?.map((item: any) => (
            <Card key={item.id} {...item} onDelete={handleDelete} />
          ))}
        {/* <MebelGrid mebels={items?.items} loading={loading} /> */}
      </div>

      <div className="total-sum-container">
        <h3>{t("cartPage.totalSum")}:</h3>
        <p className="total-sum">${totalSum}</p>
      </div>
      <div className="total-sum-container">
        <h3>{t("cartPage.totalItems")}:</h3>
        <p className="total-sum">{Array.isArray(items) && items?.length}</p>
      </div>
    </div>
  );
};

export default Cart;
