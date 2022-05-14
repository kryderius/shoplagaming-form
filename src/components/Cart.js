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
  /* top: 15px;
  right: 15px; */
  top: 49px;
  right: 15px;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  z-index: 2;
`;

const EditButton = styled.button`
  width: 45px;
  height: 27px;
  background-color: #4f9c44;
  border: 2px solid black;
  position: absolute;
  /* top: 15px;
  right: 15px; */
  top: 49px;
  right: 50px;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  z-index: 2;
`;

const BottomText = styled(Text)`
  font-family: "Rubik", sans-serif;
  text-align: center;
  font-weight: 400;
  margin-top: 15px;

  &.isHidden {
    display: none;
  }
`;

const StyledText = styled(Text)`
  position: relative;
  margin-bottom: 15px;
  padding-bottom: 15px;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 104%;
    transform: translateX(-2%);
    height: 2px;
    background-color: #d6d6d6;
    z-index: 1;
  }
`;

const Cart = ({
  cartItems,
  setIsQuote,
  handleRemoveFromCart,
  handleEditFromCart,
}) => {
  return (
    <Container>
      <Wrapper>
        <Text size={24} weight="medium">
          Your cart ({cartItems && cartItems.length}):
        </Text>
        {cartItems &&
          cartItems.map((node, index) => (
            <Box key={index}>
              <StyledText size={20} weight="bold">
                {node.productName}
              </StyledText>
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
              <EditButton onClick={(e) => handleEditFromCart(index)}>
                EDIT
              </EditButton>
              <RemoveButton onClick={(e) => handleRemoveFromCart(index)}>
                X
              </RemoveButton>
            </Box>
          ))}
        <BottomText>Start typing to add another product</BottomText>
        <StyledButton onClick={(e) => setIsQuote(true)}>GET QUOTE</StyledButton>
      </Wrapper>
    </Container>
  );
};

export default Cart;
