import React from 'react';
import {styled,keyframes} from 'styled-components';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void; // Para confirmar a ação
    children: React.ReactNode;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Overlay = styled.div<{ open: boolean }>`
    display: ${({ open }) => (open ? 'flex' : 'none')};
    position: fixed;
    inset: 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
`;

const ModalContainer = styled.div<{ open: boolean }>`
    animation: ${fadeIn} 0.5s ease-in-out;
    //background-color: white;
    display: flex;
    flex-direction: column;
    //flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-shadow: 0 14px 25px #000;
    width: 50%;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: ${({ open }) => (open ? 'scale(1)' : 'scale(1.1)')};
    opacity: ${({ open }) => (open ? 1 : 0)};
    transition: transform 0.3s, opacity 0.3s;
    p{
        margin-top: 3rem;
        font-weight: 200;
        color: #9e9e9e;
    }
    @media (max-width: 1024px){
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }        
    
`;

const CloseButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #aaa;
    &:hover {
        color: #000;
    }
`;

const ConfirmButton = styled.button`
    margin-top: 16px auto;
    background-color: #007bff;
    color: #007bff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

export default function Modal({ open, onClose, onConfirm, children }: ModalProps) {
    return (
        <Overlay open={open} onClick={onClose}>
            <ModalContainer open={open} onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>X</CloseButton>
                {children}
                <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
            </ModalContainer>
        </Overlay>
    );
}
