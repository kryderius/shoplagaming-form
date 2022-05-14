import React from "react";
import styled from "styled-components";
import { Text } from "@nextui-org/react";

const Container = styled.div`
  max-width: 900px;
  margin: 5px auto 0 auto;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  /* padding: 15px; */
  border: 2px solid #d6d6d6;
`;

const Headline = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 60% 20% 20%;
  border-bottom: 1px solid #d6d6d6;

  p {
    border-right: 1px solid #d6d6d6;
    padding: 10px 0;
  }
`;

const TotalBox = styled.div`
  display: grid;
  grid-template-columns: 60% 20%;

  p {
    border-right: 1px solid #d6d6d6;
    padding: 10px 0;
  }
`;

const StyledButton = styled.button`
  width: 90px;
  height: 30px;
  background-color: #af0000;
  color: #fff;
  border: 2px solid black;
  border-radius: 7px;
  cursor: pointer;
  margin-top: 30px;
  align-self: flex-end;
`;

const RemoveButton = styled.button`
  width: 27px;
  height: 27px;
  background-color: #af0000;
  border: 2px solid black;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  z-index: 2;
  align-self: center;
  justify-self: center;
`;

const Quote = ({
  cartItems,
  setIsApproved,
  setIsQuote,
  handleRemoveFromCart,
}) => {
  const handleApproveButton = () => {
    setIsApproved(true);
    setIsQuote(false);
  };
  let totalPrice = cartItems.reduce(
    (total, currentValue) => (total = total + currentValue.proposedPrice),
    0
  );

  return (
    <Container>
      <Headline>Quote</Headline>
      <Wrapper>
        {cartItems &&
          cartItems.map((node, index) => (
            <Box key={index}>
              <Text size={20} weight="medium" style={{ paddingLeft: "15px" }}>
                {node.productName}
              </Text>
              <Text size={20} weight="medium" style={{ textAlign: "center" }}>
                £{node.proposedPrice}
              </Text>
              <RemoveButton onClick={(e) => handleRemoveFromCart(index)}>
                X
              </RemoveButton>
            </Box>
          ))}
        {cartItems && cartItems.length !== 0 && (
          <TotalBox>
            <Text
              size={20}
              weight="medium"
              style={{ justifySelf: "flex-end", paddingRight: "15px" }}
            >
              Total:
            </Text>
            <Text size={20} weight="medium" style={{ textAlign: "center" }}>
              £{totalPrice}
            </Text>
          </TotalBox>
        )}
      </Wrapper>
      <StyledButton onClick={(e) => handleApproveButton()}>
        APPROVE
      </StyledButton>
    </Container>
  );
};

export default Quote;
