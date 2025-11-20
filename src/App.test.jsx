import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import userEvent from "@testing-library/user-event";
import { uiActions } from "./store/uiSlice";

describe("App Components", () => {

    beforeEach(() => {
    // Reset showCart to false before each test
    store.dispatch(uiActions.toggleCart(false));
    });

    test("checking if cart button working single click (show)", async () => {
        render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const user = userEvent.setup();
    const cartToggleButton = screen.getByRole("button", { name: /my cart/i });

    await user.click(cartToggleButton);

    expect(store.getState().ui.showCart).toBe(true);
  });

  test("checking if cart button working 2 clicks (hide)", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const user = userEvent.setup();
    const cartToggleButton = screen.getByRole("button", { name: /my cart/i });

    await user.click(cartToggleButton);
    await user.click(cartToggleButton);

    expect(store.getState().ui.showCart).toBe(false);
  });

  test("checking if products are rendered correctly", ()=>{
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const phoneItem = screen.getByText("phone");
    const watchItem = screen.getByText("watch");

    expect(phoneItem).toBeInTheDocument();
    expect(watchItem).toBeInTheDocument();
  });
  
  test("checking if navigation are rendered correctly", ()=>{
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const nav = screen.getByRole('navigation');

    expect(nav).toBeInTheDocument();
  });

  test("checking if header renders with ReduxCart title", ()=>{
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const header = screen.getAllByRole('banner');
    const title = screen.getByText('ReduxCart');

    expect(title).toBeInTheDocument();
  });

});