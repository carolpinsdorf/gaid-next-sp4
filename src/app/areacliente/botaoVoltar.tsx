import Link from 'next/link';
import styled from 'styled-components';

const BotaoStyled = styled.div`

    width: fit-content;
    padding: 10px 15px;
    border-radius: 10px;
    margin: 10px;
    border: solid 2px #57aed1;
    color: #161f24;
    font-size: 20px;
    border: none;
    cursor: pointer;
    transition: 0.3s ease;
    background: linear-gradient(135deg, #57aed1, #233842);
    margin: 1rem auto;
    a{
        text-decoration: none;
        background-color: transparent;
    }

    &:hover {
        background: linear-gradient(345deg,#57aed1, #233842);
        scale: 1.1;
    }
`;

export default function BotaoVoltar() {
    return (
        <BotaoStyled>
            <Link href="/areacliente">Voltar</Link>
        </BotaoStyled>
    );
}
