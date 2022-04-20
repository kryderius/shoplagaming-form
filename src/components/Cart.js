import React from "react";
import styled from "styled-components";
import { Text } from "@nextui-org/react";

const Container = styled.div`
  max-width: 900px;
  margin: 5px auto 0 auto;
  padding: 0 15px;
`;

const Wrapper = styled.div``;

const Box = styled.div`
  position: relative;
  background-color: #f4f4f4;
  width: 100%;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
`;

const AnswerWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  width: 90px;
  height: 30px;
  background-color: #af0000;
  color: #fff;
  border: 2px solid black;
  border-radius: 7px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  width: 27px;
  height: 27px;
  background-color: #af0000;
  border: 2px solid black;
  position: absolute;
  top: 15px;
  right: 15px;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
`;

const Cart = ({ cartItems, setIsQuote, handleRemoveFromCart }) => {
  return (
    <Container>
      <Wrapper>
        <Text size={24} weight="medium">
          Your cart ({cartItems.length}):
        </Text>
        {cartItems &&
          cartItems.map((node, index) => (
            <Box key={index}>
              <Text size={20} weight="bold">
                {node.productName}
              </Text>
              {node.productQuestions.map((questionNode, index) => (
                <AnswerWrapper>
                  <Text key={index}>
                    {questionNode.question}: {questionNode.answer}
                  </Text>
                </AnswerWrapper>
              ))}
              <Text size={24} weight="medium">
                Proposed Price: £{node.proposedPrice}
              </Text>
              <RemoveButton onClick={(e) => handleRemoveFromCart(index)}>
                X
              </RemoveButton>
            </Box>
          ))}
        <StyledButton onClick={(e) => setIsQuote(true)}>GET QUOTE</StyledButton>
      </Wrapper>
    </Container>
  );
};

export default Cart;
