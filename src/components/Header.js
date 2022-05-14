import React from "react";
import styled from "styled-components";
import LogoImg from "../assets/images/logo.png";
import { Icon } from "@iconify/react";
import { Text } from "@nextui-org/react";

const HeaderContainer = styled.header`
  background-color: rgba(19, 31, 53, 1);
  padding: 15px;
  height: 12vh;
  display: flex;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LogoWrapper = styled.a``;

const Logo = styled.img`
  width: 200px;
`;

const BackButton = styled.a`
  color: #fff;
  display: flex;

  &:hover svg {
    transform: rotate(360deg);
  }

  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    transition: transform 0.3s ease-out;
  }
`;

const StyledText = styled(Text)`
  color: #fff;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LogoWrapper href="https://shoplagaming.co.uk/">
          <Logo src={LogoImg} />
        </LogoWrapper>
        <BackButton href="https://shoplagaming.co.uk/">
          <Icon icon="bi:arrow-left-circle" />
          <StyledText>Go back to shop</StyledText>
        </BackButton>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
