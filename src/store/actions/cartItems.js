import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { setCartItems } from "../reducers/cartItems";

const updateItem = async (items, item, idx, signal) => {
  if (item.count === 0) {
    api.deleteCartitem(item.id, signal);
    const newItems = items.filter((el) => el.id !== item.id);
    return newItems;
  }

  if (idx > -1) {
    const response = await api.putCartItem(item.id, item, signal);
    const before = items.slice(0, idx);
    const after = items.slice(idx + 1);
    const newitems = [...before, response.data, ...after];

    return newitems;
  }

  const response = await api.postCartItems(item, signal);
  const newItems = [...items, response.data];
  return newItems;
};

const createItem = (book, item = {}, quantity) => {
  const { count = 0, total = 0, id = book.id, title = book.title } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + book.price * quantity,
  };
};

const updateOrder = async (payload, thunkApi, quantity) => {
  const { items } = thunkApi.getState().cartReducer;
  const { books } = thunkApi.getState().booksReducer;
  const book = books.find((el) => el.id === payload);
  const itemIdx = items.findIndex((el) => el.id === payload);
  const item = items[itemIdx];

  const newItem = createItem(book, item, quantity);
  const newItems = await updateItem(items, newItem, itemIdx, thunkApi.signal);
  return newItems;
};

const fetchCarts = createAsyncThunk("cart/fetchAll", async (payload, thunkApi) => {
  try {
    const response = await api.getCartItems(thunkApi.signal);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

const addToCart = createAsyncThunk("cart/addToCart", async (payload, thunkApi) => {
  const newItems = await updateOrder(payload, thunkApi, 1);
  return thunkApi.dispatch(setCartItems(newItems));
});

const removeFromCart = createAsyncThunk("cart/removeFromCart", async (payload, thunkApi) => {
  const newItems = await updateOrder(payload, thunkApi, -1);
  return thunkApi.dispatch(setCartItems(newItems));
});

const deleteFromCart = createAsyncThunk("cart/deleteFromCart", async (payload, thunkApi) => {
  const { items } = thunkApi.getState().cartReducer;
  api.deleteCartitem(payload, thunkApi.signal);
  const newItems = items.filter((el) => el.id !== payload);
  return thunkApi.dispatch(setCartItems(newItems));
});

export default fetchCarts;
export { addToCart, removeFromCart, deleteFromCart };
