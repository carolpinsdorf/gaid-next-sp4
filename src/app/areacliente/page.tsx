"use client";
import {MainAreaCliente, Container, Box, BoxImage, Descricao} from './styledAreaCliente';
import Image from 'next/image';
import Link from 'next/link';
import imgGaldi from '@/../public/assets/iconAreaDoCliente.png'
import imgAgendamento from '@/../public/assets/iconAreaDoCliente1.png'
import imgGaragem from '@/../public/assets/iconAreaDoCliente2.png'



export default function AreaCliente(){
    

    return(
        <MainAreaCliente>
            <h1>Área do cliente</h1>
            <Container>
                <Box>
                    <BoxImage>
                        <Image src={imgGaldi} alt="Converse com Galdí" />
                    </BoxImage>
                    <Descricao>
                        <p>Conversar com Galdí</p>
                    </Descricao>
                </Box>
                <Link href={'areacliente/agendamento'}>
                    <Box>
                        <BoxImage>
                            <Image src={imgAgendamento} alt="Agendamentos" />
                        </BoxImage>
                        <Descricao>
                            <p>Meus agendamentos</p>
                        </Descricao>
                    </Box>
                </Link>
                <Link href={'areacliente/garagem'}>
                    <Box>
                        <BoxImage>
                            <Image src={imgGaragem} alt="Visualizar E-Garagem" />
                        </BoxImage>
                        <Descricao>
                            <p>Minha e-Garagem</p>
                        </Descricao>
                    </Box>
                </Link>
            </Container>
        </MainAreaCliente>

    )


}