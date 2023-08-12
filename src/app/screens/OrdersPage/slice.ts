import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../types/screen";

const initialState: OrdersPageState = {
  pausedOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const OrdersPageSlice = createSlice({
  name: "orderPage",
  initialState,
  reducers: {
    setPausedOrders: (state, action) => {
      state.pausedOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.pausedOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.pausedOrders = action.payload;
    },
  },
});

export const { setPausedOrders, setProcessOrders, setFinishedOrders } =
  OrdersPageSlice.actions;

  const OrdersPageReducer = OrdersPageSlice.reducer;

  export default OrdersPageReducer;