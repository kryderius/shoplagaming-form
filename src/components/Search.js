import React, { useState } from "react";
import { Input, Text } from "@nextui-org/react";
import styled from "styled-components";
import axios from "axios";
import Form from "./Form";
import { Icon } from "@iconify/react";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 15px;
`;

const ResultsContainer = styled.div`
  background-color: #f4f4f4;
  width: 100%;
  height: auto;
  display: none;
  flex-direction: column;
  border-radius: 0.75rem;
  padding: 0.25rem 0.625rem;

  &.active {
    display: flex;
  }
`;

const ResultBox = styled.div`
  cursor: pointer;
  display: flex;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const ResultBoxRight = styled.div`
  padding-left: 15px;
`;

const ThumbWrapper = styled.div`
  width: 150px;
  height: 150px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ResultItemName = styled(Text)`
  font-family: "Rubik", sans-serif;
  font-weight: 700;
`;

const Search = ({ cartItems, setCartItems }) => {
  const [query, setQuery] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [stepQuestion, setStepQuestion] = useState([]);

  const handleSearch = async (e) => {
    if (!e) {
      setQuery();
    } else {
      setIsLoading(true);
      axios
        .get(`http://localhost/shop/wp-json/wp/v2/products/${e}`)
        .then((res) => {
          setQuery(res);
        })
        .catch((err) => {
          setQuery();
        });
      setIsLoading(false);
    }
  };

  const handleResultClick = (e) => {
    setCurrentProduct(e);
    setQuery();
    setStepQuestion([]);
  };

  return (
    <Container>
      <Input
        width="100%"
        placeholder="Search for a product"
        onChange={(e) => handleSearch(e.target.value)}
        contentRight={<Icon icon="ic:twotone-search" />}
        aria-label="Search"
      />
      <ResultsContainer className={query && "active"}>
        {isLoading ? (
          <p>Ładowanie...</p>
        ) : query ? (
          <>
            {query.data === "Brak wyników" ? (
              <span>Brak wyników</span>
            ) : (
              query.data.map((node, index) => (
                <ResultBox key={index} onClick={(e) => handleResultClick(node)}>
                  <ThumbWrapper>
                    <img src={node.thumbnail} alt={node.name} />
                  </ThumbWrapper>
                  <ResultBoxRight>
                    <ResultItemName size={16} weight="medium">
                      {node.name}
                    </ResultItemName>
                    <Text style={{ fontFamily: '"Rubik", sans-serif' }}>
                      £{node.startPrice}
                    </Text>
                  </ResultBoxRight>
                </ResultBox>
              ))
            )}
          </>
        ) : (
          "Brak wyników"
        )}
      </ResultsContainer>
      {currentProduct && (
        <Form
          formQuery={currentProduct}
          cartItems={cartItems}
          setCartItems={setCartItems}
          stepQuestion={stepQuestion}
          setStepQuestion={setStepQuestion}
          setCurrentProduct={setCurrentProduct}
        />
      )}
    </Container>
  );
};

export default Search;
