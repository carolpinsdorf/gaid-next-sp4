import { keyframes } from "styled-components";
import styled from "styled-components";

//                                                      ANIMATIONS
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
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

const applyFadeIn = (component: React.ComponentType) => styled(component)`
  opacity: 0;
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;

  &.visible {
    opacity: 1;
    animation: ${fadeIn} 3s ease-out;
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
    flex-wrap: wrap;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;

    &.visible {
        opacity: 1;
        animation: ${fadeIn} 3s ease-out;
    }

    .div-img{
        width: 48%;
        height: auto;
        align-items: center;
        
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
        animation: ${slideInFromLeft} 1.5s ease-out;

        p{
            text-align: center;
            font-size: 3.5vw;
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

    @media (max-width: 782px) { /* Tablets e Mobile */
        display: flex;
        flex-direction: column;
        height: fit-content;
        .div-img{
            img{
                display: none;
            }
        }
        .div-texto{
            margin-top: 10%;
            justify-content: center;
            align-items: center;
            img{
                margin: auto;
            }
            .div-porto{
                display: flex;
            }
        }

    }
`;

//                                                      Estilizando o container do Galdi
export const GaldiContainer = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    height: 100vh;
    margin-top: 10%;
    
    opacity: 0;
    transition: opacity 2s ease-out, transform 2s ease-out;

    &.visible {
        opacity: 1;
        animation: ${slideInFromLeft} 1s ease-out;
    }

    .div-video{
        height: auto;
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
            font-size: 2.5vw;
            font-weight: 100;
            color: #9e9e9e;
        }
    }

    @media (max-width: 782px) { /* Tablets e Mobile */
        display: flex;
        flex-wrap: wrap;
        height: fit-content;
        margin-top: 10%;

        .div-video{
            width: fit-content;
            height: auto;
            video{
                width: 70%;
            }
        }
        .div-img, .div-p{
            margin-top: 10%;
            width: 50%;
        }

    }
`

//                                                      Estilizando o container do CDScanner
export const CDScannerContainer = applyFadeIn(styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin-top: 10%;
    
    opacity: 0;
    transition: opacity 2s ease-out, transform 2s ease-out;

    &.visible {
        opacity: 1;
        animation: ${fadeIn} 1s ease-out;
    }

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
        //background-color: red;
        display: flex;
        align-items: center;
        p{
            padding: 0 10% 0;
            text-align: center;
            font-size: 2.5vw;
            font-weight: 100;
            color: #9e9e9e;
        }
    }

    @media (max-width: 782px) { /* Tablets e Mobile */
        display: flex;
        flex-wrap: wrap;
        height: fit-content;
        margin-top: 10%;
    }
`);

//                                                      Estilizando o container do Empresa
export const EmpresaContainer = applyFadeIn(styled.section`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin-top: 10%;  
    background-image: url('/assets/bgPeople.png') ;
    background-size: cover;

    .div-carrossel{
        padding: 10px;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
    }
    .div-texto{
        margin-top: 20px;
        display: flex;
        justify-content: center;
        background-color: transparent;

        h1{
            width: fit-content;
            height: auto;
            margin: 5%;
            font-size: 2.5vw;
            font-weight: 100;
            color: #9e9e9e;
            text-align: center;
            padding: 10px;
            border: solid 3px rgba(74, 144, 240, 1);
            border-radius: 5px;
            background-color: transparent;
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
        background-color: transparent;
        

        .frase, .nome{
            padding: 10px;
            font-size: 2vw;
            font-weight: 100;
            color: #9e9e9e;
            background-color: transparent;
        }
        .frase{
            font-style: italic;
            
        }
        .nome{
            color: #4a90e2;
            
        }

    }

    @media (max-width: 782px) { /* Tablets e Mobile */
        height: fit-content;
        margin-top: 10%;
        .div-desc{
            padding: 5px;
        }
    }
`);

//                                                      Estilizando o container do Suporte
export const SuporteContainer = applyFadeIn(styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;


    h1{
        padding:10px;
        margin-bottom: 2%;
        font-size: 2.5vw;
        font-weight: 100;
        color: #9e9e9e;
        border: solid 3px rgba(74, 144, 240, 1);
        border-radius: 5px;
    }

    .div-box{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        height: auto;
        //background-color: #9e9e9e;
        justify-content: space-evenly;
        align-items: center;

        img{
            width: 35%;
            height: auto;
        }
        div{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            
            p{
                text-align: center;
                font-size: 1.5vw;
                font-weight: 100;
                color: #9e9e9e;
                
            }
        }
    }
    @media (max-width: 782px) { /* Tablets e Mobile */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        height: 400px;
        margin-top: 10%;
        margin-bottom: 400px;
    }
   
`);
