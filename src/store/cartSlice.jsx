import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showCart: true,
    cartItem: [],
    totalItems: 0,
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        toggleCart(state){
            state.showCart = !state.showCart;
        },
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
        },
        increaseCart(state, action){
            const id = action.payload;
            const exists = state.cartItem.find((item)=> item.id === id);
            state.totalItems++;
            
            if(exists){
                exists.quantity++;
                exists.total = exists.total + exists.price;
            }
        }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;