import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";

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

const CountryErrorInfo = styled.p`
  color: red;
`;

const Checkout = ({ cartItems }) => {
  const [typedCity, setTypedCity] = useState();
  const [countryError, setCountryError] = useState(false);

  const mapRequest = cartItems.map((node) => <table>{node.productName}</table>);

  var bodyFormData = new FormData();
  bodyFormData.append("body", cartItems);

  const toJson = JSON.stringify(cartItems, null, 4);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, cartItems) => {
    setCountryError(false);
    axios
      .get(
        `https://nominatim.openstreetmap.org/?addressdetails=1&city=${data.City}&format=json&limit=1`
      )
      .then((response) => setTypedCity(response.data[0].address.country_code))
      .catch((error) => console.log(error));

    if (typedCity !== "gb") {
      setCountryError(true);
    } else {
      setCountryError(false);
      axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
      axios
        .post("https://formsubmit.co/ajax/krydegamer@gmail.com", {
          FirstName: data.FirstName,
          SecondName: data.LastName,
          Address1: data.Address1,
          Address2: data.Address2,
          Country: data.Country,
          City: data.City,
          County: data.County && data.County,
          Postcode: data.postcode,
          eMail: data.email,
          phoneNumber: data.phoneNumber,
          body: toJson,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  };

  console.log(typedCity);

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
              placeholder="Address 2"
              {...register("Address2", { required: true })}
            />
            {errors.Address2 && (
              <span className="required-info">This field is required</span>
            )}
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
              {...register("City", { required: true })}
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
              placeholder="Postcode"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <span className="required-info">This field is required</span>
            )}
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
          {/* <input type="submit" /> */}
          <button type="submit">SUBMIT</button>
        </form>
      </Wrapper>
      {countryError && (
        <CountryErrorInfo>
          Sorry, but we are not picking up products from outside the UK
        </CountryErrorInfo>
      )}
    </Container>
  );
};

const EmailTemplate = ({ cartItems }) => {
  return (
    <table>
      {cartItems.map((node, index) => (
        <>
          <span>{node.productName}</span>
          <span>{node.proposedPrice}</span>
        </>
      ))}
    </table>
  );
};

export default Checkout;
