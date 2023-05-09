import { useEffect } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { setIsOpen } from "../../store/reducers/cartItems";
import classes from "./styles.module.scss";
import { addToCart, deleteFromCart, removeFromCart } from "../../store/actions/cartItems";

const CartItems = () => {
  const { items, isItemsLoading, isItemsError } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "auto");
  }, []);

  const renderItems = (el, idx) => {
    const { title, count, total, id } = el;

    const onAddToCart = () => dispatch(addToCart(id));
    const onRemoveFromCart = () => dispatch(removeFromCart(id));
    const onDeleteFromCart = () => dispatch(deleteFromCart(id));

    return (
      <tr key={`item-${id}`}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>{total}</td>
        <td>
          <Button variant="outline-success my-1" onClick={onAddToCart}>
            <box-icon type="solid" name="plus-circle"></box-icon>
          </Button>
          <Button variant="outline-warning my-1" onClick={onRemoveFromCart}>
            <box-icon type="solid" name="minus-circle"></box-icon>
          </Button>
          <Button variant="outline-danger my-1" onClick={onDeleteFromCart}>
            <box-icon name="trash"></box-icon>
          </Button>
        </td>
      </tr>
    );
  };
  return (
    <>
      <div onClick={() => dispatch(setIsOpen(false))} className={classes.layout}></div>
      <aside className={classes.aside}>
        <h2>Your order (cart)</h2>

        {isItemsError && isItemsError}

        {isItemsLoading ? (
          <Spinner />
        ) : !isItemsError && !isItemsLoading && items.length === 0 ? (
          <div className={classes.alert}>Nothing</div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>№</th>
                <th>Item</th>
                <th>Count</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{items.map(renderItems)}</tbody>
          </Table>
        )}
      </aside>
    </>
  );
};

export default CartItems;
