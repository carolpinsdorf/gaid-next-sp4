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
            background-color: transparent;

        };
        img:hover, h1:hover{
            scale: 1.1;
            transition: 0.3s ease-in-out;
        }
    }
    .div-logoGaid{
        padding: 10px 5px;
        background-color: transparent;
    }
  
`;

//                                                      Estilizando o container do Menu

export const NavContainer = styled.nav`
    padding: 10px 0px;
    position: relative; /* Necessário para o menu hamburguer */
    z-index: 1000; /* Um número alto para garantir que fique acima de outros elementos */
    padding: 10px 0px;

    ul{
        //background-color: aliceblue;
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content:right;
        align-items: center;
        flex-wrap: wrap;
        padding: 13px;
        //background-color: rgba(74, 144, 226, 0.1);
        animation: ${fadeIn} 0.5s ease-in;
        height: 0; /* Oculte o menu completamente quando fechado */
        
        li {
            border: solid 2px #3caaea;
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

    // Menu Hamburguer para Mobile
    .menu-toggle {
        display: none;
        position: absolute;
        top: 10px; /* Ajuste para alinhar corretamente */
        right: 10px;
        cursor: pointer;
        padding: 10px;
        background-color: #4a90e2;
        border-radius: 5px;
        z-index: 10; /* Para garantir que o ícone esteja sobre os outros elementos */
    }

    .menu-toggle span {
        display: none;     
        width: 25px;
        height: 3px;
        margin: 5px;
        background-color: white;
    }


    @media (max-width: 782px) { /* Tablets e Mobile */
        ul {
            display: none; /* Oculte o menu por padrão */
            height: auto; /* Defina a altura como auto */
            max-height: 400px; /* Defina uma altura máxima se necessário */
            overflow-y: auto; /* Permite rolagem vertical quando necessário */
            transition: max-height 0.3s ease; /* Suaviza a transição da altura */
        }

        ul.show-menu {
            height: auto; /* Exibe o menu quando a classe show-menu for adicionada */
            //display: block;
            display: flex;
            flex-direction: column;
            align-items: end;
            margin-top: 50px;
            position: absolute;
            right:0;

            li{
                margin-top: 10px;
            }
        }

        li {
            width: 150px; /* Para que os itens não fiquem esticados */
            text-align: center; /* Centraliza o texto */
            margin: 10px 0;
            padding: 10px;
            background-color: transparent;
            margin: 5px 2px;
        }
        

        .menu-toggle {
            display: block;
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            z-index: 10;
            padding: 10px;
            background-color: #4a90e2;
            border-radius: 5px;
        }

        .menu-toggle span {
            display: block;
            width: 25px;
            height: 3px;    
            margin: 5px;
            background-color: white;
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

    // Media Queries
    @media (max-width: 768px) { /* Tablets */
        div {
            flex-direction: column;
            align-items: center;
        }
    }

    @media (max-width: 480px) { /* Smartphones */
        div {
            flex-direction: column;
            align-items: center;
            padding: 5px;
        }
    }

    @media (min-width: 1200px) { /* Telas grandes */
        div {
            padding: 20px;
        }
    }
`;

//                                      Estilos para o botão VoltarAoTopo
 export const TopoButton = styled.button<{ $visible: boolean }>`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #3caaea;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 10px 15px;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease-in-out;
    opacity: ${(props) => (props.$visible ? "1" : "0")};
    pointer-events: ${(props) => (props.$visible ? "auto" : "none")}; /* Evita clique quando invisível */

    &:hover {
        background-color: #2b8ac3;
        transition: 0.3s ease-in-out;
    }
`;