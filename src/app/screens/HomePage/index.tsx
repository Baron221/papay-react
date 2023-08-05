import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Statistics } from "./statistics";
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";
import { BestDishes } from "./bestDishes";
import { Advertisements } from "./adverstisement";
import { Events } from "./events";
import { Recommendations } from "./recommendations";
import "../../../css/home.css";

// Redux;
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { setTopRestaurants } from "../../screens/HomePage/slice";
import { retrieveTopRestaurants } from "../../screens/HomePage/selector";
import { Restaurant } from "../../types/user";


/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data))
});
/** Redux Selector */
const topRestaurantRetriever = createSelector(
  retrieveTopRestaurants,
  (topRestaurants) => ({
      topRestaurants
  })
);

export function HomePage() {

   /** Initializations */
   const { setTopRestaurants } = actionDispatch(useDispatch());
   const { topRestaurants } = useSelector(topRestaurantRetriever)



  useEffect(() => {
    //backend data request
 
        setTopRestaurants([]);
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <TopRestaurants />
      <BestRestaurants />
      <BestDishes />
      <Advertisements />
      <Events />
      <Recommendations />
    </div>
  );
}
