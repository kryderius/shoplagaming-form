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
  padding: 15px;
  border: 1px solid #d6d6d6;
`;

const Headline = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 60% 20% 20%;
`;

const TotalBox = styled.div`
  display: grid;
  grid-template-columns: 60% 20%;
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

const Quote = ({ cartItems, setIsApproved, setIsQuote }) => {
  const handleApproveButton = () => {
    setIsApproved(true);
    setIsQuote(false);
  };
  return (
    <Container>
      <Headline>Quote</Headline>
      <Wrapper>
        {cartItems &&
          cartItems.map((node, index) => (
            <Box key={index}>
              <Text size={20} weight="medium">
                {node.productName}
              </Text>
              <Text size={20} weight="medium">
                £{node.proposedPrice}
              </Text>
            </Box>
          ))}
        {cartItems.length !== 0 && (
          <TotalBox>
            <Text
              size={20}
              weight="medium"
              style={{ justifySelf: "flex-end", paddingRight: "15px" }}
            >
              Total:
            </Text>
            <Text size={20} weight="medium">
              Total:
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
