import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import classes from "./styles.module.scss";
import { addToCart } from "../../store/actions/cartItems";

const BooklListItem = ({ book }) => {
  const { imgUrl, id, title, price, author } = book;
  const dispatch = useDispatch();

  const onAddBook = () => {
    dispatch(addToCart(id));
  };

  return (
    <li className={classes.list_item}>
      <div className={classes.list_item_cover}>
        <img src={imgUrl} alt="book" />
      </div>

      <div className={classes.list_item_details}>
        <h4>{title}</h4>
        <div>{author}</div>
        <div className={classes.list_item_price}>{price}$</div>
        <Button onClick={onAddBook}>Add to cart</Button>
      </div>
    </li>
  );
};

export default BooklListItem;
