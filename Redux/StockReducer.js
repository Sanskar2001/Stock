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
      state.tasks = state.tasks.filter((stock) => stock.id !== action.payload);
    },
  },
});

export const { addStock, deleteStock } = stockSlice.actions;

export default stockSlice.reducer;
