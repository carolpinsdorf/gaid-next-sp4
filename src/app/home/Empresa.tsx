import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {EmpresaContainer} from "./styledHome";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';
import Image from 'next/image';
import img1 from '@/../public/assets/person1.png'; 
import img2 from '@/../public/assets/person2.png'; 
import img3 from '@/../public/assets/person3.png'; 
import { useInView } from '@/hooks/useInView';

const profiles = [
    { img: img1, github: 'https://github.com/RafaellSouzaPinto', nome: 'Rafael Souza', frase: 'Apaixonado por tecnologia e focado em desenvolver soluções com impacto positivo.' },
    { img: img2, github: 'https://github.com/carolpinsdorf', nome: 'Carolina Pinsdorf', frase: 'Artista transicionando para o mundo da tecnologia, apaixonada por criar coisas com as próprias mãos' },
    { img: img3, github: 'https://github.com/VictorAntonopoulos', nome:'Victor Antonopoulos', frase: 'Explorando novo horizontes no setor de tecnologia,enfrentando desafios e aproveitando cada etapa' }
];

export const StyledImage = styled(Image)`
    width: 30%;
    height: auto;
    transition: transform 0.5s ease-in-out;
    background-color: transparent;
    
    &:hover {
        transform: scale(1.1);  /* Aumenta a imagem ao passar o mouse */
    }
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.5s ease-in-out;
    height:auto;
    background-color: transparent;

    &:hover {
        z-index: 1; /* Garante que a imagem aumentada fique na frente */
    }
`;

export default function Empresa() {
    const [ref, isInView] = useInView({ threshold: 0.1 });

    return (
        <EmpresaContainer ref={ref} className={isInView ? 'visible' : ''}>
            <div className='div-texto'>
                <h1> Nossa empresa</h1>
            </div>
            <div className="div-carrossel">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}  // Espaço entre os slides
                    slidesPerView={1.05}  // Mostra 2.5 slides por vez
                    navigation
                    
                    loop={true}
                    centeredSlides={false}  // Centraliza o slide ativo
                >
                    {profiles.map((profile, index) => (
                    <StyledSwiperSlide key={index} onClick={() => window.open(profile.github, "_blank")}>
                        <StyledImage src={profile.img} alt={`Pessoa ${index + 1}`} />
                        <div className="div-desc">
                            <div className="nome">{profile.nome}</div>
                            <div className="frase">{profile.frase}</div>
                        </div>
                    </StyledSwiperSlide>
                ))}
                </Swiper>
            </div>
        </EmpresaContainer>
    );
}
