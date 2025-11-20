import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MainHeader from "./MainHeader";
import { Provider } from "react-redux";
import store from "../../store/store";

describe("MainHeader components",()=>{

    test('MainHeader heading', ()=>{
        // Arrange
        render( <Provider store={store}>
                <MainHeader />
            </Provider>
        );
        //act
        
        //assert
        const mainHeaderHeading = screen.getByText("ReduxCart");
        expect(mainHeaderHeading).toBeInTheDocument();
    });

    test('MainHeader rendering cartButton component', ()=>{
        // Arrange
        render( <Provider store={store}>
                <MainHeader />
            </Provider>
        );
        //act
        
        //assert
        const cartButton= screen.getByText("My Cart")
        expect(cartButton).toBeInTheDocument();
    });
})