"use client";
import { useState } from 'react';
import {MainAreaCliente, Container, Box, BoxImage, Descricao} from './styledAreaCliente';
import Image from 'next/image';
import Link from 'next/link';
import imgGaldi from '@/../public/assets/iconAreaDoCliente.png'
import imgAgendamento from '@/../public/assets/iconAreaDoCliente1.png'
import imgGaragem from '@/../public/assets/iconAreaDoCliente2.png'
import WatsonAssistant from '@/components/WatsonAssistant';

export default function AreaCliente(){
    const [showWatson, setShowWatson] = useState(false);

    const handleGaldiClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowWatson(true);
    };

    return(
        <MainAreaCliente>
            <h1>Área do cliente</h1>
            <Container>
                <Box onClick={handleGaldiClick}>
                    <BoxImage>
                        <Image 
                            src={imgGaldi} 
                            alt="Converse com Galdí" 
                            width={100}
                            height={100}
                        />
                    </BoxImage>
                    <Descricao>
                        <p>Conversar com Galdí</p>
                    </Descricao>
                </Box>
                <Link href={'areacliente/agendamento'}>
                    <Box>
                        <BoxImage>
                            <Image 
                                src={imgAgendamento} 
                                alt="Agendamentos" 
                                width={100}
                                height={100}
                            />
                        </BoxImage>
                        <Descricao>
                            <p>Meus agendamentos</p>
                        </Descricao>
                    </Box>
                </Link>
                <Link href={'areacliente/garagem'}>
                    <Box>
                        <BoxImage>
                            <Image 
                                src={imgGaragem} 
                                alt="Visualizar E-Garagem" 
                                width={100}
                                height={100}
                            />
                        </BoxImage>
                        <Descricao>
                            <p>Minha e-Garagem</p>
                        </Descricao>
                    </Box>
                </Link>
            </Container>
            {showWatson && <WatsonAssistant />}
        </MainAreaCliente>
    )
}
