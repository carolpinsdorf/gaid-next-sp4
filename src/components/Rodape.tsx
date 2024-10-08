"use client";
import {FooterContainer} from '../components/styled'

export default function Rodape(){

    return(
        <FooterContainer>
            <div>
                <p>Política de privacidade</p>
                <p>Termos de uso</p>
                <p>Av. Paulista, 1009 - São Paulo, SP </p>
            </div>
            <div>
                <p>&copy; {new Date().getFullYear()} Gaid. Todos os direitos reservados.</p>
            </div>
        </FooterContainer>
    )
}