import { keyframes } from "styled-components";
import styled from "styled-components";

//                                                      ANIMATIONS
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
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;



//                                                      Estilizando o container do Home
export const HomeContainer = styled.main`
    width: 100vw;
    height: 100vh;
    flex-grow: 1;
`;

//                                                      Estilizando o container do CarDiag

export const CarDiagContainer = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;

    .div-img{
        width: 48%;
        height: auto;
        align-items: center;
        animation: ${slideInFromRight} 1s ease-out 0.5s forwards;

        img{
            width: 100%;
            height: auto;
            padding: 20px 0px;
        };
    }
    .div-texto{
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: ${slideInFromLeft} 1s ease-out;

        p{
            text-align: center;
            font-size: 50px;
            font-weight: 100;
            color: #9e9e9e;
        }
        img{
            margin-top: 10%;
            padding: 20px;
            width: 150px;
            height: auto;
        }
    }
    
`;

//                                                      Estilizando o container do Galdi
export const GaldiContainer = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .div-video{
        height: 100vh;
        width: 30%;
        //background-color: violet;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: ${slideInFromLeft} 1s ease-out;

        video{
            width: 90%;
            height: auto;
        }
    }
    .div-img{
        display: flex;
        width: 30%;
        animation: ${fadeIn} 1s ease-in;
        align-items: center;
        justify-content: center;
        img{
            width:80%;
            height: auto;
        }
        
    }
    .div-p{
        width: 33%;
        padding: 20px;
        animation: ${slideInFromRight} 1s ease-out 0.5s forwards;

        p{
            text-align: right;
            font-size: 40px;
            font-weight: 100;
            color: #9e9e9e;
        }
    }
`;

//                                                      Estilizando o container do CDScanner

export const CDScannerContainer = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;

    .div-img{
        width: 100vw;
        height: 50%;
        img{
            width: 100%;
            height: auto;
            margin-bottom: 0px;
        }
    }
    .div-texto{
        width: 100vw;
        height: 50%;
        margin-top: 10%;
        p{
            text-align: center;
            font-size: 30px;
            font-weight: 100;
            color: #9e9e9e;
        }
    }
`;

//                                                      Estilizando o container do Empresa
export const EmpresaContainer = styled.section`
    height: 100vh;
    width: 100vw;

    .div-carrossel{
        padding: 10px;
        height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .div-texto{
        margin-top: 20px;
        h1{
            margin-top: 50px;
            font-size: 40px;
            font-weight: 100;
            color: #9e9e9e;
            text-align: center;
            padding: 30px;
        }
    }
    .div-desc{
        display: flex;
        flex-direction: column;
        //align-items: center;
        //justify-content: center;
        text-align: left;
        width: 35%;
        margin-left: 20px;
        padding: 30px;
        

        .frase, .nome{
            padding: 10px;
            font-size:35px;
            font-weight: 100;
            color: #9e9e9e;
        }
        .frase{
            font-style: italic;
            
        }
        .nome{
            color: #4a90e2;
            
        }

    }
`;

//                                                      Estilizando o container do Suporte
