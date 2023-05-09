import axios from "axios";

const endpoint = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getBooks = (signal) => endpoint.get("/books", { signal });
const postBooks = (payload, signal) => endpoint.post("/books", payload, { signal });
const getCartItems = (signal) => endpoint.get("/cartItems", { signal });

const postCartItems = (payload, signal) => {
  return endpoint.post("/cartItems", payload, {
    signal,
  });
};

const deleteCartitem = (id, signal) => {
  return endpoint.delete(`/cartItems/${id}`, {
    signal,
  });
};

const putCartItem = (id, payload, signal) => {
  return endpoint.put(`/cartItems/${id}`, payload, { signal });
};

const api = {
  getBooks,
  postBooks,
  getCartItems,
  postCartItems,
  deleteCartitem,
  putCartItem,
};

export default api;
