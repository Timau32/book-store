import { createSlice } from "@reduxjs/toolkit";
import fetchCarts, { addToCart } from "../actions/cartItems";

const initialState = {
  items: [],
  isItemsLoading: false,
  isItemsError: "",
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },

    setCartItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.pending, (state) => {
      state.isItemsError = "";
      state.isItemsLoading = true;
    });

    builder.addCase(fetchCarts.rejected, (state, action) => {
      state.isItemsError = action.payload;
      state.isItemsLoading = false;
      state.items = [];
    });

    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.isItemsError = "";
      state.isItemsLoading = false;
      state.items = action.payload;
    });
  },
});

const cartReducer = cartSlice.reducer;

export const { setIsOpen, setCartItems } = cartSlice.actions;
export default cartReducer;
