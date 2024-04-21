import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addedStocks: [],
};

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    addStock: (state, action) => {
      // console.log(("payload", state));

      state.addedStocks.push({
        id: Date.now(),
        name: action.payload.name,
        price: parseFloat(action.payload.price),
        change: parseFloat(action.payload.change),
      });
    },
    deleteStock: (state, action) => {
      console.log("deleting");
      state.addedStocks = state.addedStocks.filter(
        (stock) => stock.id !== action.payload
      );

      console.log(state);
    },
  },
});

export const { addStock, deleteStock } = stockSlice.actions;

export default stockSlice.reducer;
