import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect, useRef } from 'react';
import { uiActions } from './store/uiSlice';
import Notification from './components/UI/Notification';

let isFirstRun = true;

function App() {

  const dispatch = useDispatch();
  
  const showCart = useSelector(state=> state.ui.showCart);

  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  useEffect(()=>{
    const sendCartData = async () =>{
        dispatch(
          uiActions.showNotification({
            status:"pending",
            title: "Sending",
            message: "Sending Cart Data!",
          }));
        const res = await fetch(`https://ecommerce-site-9c080-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`, {
          method: 'PUT',
          body:JSON.stringify(cart),
        });
        
        if(!res.ok){
          throw new Error("Error Sending Data!!");
        }
        dispatch(
          uiActions.showNotification({
            status:"success",
            title: "Success",
            message: "Sent cart data SuccessFully!",
          }));
    }
    if(isFirstRun) {
      isFirstRun = false;
      console.log("Dwadaw");
      return;
    }
    sendCartData().catch((error)=>{
      dispatch(
        uiActions.showNotification({
          status:"error",
          title: "Error!",
          message: "Sending Cart Data Failed!",
        }));
      });
  },[cart, dispatch]);

  return (
    <>
    {notification && 
      <Notification 
        status={notification.status}  
        title={notification.title}
        message={notification.message}  
      />}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
