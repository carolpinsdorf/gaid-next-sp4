import styled, { keyframes } from 'styled-components';

//                                                      Estilizando o container do cabeçalho
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

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    //background-color: #fff; 
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
    min-height: 8vh;
    height: 5vh;
    width: 100%;
    animation: ${fadeIn} 1s ease-in;

    div{
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        height: auto;
        
        img{
            height: 5vh;
            width: auto;
            animation: ${fadeIn} 1s ease-in;

        };
        img:hover, h1:hover{
            scale: 1.09;
        }
        h1{
            font-size: 25px;
            padding: 10px;
            font-weight: bold;
            color: #9e9e9e;
            animation: ${fadeIn} 1s ease-in;

        }
    }
    .div-logoGaid{
        padding: 10px 5px;
    }
  
`;

//                                                      Estilizando o container do Menu

export const NavContainer = styled.nav`
    padding: 10px 0px;
    ul{
        //background-color: aliceblue;
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content:right;
        align-items: center;
        padding: 13px;
        //background-color: rgba(74, 144, 226, 0.1);
        animation: ${fadeIn} 0.5s ease-in;
        
        li {
            border: solid 3px #9e9e9e;
            border-radius: 5px;
            position: relative; /* Necessário para o pseudo-elemento */
            font-weight: lighter;
            font-size: 16px;
            color: #9e9e9e;
            cursor: pointer;
            animation: ${fadeIn} 1s ease-in;
            //background-color: rgba(74, 144, 226, 0.2);
            padding:  10px 20px;
            margin: 0 3%;
            
            a{
                background-color: rgba(74, 144, 226, 0.02);
                text-decoration: none;
            }
            /* Pseudo-elemento para a linha */
            &::after {
                content: '';
                position: absolute;
                left: 50%; /* Centraliza inicialmente */
                bottom: -5px; /* Distância da linha em relação ao texto */
                width: 0; /* Inicialmente invisível */
                height: 5px; /* Altura da linha */
                background-color: #4a90e2; /* Cor da linha */
                transition: width 0.3s ease, left 0.3s ease; /* Transição suave */
            }

            /* Efeito hover */
            &:hover::after {
                width: 100%; /* Largura total na hover */
                left: 0; /* Alinha à esquerda */
            }
        }
    }

`;


//                                                      Estilizando o container do Rodape

export const FooterContainer = styled.footer`
    div{
        //background-color: red;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 10px;
        flex-wrap: wrap;
        transition: width 0.3s ease, left 0.3s ease;

        p{
            color: #9e9e9e;
        }
        p:hover{
            color: #4a90e2;
        }
    }
`;