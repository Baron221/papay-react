import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";
import PausedOrders from "../../components/orders/pausedOrders";
import Marginer from "../../components/marginer";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import "../../../css/order.css";

//Redux

import { Restaurant } from "../../types/user";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  setPausedOrders,
  setProcessOrders,
  setFinishedOrders,
} from "../../screens/OrdersPage/slice";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { ProductSearchObject, SearchObj } from "../../types/others";
import { serviceApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";
import ProductApiService from "../../apiServices/productApiService";
import { Product } from "../../types/product";
import { Order } from "../../types/order";

/** Redux Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export function OrdersPage() {
  /**INITIALIZATIONS */
  const { setPausedOrders , setProcessOrders ,setFinishedOrders} = actionDispatch(useDispatch());
  const [value, setValue] = useState("1");


  useEffect(()=>{},[]);

  const handleChange = (event: any, newValue: string) => {
    console.log("newValue" , newValue)
    setValue(newValue);
  };
  return (
    <div className="order_page">
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Stack className="order_left">
          <TabContext value={value}>
            <Box className="order_nav_frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  value={value}
                  aria-label="basic tabs example"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#0055FF",
                  }}
                >
                  <Tab label="Buyurtmalarim" value={"1"} />
                  <Tab label="Jarayon" value={"2"} />
                  <Tab label="Yakunlangan" value={"3"} />
                </TabList>
              </Box>
            </Box>
            <Stack className="order_main_content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order_right">
          <Stack className="order_info_box">
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className="order_user_img">
                <img
                  src="./restaurant/brooke.svg"
                  className="order_user_avatar"
                  alt=""
                />
                <Box className="order_user_icon_box">
                  <img
                    src="/restaurant/brooke.svg"
                    className="order_user_prof_img"
                    alt=""
                  />
                </Box>
              </Box>
              <span className="order_user_name">Baron</span>
              <span className="order_user_prof">User</span>
              <Box
                sx={{ width: "250%", marginTop: "40px", marginBottom: "8px" }}
              >
                <Marginer
                  direction="horizontal"
                  height="3"
                  width="200%"
                  bg="grey"
                />
              </Box>

              <Stack className="order_user_address">
                <Box sx={{ display: "flex" }}>
                  <LocationOnRoundedIcon />
                </Box>
                <Box className="spec_address_text">Busan,Korea</Box>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="order_info_box">
            <input
              className="card_input"
              type="text"
              name="card_number"
              placeholder="Card number: 1234 7456 5678 9012"
            />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <input
                type="text"
                name="card_period"
                placeholder="07 / 24"
                className="card_half_input"
              />
              <input
                type="text"
                name="card_cvv"
                placeholder="CVV : 013"
                className="card_half_input"
              />
            </Stack>
            <input
              type="text"
              name="card_creator"
              placeholder="Bakhromjon"
              className="card_input"
            />
            <Stack className="card_box">
              <img src="/icons/western-union.svg" alt="1" />
              <img src="http://papays.uz/icons/master_card.svg" alt="2" />
              <img src="/icons/paypal_card.svg" alt="3" />
              <img src="/icons/visa_card.svg" alt="4" />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
