import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";

import { createSelector } from "@reduxjs/toolkit";
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";
import { useSelector } from "react-redux";
import { serviceApi } from "../../../lib/config";
import { Product } from "../../types/product";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { Order } from "../../types/order";

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

export default function ProcessOrders(props: any) {
  /** INITIALIZATIONS */
  const { processOrders } = useSelector(processOrdersRetriever);

  /** HANDLERS */
  const finishOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "FINISHED" };

      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider(`Please Login First`, true);
      }

      let confirmation = window.confirm(
        "Buyurtmani qabul qilganingizni tasdiqlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);

        props.setOrderRebuild(new Date());
      }
    } catch (error) {
      console.log(`processOrderHandler, ERROR:`, error);
      sweetErrorHandling(error).then();
    }
  };
  return (
    <TabPanel value="2">
      <Stack>
        {processOrders.map((order:Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serviceApi}/${product.product_images[0]}`;
                  return (
                    <Box className="ordersName_price">
                      <img className="orderDishImg" src={image_path} alt="" />
                      <p className="titleDish">{product.product_name}</p>
                      <Box className="priceBox">
                        <p>${item.item_price}</p>
                        <img src="/icons/Close.svg" alt="" />
                        <p>{item.item_quantity}</p>
                        <img src="/icons/Pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.item_price * item.item_quantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total_price_box blue_solid">
                <Box className="boxTotal">
                  <p>mahuslot narxi </p>
                  <p>${order.order_total_amount - order.order_delivery_cost}</p>
                  <img
                    src="/icons/Plus.svg"
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>yetkazish xizmati </p>
                  <p>${order.order_delivery_cost}</p>
                  <img
                    src="/icons/Pause.svg"
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>jami narx</p>
                  <p>${order.order_total_amount}</p>
                  <p style={{ fontWeight: "500", fontSize: "16px" }}>
                    {moment(order.createdAt).format("YY-MM-DD HH:mm")}
                  </p>
                  <Button
                    onClick={finishOrderHandler}
                    value={order._id}
                    sx={{
                      borderRadius: "10px",
                      background: "#0288d1",
                      ml: "40px",
                    }}
                    variant="contained"
                  >
                    Yakunlash
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
