import React, { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Search from "./components/Search";
import styled from "styled-components";
import Cart from "./components/Cart";
import GlobalStyles from "./theme/globalStyles.js";
import Quote from "./components/Quote";
import Checkout from "./components/Checkout";
import axios from "axios";

const Main = styled.main`
  height: 100vh;
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px;
`;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 15px;
  background-color: #e3e3e3;
  border-radius: 20px;
  border: 2px solid #c9c9c9;
`;

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isQuote, setIsQuote] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const handleRemoveFromCart = (e) => {
    let newCartItems = cartItems.filter((_, i) => i !== e);
    setCartItems(newCartItems);
  };

  const formData = new FormData();

  formData.append("contact_name", "John Doe");
  formData.append("contact_email", "john.doe@example.com");
  formData.append("contact_message", "Just testing");

  const sendFakeMessage = () => {
    axios
      .post("https://shoplademo.000webhostapp.com/wp-json/contact/v1/send", {
        body: formData,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <NextUIProvider>
      <GlobalStyles />
      <head>
        <script src="https://smtpjs.com/v3/smtp.js"></script>
      </head>
      <Main className="App">
        <PageContainer>
          <button onClick={sendFakeMessage}>Wyślij</button>
          <PageWrapper>
            {!isQuote && !isApproved && (
              <Search cartItems={cartItems} setCartItems={setCartItems} />
            )}
            {!isQuote && cartItems.length !== 0 && !isApproved && (
              <Cart
                cartItems={cartItems}
                setIsQuote={setIsQuote}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            )}
            {isQuote && (
              <Quote
                cartItems={cartItems}
                setIsApproved={setIsApproved}
                setIsQuote={setIsQuote}
              />
            )}
            {isApproved && <Checkout cartItems={cartItems} />}
          </PageWrapper>
        </PageContainer>
      </Main>
    </NextUIProvider>
  );
};

export default App;
