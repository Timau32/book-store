import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { message } from "antd";

import fetchCarts from "../../store/actions/cartItems";
import fetchBooks from "../../store/actions/books";
import BooklListItem from "./BooklListItem";
import "./styles.module.scss";

const BookList = () => {
  const { books, booksLoading, booksError } = useSelector((state) => state.booksReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCarts());
  }, []);

  useEffect(() => {
    if (booksError) {
      message.error(booksError, 7);
    }
  }, [booksError]);
  
  return (
    <ul>
      {booksLoading ? (
        <div>Loading ...</div>
      ) : (
        books?.map((book) => (
          <BooklListItem
            key={`books-item-${book.id}`}
            book={book}
            addToCart={(id) => console.log(id)}
          />
        ))
      )}
    </ul>
  );
};

export default BookList;
