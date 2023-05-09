import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api";

const fetchBooks = createAsyncThunk("books/fetchAll", async (payload, thunkApi) => {
  try {
    const response = await api.getBooks(thunkApi.signal);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

// import { setBooks, setBooksError, setBooksLaoding } from "../reducers/books";

// const fetchBooks = () => async (dispatch) => {
//   const controller = new AbortController();
//   try {
//     dispatch(setBooksLaoding());
//     const response = await api.getBooks(controller.signal);
//     dispatch(setBooks(response.data));
//   } catch (err) {
//     controller.abort();
//     dispatch(setBooksError(err.message));
//   }
// };

export default fetchBooks;
