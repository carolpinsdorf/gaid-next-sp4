import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px); /* Faz o elemento subir um pouco */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MainAreaCliente = styled.main`
    width: 100vw;
    height: 100vh;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: url('/assets/bgAreaDoCliente.png');
    background-size: cover;
    animation: ${fadeIn} 2s ease-in-out;

    h1{
        margin: 5rem auto;
        text-align: center;
        font-size: 40px;
        font-weight: 500;
        background-color: transparent;
        text-shadow: 0 14px 25px #000;
    }
    @media (max-width: 845px) {
        /* Para tablets */
        background: url('/assets/hero2.png');
        background-position: bottom;
        background-size: cover;
        margin-top: 2px;
        h1{
            margin: 3% auto;
            font-size: 30px;
        }

    }

    @media (max-width: 500px) {
        /* Para celulares */
        

    }

`;
export const Container = styled.div`
    height: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    background-color: transparent;

    a{
        background-color: transparent;   
        text-decoration: none;
    }

    @media (max-width: 1100px) {
        flex-wrap: wrap;
        margin-top: 2rem;
    }
    @media (max-width: 768px) {
        /* Para tablets */
        flex-direction: row;
        margin-top: 2rem;
    }

    @media (max-width: 550px) {
        margin-bottom: 6rem;
        margin-top: 5px;
        flex-direction: column;
    }

`;

export const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 25px;
    background-color: transparent;

`;

export const BoxImage = styled.div`
    width: fit-content;
    height: auto;
    flex: 1;
    background-color: #142939;
    //background-color: transparent;
    //border: solid 6px rgba(74, 144, 240, 1);
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 14px 25px #000;
    transition: transform 0.3s ease, opacity 0.3s ease;

    img {
        width: auto;
        height: 200px;
        margin: auto;
        background-color: transparent;

    }

    &:hover {
        transform: translateY(-5px);
        opacity: 0.9;
    }

    @media (max-width: 768px) {
        /* Para tablets */
        
        img{
            width: 150px;
            height: auto;
            margin: auto;
        }
    }

    @media (max-width: 550px) {
        /* Para celulares */
        img{
            width: 100px;
            height: auto;
            margin: auto;
        }
    }
`;

export const Descricao = styled.div`
    margin-top: 3rem;
    background-color: #142939;
    border-radius: 20px;
    padding-inline: 2rem;
    padding-block: 1rem;
    color: #d2d6d8;
    font-size: 1.5rem;
    font-weight: 600;
    transition: background-color 0.3s ease;
    box-shadow: 0 14px 25px #000;

    p{
        background-color: transparent;
        font-weight: 300;
        color: #007bff;
    }
    &:hover {
        background-color: #007bff;
        p{
            color: #d2d6d8;
        }
        cursor: pointer;
    }

    @media (max-width: 500px) {
        font-size: 1.25rem;
        padding: 10px;
        border-radius: 7px;
        margin-top: 6%;
    }
`;
