import React, { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Search from "./components/Search";
import styled from "styled-components";
import Cart from "./components/Cart";
import GlobalStyles from "./theme/globalStyles.js";
import Quote from "./components/Quote";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import Header from "./components/Header";
import Helmet from "react-helmet";

const Main = styled.main`
  height: 88vh;
`;

const PageContainer = styled.div`
  width: 100%;

  height: 100%;
  padding: 25px;

  @media (max-width: 992px) {
    padding: 10px;
  }
`;

const PageWrapper = styled.div`
  height: auto !important; /* real browsers */
  height: 100%; /* IE6: treaded as min-height*/

  min-height: 100%; /* real browsers */
  width: 100%;
  /* height: 100%; */
  padding: 50px 15px;
  background-color: #e3e3e3;
  border-radius: 20px;
  border: 2px solid #c9c9c9;
`;

const App = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [storageCart, setStorageCart] = useState([]);
  const [isQuote, setIsQuote] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
  const [allProducts, setAllProducts] = useState(
    JSON.parse(localStorage.getItem("allProducts"))
  );
  const [currentProduct, setCurrentProduct] = useState(null);
  const [stepQuestion, setStepQuestion] = useState([]);
  const [isCart, setIsCart] = useState(true);

  const handleRemoveFromCart = (e) => {
    let newCartItems = cartItems.filter((_, i) => i !== e);
    let newAllProducts = allProducts.filter((_, i) => i !== e);
    setCartItems(newCartItems);
    setAllProducts(newAllProducts);
  };

  const handleEditFromCart = (e) => {
    let newCartItems = cartItems.filter((_, i) => i !== e);
    let newAllProducts = allProducts.filter((_, i) => i !== e);
    setCartItems(newCartItems);
    setAllProducts(newAllProducts);
    setStepQuestion([]);
    setCurrentProduct(allProducts[e]);
    setIsCart(false);
  };

  useEffect(() => {
    let prev_items = JSON.parse(localStorage.getItem("cart")) || [];
    let all_items = JSON.parse(localStorage.getItem("allProducts")) || [];

    setCartItems(prev_items);
    setAllProducts(all_items);
    setIsInitiallyFetched(true);
  }, []);

  useEffect(() => {
    if (isInitiallyFetched) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("allProducts", JSON.stringify(allProducts));
    }
  }, [cartItems, allProducts]);

  useEffect(() => {
    if (cartItems && cartItems.length === 0) {
      setIsQuote(false);
    }
    // if (cartItems == null) {
    //   setIsQuote(false);
    // }
  }, [cartItems]);

  return (
    <NextUIProvider>
      <Helmet>
        <title>We Buy - Shopla</title>
      </Helmet>
      <GlobalStyles />

      <Main className="App">
        <Header />
        <PageContainer>
          <PageWrapper>
            {!isQuote && !isApproved && (
              <Search
                cartItems={cartItems}
                setCartItems={setCartItems}
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
                stepQuestion={stepQuestion}
                setStepQuestion={setStepQuestion}
                setIsCart={setIsCart}
              />
            )}
            {/* {!isQuote && cartItems.length !== 0 && !isApproved && (
              <Cart
                cartItems={cartItems}
                setIsQuote={setIsQuote}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEditFromCart={handleEditFromCart}
              />
            )} */}
            {isCart && cartItems?.length !== 0 && !isApproved && !isQuote && (
              <Cart
                cartItems={cartItems}
                setIsQuote={setIsQuote}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEditFromCart={handleEditFromCart}
              />
            )}
            {isQuote && (
              <Quote
                cartItems={cartItems}
                setIsApproved={setIsApproved}
                setIsQuote={setIsQuote}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            )}
            {isApproved && !isConfirmation && (
              <Checkout
                cartItems={cartItems}
                setIsConfirmation={setIsConfirmation}
              />
            )}
            {isConfirmation && <Confirmation />}
          </PageWrapper>
        </PageContainer>
      </Main>
    </NextUIProvider>
  );
};

export default App;
