import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchMebelById, itemsSelector } from "../../store/mebelsSlice";

import "./MebelDetails.scss";
import Details from "./components/Details/Details";
import DetailsContentLoader from "./components/ContentLoader/ContentLoader";
import Notification from "../../components/Notification/Notification";

const MebelDetails = () => {
  const { mebelDetails, loading, ok, message } = useAppSelector(itemsSelector);

  const { id = "1" } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMebelById(id));
  }, []);

  return (
    <div className="content">
      {ok && (
        <Notification message={message} type={"success"} onClose={() => {}} />
      )}

      {loading && <DetailsContentLoader />}
      {!loading && <Details mebelDetails={mebelDetails} />}
    </div>
  );
};

export default MebelDetails;
