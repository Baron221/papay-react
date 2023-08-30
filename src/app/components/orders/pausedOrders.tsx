import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@material-ui/lab/TabPanel";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePausedOrders } from "../../screens/OrdersPage/selector";
import { useSelector } from "react-redux";
import { Order } from "../../types/order";
import { serviceApi } from "../../../lib/config";
import { Product } from "../../types/product";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberData } from "../../apiServices/verify";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

export default function PausedOrders(props: any) {
  /** INITIALIZATIONS */
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /** HANDLERS */
  const deleteOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };

      if (!verifiedMemberData) {
        sweetFailureProvider(`Please Login First`, true);
      }

      let confirmation = window.confirm(
        "Buyurtmani bekor qilishni xohlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);

        props.setOrderRebuild(new Date());
      }
    } catch (error) {
      console.log(`deleteOrderHandler, ERROR:`, error);
      sweetErrorHandling(error).then();
    }
  };

  const processOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };

      if (!verifiedMemberData) {
        sweetFailureProvider(`Please Login First`, true);
      }

      let confirmation = window.confirm(
        "Buyurtmangiz uchun tulov amalga oshirishni tasdiqlaysizmi?"
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
    <TabPanel value="1">
      <Stack>
        {pausedOrders?.map((order: Order) => {
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
              <Box className="total_price_box black_solid">
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

                  <Button
                    onClick={deleteOrderHandler}
                    value={order._id}
                    variant="contained"
                    sx={{ mx: "25px" }}
                    style={{ borderRadius: "10px" }}
                    color="primary"
                  >
                    Bekor Qilish
                  </Button>
                  <Button
                    onClick={processOrderHandler}
                    value={order._id}
                    variant="contained"
                    style={{ borderRadius: "10px" }}
                    color="secondary"
                  >
                    To'lash
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
