import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartActions } from '../../store/cartSlice';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, quantity, total, price } = props.item;
  const decreaseQuantityHandler=(id)=>{
    dispatch(cartActions.removeFromCart(id));
  };
  const increaseQuantityHandler=(id)=>{
    dispatch(cartActions.increaseCart(id));
  };
  return (
    <li className={classes.item} key={id}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={()=>decreaseQuantityHandler(id)}>-</button>
          <button onClick={()=>increaseQuantityHandler(id)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
