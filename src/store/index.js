import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./reducers/books";
import cartReducer from "./reducers/cartItems";

const rootReducer = combineReducers({
  booksReducer,
  cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
