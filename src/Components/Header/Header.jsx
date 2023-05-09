import { Nav } from "react-bootstrap";

import classes from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../store/reducers/cartItems";

const Header = () => {
  const { items } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const onOpenHandle = () => dispatch(setIsOpen(true));

  return (
    <Nav activeKey="/" className="justify-content-between container">
      <Nav.Item>
        <Nav.Link href="/" className={classes.logo}>
          Book-store
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="d-flex align-items-center" onClick={onOpenHandle}>
        <div className={classes.icon}>
          {<div className={classes.iconAlert}>{items.length}</div>}
          <box-icon name="cart" size="40px" color="white"></box-icon>
        </div>
      </Nav.Item>
    </Nav>
  );
};

export default Header;
