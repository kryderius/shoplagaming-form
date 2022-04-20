import { createGlobalStyle } from "styled-components";
import "./typography.css";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
  }


  body {
    margin: 0;
    padding: 0;
    font-family: "Rubik", sans-serif !important;
  }
`;

export default GlobalStyles;
