import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./StockReducer";

const store = configureStore({
  reducer: {
    stocks: stockReducer,
  },
});

export default store;
