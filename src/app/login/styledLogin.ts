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

export const MainLogin = styled.main`
    width: 100vw;
    height: 100vh;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    
    

    .div-img{
        width: 50vw;
        animation: ${fadeIn} 2s ease-in-out;
        display: flex;

        img{
            width: 70%;
            height: auto;
            opacity: 60%;
            margin: auto;
        }
    }
    @media (max-width: 1024px) {


    }

    .div-login{
        width: 50vw;
        display: flex;
        flex-direction: column;

        h1{
            width: fit-content;
            margin: auto;
            font-size: 2.5vw;
            text-align: center;
            color: #333;
            margin-bottom: 2rem;
            margin-top:2rem;
            color: #3ba8e7;
            animation: ${fadeIn} 2s ease-in-out;
        }
        p, a{
            display: flex;
            //background-color: red;
            width: fit-content;
            margin: auto;
            text-align: center;
            font-size: 20px;
            margin-top: 2rem;
            animation: ${fadeIn} 2s ease-in-out;
        }
        a:hover{
            scale: 1.1;
            transition: 0.3s ease-in-out;
            color: #3ba8e7;
        }
    
        form{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: center;
            margin: auto;
            //background-color: #161f24;
            padding: 20px;
            border-radius: 20px;
            border: 5px solid #57aed1;
            animation: ${fadeIn} 2s ease-in-out;
            width: 80%;
    
            input{
                width: 80%;
                font-size: 20px;
                color: black;
                margin: 2px 0;
                padding: 10px 8px;
                border: 1px solid #ccc;
                background-color: #57aed1;
                border: none;
                border-radius:6px; 
                transition: 0.3s ease;
            }
            input:hover{
                scale: 1.05;
                background-color: #233842;
                border: solid 3px #57aed1;
                color: #57aed1;
            }
            ::placeholder{
                color: #233842;
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
            
            
            @media (max-width: 1024px) { /* Tablets */
                padding: 50px;
                width: 80vw;
                
                
                input, select {
                    width: 80%;
                }
            }
            
            @media (max-width: 768px) { /* Smartphones */
                padding: 30px;
                
                input, select {
                    width: 100%;
                }
            }
        }


    }
    
    @media (max-width:1024px){
        
        .div-login{
            width: 100vw;

            form{
                width: 70%;
            }

        }
        .div-img{
            display: none;
        }

        h1{
            font-size: 25px;
        }
        p{
            width: 80vw;
        }
    }
    @media (max-width:983px){
        .div-login{
            h1{
                font-size: 25px;
            }
        }
    }
    
`;
