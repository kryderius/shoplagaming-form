import { Text } from "@nextui-org/react";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: 5px auto 0 auto;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 15px;
`;

const Headline = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const StyledText = styled(Text)`
  text-align: center;
`;

const Confirmation = () => {
  return (
    <Container>
      <Wrapper>
        <Headline>Thank you for placing your order.</Headline>
        <StyledText>
          We send you an e-mail with confirmation. If for some reason the email
          didn't reach you, please write to us at
          customerservice@shoplagaming.co.uk
        </StyledText>
      </Wrapper>
    </Container>
  );
};

export default Confirmation;
