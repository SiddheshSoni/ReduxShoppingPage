import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import store from "../../store/store";
import Cart from "./Cart";

test('Cart Component', ()=>{
    render(<Provider store={store}>
        <Cart />
    </Provider>);

    const CartHeading = screen.getByText("Your Shopping Cart");
    expect(CartHeading).toBeInTheDocument();
});