import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Text } from "@nextui-org/react";

const Container = styled.div`
  max-width: 900px;
  margin: 5px auto 0 auto;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 15px;

  form {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 0;
    justify-content: space-between;

    .input-label {
      position: relative;
      width: 100%;

      &.short {
        @media (min-width: 768px) {
          width: 49%;
        }
      }

      .required-info {
        position: absolute;
        left: 0;
        top: 0;
        transform: translateY(-100%);
        color: red;
      }
    }
  }

  form input {
    background-color: #f4f4f4;
    border-radius: 10px;
    border: 1px solid #d6d6d6;
    height: 50px;
    width: 100%;
    padding: 10px;
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

const BottomText = styled(Text)`
  font-family: "Rubik", sans-serif;
  text-align: center;
  font-weight: 400;
  margin-top: 15px;

  &.isHidden {
    display: none;
  }
`;

const FormBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// const CountryErrorInfo = styled.p`
//   color: red;
// `;

const Checkout = ({ cartItems, setIsConfirmation }) => {
  // const [typedCity, setTypedCity] = useState("");
  // const [countryError, setCountryError] = useState();
  // const [isCountryValid, setIsCountryValid] = useState(false);
  // const [isOrderSend, setIsOrderSend] = useState(false);
  // const [isFormLoading, setIsFormLoading] = useState(false);

  var formData = new FormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    formData.append("contact_message", JSON.stringify(cartItems));
    formData.append("contact_order", JSON.stringify(cartItems, null, 2));
    formData.append("contact_name", data.FirstName);
    formData.append("contact_secondname", data.LastName);
    formData.append("contact_email", data.email);
    formData.append("contact_addressone", data.Address1);
    formData.append("contact_addresstwo", data.Address2);
    formData.append("contact_country", data.Country);
    formData.append("contact_city", data.City);
    formData.append("contact_postcode", data.postcode);
    formData.append("contact_phonenumber", data.phoneNumber);
    formData.append("contact_county", data.County);

    fetch("https://shoplagaming.co.uk/wp-json/contact/v1/send", {
      method: "POST",
      body: formData,
    })
      .then((res) => {})
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    fetch("https://shoplagaming.co.uk/wp-json/contact/v1/sendconsumer", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    fetch("https://shoplagaming.co.uk/wp-json/orders/v1/addorder", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          setIsConfirmation(true);
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      DETAILS
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="input-label short">
            <input
              className="short"
              placeholder="First Name"
              {...register("FirstName", { required: true })}
            />
            {errors.FirstName && (
              <span className="required-info">This field is required</span>
            )}
          </label>
          <label className="input-label short">
            <input
              className="short"
              placeholder="Last Name"
              {...register("LastName", { required: true })}
            />
            {errors.LastName && (
              <span className="required-info">This field is required</span>
            )}
          </label>
          <label className="input-label">
            <input
              placeholder="Address 1"
              {...register("Address1", { required: true })}
            />
            {errors.Address1 && (
              <span className="required-info">This field is required</span>
            )}
          </label>

          <label className="input-label">
            <input
              placeholder="Address 2 (Optional)"
              {...register("Address2")}
            />
          </label>
          <label className="input-label short">
            <input
              className="short"
              placeholder="Country"
              {...register("Country", { required: true })}
            />
            {errors.Country && (
              <span className="required-info">This field is required</span>
            )}
          </label>

          <label className="input-label short">
            <input
              className="short"
              placeholder="City"
              {...register("City", {
                required: true,
              })}
            />
            {errors.City && (
              <span className="required-info">This field is required</span>
            )}
          </label>

          <label className="input-label short">
            <input
              className="short"
              placeholder="County (Optional)"
              {...register("County")}
            />
          </label>

          <label className="input-label short">
            <input
              className="short"
              placeholder="Postcode"
              {...register("postcode", { required: true })}
            />
            {errors.postcode && (
              <span className="required-info">This field is required</span>
            )}
          </label>

          <label className="input-label short">
            <input
              className="short"
              placeholder="Phone (Optional)"
              {...register("phoneNumber")}
            />
          </label>

          <label className="input-label short">
            <input
              className="short"
              placeholder="Email Address"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="required-info">This field is required</span>
            )}
          </label>
          <FormBottom>
            <BottomText>
              Before you press "Submit" please make sure all your details are
              correct.
              <br />
              You will receive a postage label and instructions shortly.
            </BottomText>
            <StyledButton type="submit">SUBMIT</StyledButton>
          </FormBottom>
        </form>
      </Wrapper>
      {/* {countryError && (
        <CountryErrorInfo>
          Sorry, but we are not picking up products from outside the UK
        </CountryErrorInfo>
      )} */}
    </Container>
  );
};

export default Checkout;
