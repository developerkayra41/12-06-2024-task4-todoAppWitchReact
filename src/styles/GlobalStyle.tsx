import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
}

.genel-box {
    margin-top: 3rem;
    margin: 3rem 3rem;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
}

.genel-box h1 {
    margin-bottom: 1rem;
    font-family: "Manrope", sans-serif;
    text-align: center;
}

.first-div {
    margin-bottom: 1rem;
    display: flex;
    align-items:center;
}

.first-div a {
    display: inline-block;
    padding: 10px 20px;
    text-decoration: none;
    border: 2px solid transparent;
    transition: all 0.1s ease; /* Hover geçiş efektini daha hoş yapmak için */
    font-family: "Manrope", sans-serif;
    background-color: rgb(186, 0, 186);
    color: white;
    border-radius: 7px;
    font-size: 1.3rem;
    
}

.first-div a:hover {
    background-color: white;
    color: rgb(186, 0, 186);
    border: 2px solid rgb(186, 0, 186);
}


::-webkit-scrollbar {
    width: 5px;
    height: 5px;

}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: rgb(149, 149, 149);
    border-radius: 10px;
}



`;

export default GlobalStyle