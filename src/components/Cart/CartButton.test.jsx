import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import CartButton from "./CartButton";
import store from "../../store/store";

describe("CartButton Component", ()=>{

    test("checking if cart toggle", ()=>{
        //arrange
        render(<Provider store={store}>
            <CartButton />
        </Provider>);
    //act
    const buttonElement = screen.getByRole('button', { name: /my cart/i });
    userEvent.click(buttonElement);
    //assert
    // const showCartValue = screen.toHaveValue();
    expect(store.getState().ui.showCart).toBe(true);
    });

    test("badge value initially 0", ()=>{
        //arrange
        render(<Provider store={store}>
            <CartButton />
        </Provider>);

    const buttonElement = screen.getByRole('button', { name: /my cart/i });
    //assert
    const badgeElement = within(buttonElement).getByText("0");
    expect(badgeElement.textContent).toBe("0");
    });



});

