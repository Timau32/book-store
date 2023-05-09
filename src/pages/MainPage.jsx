import React from "react";
import { BookList, CartItems, Header } from "../Components";

import classes from "./styles.module.scss";
import { useSelector } from "react-redux";

const MainPage = () => {
  const { isOpen } = useSelector((state) => state.cartReducer);
  return (
    <>
      <header className={classes.header}>
        <Header />
      </header>
      <main role="main" className="container">
        <BookList />
      </main>

      {isOpen ? <CartItems /> : null}
    </>
  );
};

export default MainPage;
