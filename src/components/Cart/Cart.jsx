import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItem);
  let totalAmount=0;
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems && cartItems.map((item) => { {totalAmount = totalAmount+item.total}
          return <CartItem key={item.id} item={item} />
        })}
      </ul>
      <div className={classes.total}>
        <h2>Total:</h2>
        <h2>${totalAmount}</h2>
      </div>
    </Card>
  );
};

export default Cart;
