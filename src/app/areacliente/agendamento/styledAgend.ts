import styled, {keyframes} from "styled-components"

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
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

export const MainAgendamento = styled.main`
    display: flex;
    flex-direction: column;
`;

export const Container = styled.div`
    justify-content: space-around;
    padding: 20px;
    background-color: black;
    background-image: url('/assets/bgPeople.png');
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100vw;
    justify-content: space-around;

    h1{
        text-align: center;
        padding: 3vh;
        color: aliceblue;
    }
    .box1{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        margin-top: auto;
        padding: 15px;
        flex-grow: 1;
        min-height: 80vh;
        
    }
    .box2{
        display: flex;
        justify-content: center;
    }
    .div-saida{
        //background-color: aliceblue;
        display: flex;
        justify-content: center;
        
        img{
            width: 8%;
        }
    }
    
    @media (max-width: 1024px) { /* Tablets */
        .box1 {
            flex-direction: column;
        }
    }

    @media (max-width: 768px) { /* Smartphones */
        padding: 10px;

        .box1 {
            justify-content: center;
            padding: 10px;
        }

        h1 {
            font-size: 24px;
        }
        .botaoSair img{
            width: 20%;
        }
    }
`

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    margin: 20px auto;
    //background-color: #161f24;
    padding: 20px;
    border-radius: 20px;
    width: 45%;
    border: 5px solid #57aed1;
    animation: ${fadeIn} 2s ease-in-out;

    .div-icon-agendamento{
        //background-color: #ccc;
        display: flex;
        justify-content: center;
        width: fit-content;

        img{
            width: 20%;
            height: auto;
            transition: 0.3s ease;
        }
    }
    h2{
        color:#57aed1;
        padding: 15px;
        font-size: 35px;
        margin-bottom: 4%;
    }
    
    button{
        font-size: 20px;
        width: fit-content;
        padding: 10px 15px;
        background-color: #57aed1;
        border-radius: 6px;
        color: #161f24;
        border: none;
        margin-top: 10px;
        cursor: pointer;
        transition: 0.3s ease;
        background: linear-gradient(135deg, #57aed1, #233842);
    }
    button:hover{
        background: #233842;
        scale: 1.1;
        border: solid 3px #57aed1;
        color: #57aed1;
    }
    .div-campo{
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: auto;
        select{
            border: none;
            border-radius: 6px;
            margin: 5px;
            width: 95%;
            font-size: 20px;
            background-color: #161f24;
            margin: 5px 0;
            padding: 8px;
            transition: 0.3s ease;
        }
        select:hover{
            scale: 1.05;
            background-color: #233842;
            border: solid 3px #57aed1;
            color: #57aed1;
        }
    }
    
    @media (max-width: 1024px) { /* Tablets */
        padding: 50px;
    
        h2 {
            font-size: 28px;
        }
        
        input, select {
            width: 80%;
        }
    }
    
    @media (max-width: 768px) { /* Smartphones */
        padding: 30px;
        width: 90%;
    
        h2 {
            font-size: 22px;
        }
        
        input, select {
            width: 100%;
        }
    }
`

export const SectAgDetails = styled.section`
    //padding: 20px;
    background-color: #161f24;
    padding: 20px;
    border-radius: 20px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: ${slideInFromLeft} 1s ease forwards;
    width: 45%;

    .div-icon-calendario{
        display: flex;
        justify-content: center;
        background-color: transparent;
        img{
            width: 13%;
            min-width: 80px;
            height: auto;
            background-color: transparent;
        }
    }
    h2{
        color:#57aed1;
        padding: 15px;
        font-size: 35px;
        background-color: transparent;
        text-align: center;
    }
    .div-desc{
        background-color: transparent;
        margin: auto;
        border: #57aed1 solid 5px;
        border-radius: 10px;
        margin: 5%;
        p{
            color: gray;
            font-size: 18px;
            padding: 8px;
            text-align: center;
            background-color: transparent;
            font-weight: 200;
    
        }
        button{
            width: fit-content;
            padding: 10px 15px;
            border-radius: 10px;
            margin: 10px;
            background-color: #57aed1;
            color: #161f24;
            font-size: 20px;
            border: none;
            cursor: pointer;
            transition: 0.3s ease;
            background: linear-gradient(135deg, #57aed1, #233842);
        }
        button:hover{
            background: linear-gradient(345deg,#57aed1, #233842);
            scale: 1.1;
        }
        .box-botoes{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 5%;
            background-color: transparent;
        }
    }

    @media (max-width: 1024px) { /* Tablets */
        padding: 40px;
        width: 90%;
        
        h2 {
            font-size: 30px;
        }
    }

    @media (max-width: 768px) { /* Smartphones */
        padding: 20px;

        h2 {
            font-size: 25px;
            text-align: center;
        }

        p {
            font-size: 18px;
        }

        .boxBotoes {
            flex-direction: column;
            align-items: center;
        }
    }
`

