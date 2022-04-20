import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text } from "@nextui-org/react";

const Container = styled.div`
  max-width: 900px;
  margin: 5px auto 0 auto;
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #d6d6d6;
`;

const Pagination = styled.div`
  display: flex;
`;

const PaginationDot = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50px;
  border: 1px solid #c9c9c9;
  background-color: #e3e3e3;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-right: 15px;
  }

  &.active {
    background-color: #256108;
  }
`;

const AnswerInput = styled.input``;

const AlertInfo = styled.span`
  color: red;
`;

const StyledSumResult = styled.span`
  font-size: 28px;
  font-weight: 700;
`;

const AnswersWrapper = styled.div`
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const AnswerLabel = styled.label`
  input {
    margin-right: 5px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavButton = styled.button`
  width: 90px;
  height: 30px;
  background-color: #af0000;
  color: #fff;
  border: 2px solid black;
  border-radius: 7px;
  cursor: pointer;
`;

const ProposedPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNavButton = styled(NavButton)`
  width: 120px;
`;

const Form = ({
  formQuery,
  cartItems,
  setCartItems,
  stepQuestion,
  setStepQuestion,
  setCurrentProduct,
}) => {
  const [step, setStep] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(
  //   parseInt(formQuery.startPrice, 10)
  // );

  const [totalPrice, setTotalPrice] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [stepsSum, setStepsSum] = useState([]);
  const [stepValue, setStepValue] = useState(0);
  const [stepAnswer, setStepAnswer] = useState();

  const toJson = JSON.parse(formQuery.questions);

  // const updateItem = (id, itemAttributes) => {
  //   var index = stepQuestion.findIndex((x) => x.id === id);
  //   if (index === -1) {
  //     // handle error
  //   } else
  //     setStepQuestion({
  //       items: [
  //         ...stepQuestion.slice(0, index),
  //         Object.assign({}, stepQuestion[index], itemAttributes),
  //         ...stepQuestion.slice(index + 1),
  //       ],
  //     });
  // };

  useEffect(() => {
    let startingPrice = parseInt(formQuery.startPrice, 10);
    setTotalPrice(startingPrice);
  }, [formQuery.startPrice]);

  const calculatePrice = (e) => {
    // let sum = parseInt(e, 10);
    setStepsSum([...stepsSum, stepValue]);
  };

  const handleBackButton = () => {
    let sumArray = stepsSum;
    let stepsQuestions = stepQuestion;

    if (step === 0) {
      setStep(0);
    } else {
      setStep(step - 1);
      setIsChecked(false);
      setStepValue(0);
      sumArray.splice(step - 1, 1);
      setStepAnswer();
      stepsQuestions.splice(step - 1, 1);
      setStepsSum(sumArray);
    }
  };

  const handleNextButton = (e) => {
    if (step === toJson.product.questions.length) {
      setStep(step);
    } else if (isChecked === false) {
      setAlert(true);
    } else {
      setStepQuestion([
        ...stepQuestion,
        // [toJson.product.questions[step].question, stepAnswer],
        {
          question: toJson.product.questions[step].question,
          answer: stepAnswer,
        },
      ]);
      setStep(step + 1);
      setIsChecked(false);
      setAlert(false);
      calculatePrice(e);
      setStepValue(0);
      setStepValue();
    }
  };

  const handleRadioClick = (e, answer) => {
    setIsChecked(true);
    setStepValue(e);
    setStepAnswer(answer);
  };

  const total = stepsSum.reduce(
    (total, currentItem) => (total = total + currentItem),
    0
  );

  const handleAddToCartButton = () => {
    // setCartItems([...cartItems, [formQuery.name, stepQuestion]]);
    setCartItems([
      ...cartItems,
      {
        productName: formQuery.name,
        proposedPrice: totalPrice + total,
        productQuestions: stepQuestion,
      },
    ]);
    setCurrentProduct();
  };

  return (
    <Container>
      <Text h2 size={18} weight="bold">
        {formQuery.name}
      </Text>
      {/* <Text size={16}>Starting price: {totalPrice}</Text> */}
      <Pagination>
        {toJson.product.questions.map((node, index) => (
          <PaginationDot className={step >= index && "active"} key={index}>
            {index + 1}
          </PaginationDot>
        ))}
      </Pagination>
      {toJson.product.questions.map(
        (node, index) =>
          step === index && (
            <>
              <Text
                size={18}
                key={index}
                style={{
                  paddingBottom: "10px",
                  fontFamily: '"Rubik", sans-serif',
                }}
              >
                {node.question}
              </Text>
              <div className="radio-group">
                <AnswersWrapper>
                  {node.answers.map((answ, index) => (
                    <AnswerLabel
                      style={{
                        fontFamily: '"Rubik", sans-serif',
                      }}
                    >
                      <AnswerInput
                        type="radio"
                        name="Siemka"
                        key={index}
                        value={answ.value}
                        onChange={(e) =>
                          handleRadioClick(answ.value, answ.answer)
                        }
                        onSelect={(e) => setIsChecked(true)}
                      />
                      {answ.answer}
                    </AnswerLabel>
                  ))}
                </AnswersWrapper>
              </div>
            </>
          )
      )}

      {alert && <AlertInfo>Choose answer</AlertInfo>}
      <ButtonsWrapper>
        <NavButton onClick={(e) => handleBackButton()}>
          <Text
            color="#ffffff"
            size={16}
            weight="bold"
            style={{ fontFamily: '"Rubik", sans-serif', fontWeight: 400 }}
          >
            BACK
          </Text>
        </NavButton>
        {step !== toJson.product.questions.length && (
          <NavButton onClick={(e) => handleNextButton(step)}>
            <Text
              color="#ffffff"
              size={16}
              weight="bold"
              style={{ fontFamily: '"Rubik", sans-serif', fontWeight: 400 }}
            >
              NEXT
            </Text>
          </NavButton>
        )}
      </ButtonsWrapper>

      {step === toJson.product.questions.length && (
        <ProposedPriceWrapper>
          <StyledSumResult>
            Proposed price: £{totalPrice + total}
          </StyledSumResult>
          <StyledNavButton onClick={handleAddToCartButton}>
            <Text
              color="#ffffff"
              size={16}
              weight="bold"
              style={{ fontFamily: '"Rubik", sans-serif', fontWeight: 400 }}
            >
              Add to cart
            </Text>
          </StyledNavButton>
        </ProposedPriceWrapper>
      )}
    </Container>
  );
};

export default Form;
