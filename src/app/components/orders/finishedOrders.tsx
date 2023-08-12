import {Box,Stack} from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from '@mui/lab/TabPanel';
import moment from "moment";


//Redux
import {
    retrieveFinishedOrders,

  } from "../../screens/OrdersPage/selector";
  import { useDispatch, useSelector } from "react-redux";
  import { Dispatch } from "@reduxjs/toolkit";
  import { createSelector } from "reselect";
  import {
     setChosenRestaurant,
    setRandomRestaurants,
    setTargetProducts,
  } from "../../screens/RestaurantPage/slice";
  
  import { serviceApi } from "../../../lib/config";
  import assert from "assert";
  import { Definer } from "../../../lib/Definer";
  import {
    sweetErrorHandling,
    sweetTopSmallSuccessAlert,
  } from "../../../lib/sweetAlert";
  import { useHistory } from "react-router-dom";


  
  /** Redux Selector */
  const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({
        finishedOrders,
    })
  );


const finishedOrders = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
]

export default function FinishedOrders(props:any){

      /**INITIALIZATIONS */
    // const { finishedOrders } = useSelector(finishedOrdersRetriever);
    return (
        <TabPanel value="3">
            <Stack>
                {finishedOrders?.map((order) => {
                    return (
                        <Box className="order_main_box">
                            <Box className="order_box_scroll">
                                {order.map((item) => {
                                    const img_path = `others/stake.jpg`
                                    return (
                                        <Box className="ordersName_price">
                                            <img className="orderDishImg" src={img_path} alt="" />
                                            <p className="titleDish">Stake</p>
                                            <Box className="priceBox">
                                                <p>$7</p>
                                                <img src="/icons/Close.svg" alt="" />
                                                <p>3</p>
                                                <img src="/icons/Pause.svg" alt="" />
                                                <p style={{ marginLeft: "15px" }}>$21</p>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                            <Box className="total_price_box red_solid">
                                <Box className="boxTotal">
                                    <p>mahuslot narxi </p>
                                    <p>$21</p>
                                    <img src="/icons/Plus.svg" style={{ marginLeft: "20px" }} alt="" />
                                    <p>yetkazish xizmati </p>
                                    <p>$2</p>
                                    <img src="/icons/Pause.svg" style={{ marginLeft: "20px" }} alt="" />
                                    <p>Jami narx</p>
                                    <p>$23</p>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Stack>
        </TabPanel>
    )
}