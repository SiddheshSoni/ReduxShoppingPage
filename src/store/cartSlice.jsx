import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialState = {
    cartItem: [],
    totalItems: 0,
    changed: false
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart(state, action){
            const newItem = action.payload;
            const exists = state.cartItem.find((item)=> item.title === newItem.title);
            
            if(!exists){
                state.cartItem.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity:1,
                    total: newItem.price
                });
            }else{
                exists.quantity++;
                exists.total = exists.total + newItem.price;
            }
            state.totalItems++;
            state.changed = true;
        },
        removeFromCart(state, action){
            const id = action.payload;
            const exists = state.cartItem.find((item)=> item.id === id);
            state.totalItems--;
            exists.total = exists.total - exists.price;
            if(exists.quantity === 1){
                state.cartItem = state.cartItem.filter((item)=> item.id !== id);   
            }else{    
                exists.quantity--;
            }
            state.changed = true;
        },
        increaseCart(state, action){
            const id = action.payload;
            const exists = state.cartItem.find((item)=> item.id === id);
            state.totalItems++;
            
            if(exists){
                exists.quantity++;
                exists.total = exists.total + exists.price;
            }
            state.changed = true;
        },
        replaceCart(state, action) {
            state.totalItems = action.payload.totalItems;
            state.cartItem = action.payload.cartItem || []; 
        },
    }
});

export const fetchCartData = () => {
    return async (dispatch) => {
         dispatch(
            uiActions.showNotification({
                status:"pending",
                title: "Sending",
                message: "Fetching Cart Data!",
            }));
        const fetchData = async () => {
            const response = await fetch(
                `https://ecommerce-site-9c080-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`
            );

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
            dispatch(
                uiActions.showNotification({
                    status:"success",
                    title: "Success",
                    message: "Fetched cart data SuccessFully!",
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status:"error",
                    title: "Error!",
                    message: "Fetching Cart Data Failed!",
            }));
        }
    }
};

export const sendCartData = (cart) =>{
    return async (dispatch)=>{
        dispatch(
            uiActions.showNotification({
                status:"pending",
                title: "Sending",
                message: "Sending Cart Data!",
            }));
        const sendRequest = async () =>{
            const res = await fetch(`https://ecommerce-site-9c080-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`, {
                method: 'PUT',
                body:JSON.stringify(cart),
            });
            
            if(!res.ok){
                throw new Error("Error Sending Data!!");
            }
        }
        try{
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status:"success",
                    title: "Success",
                    message: "Sent cart data SuccessFully!",
                }));
        }catch(err){
            dispatch(
                uiActions.showNotification({
                    status:"error",
                    title: "Error!",
                    message: "Sending Cart Data Failed!",
                }));
            }
        }
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;