import React from 'react';
import { styled, keyframes } from 'styled-components';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000; /* Certifique-se de que o modal está acima de outros elementos */
`;

const ModalContainer = styled.div<{ open: boolean }>`
    animation: ${fadeIn} 0.3s ease-in-out;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 50%;
    border-radius: 8px;
    padding: 16px;
    opacity: ${({ open }) => (open ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
    position: relative;

    p {
        margin-top: 1rem;
        font-weight: 400;
        color: #9e9e9e;
    }

    @media (max-width: 1024px) {
        width: 80%;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
    &:hover {
        color: #333;
    }
`;

const ConfirmButton = styled.button`
    margin-top: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    &:hover {
        background-color: #1f4873;
        scale: 1.1;
    }
`;

const CancelButton = styled.button`
    margin-top: 16px;
    margin-left: 8px;
    background-color: #ad0f04;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    &:hover {
        background-color: #a31414;
        scale: 1.1;
    }
`;

export default function Modal({ open, onClose, onConfirm, children }: ModalProps) {
    return (
        <Overlay open={open} onClick={onClose}>
            <ModalContainer open={open} onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>X</CloseButton>
                {children}
                <div>
                    <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
                    <CancelButton onClick={onClose}>Cancelar</CancelButton>
                </div>
            </ModalContainer>
        </Overlay>
    );
}

