import Image from "next/image";
import bgCardiag from "../assets/hero1.png";
import {CarDiagContainer} from "./styledHome";
import logoPorto from '../assets/logoMarcaPorto.png'
import logoOxigenio from "../assets/logoOxigenio.png"


export default function CarDiag(){

    return(
        <CarDiagContainer>
            <div className="div-texto">
                <p>
                    Otimize seu tempo <br /> com a GAID: a <br /> solução definitiva{" "}
                    <br /> para auto-diagnóstico e <br /> orçamentos
                </p>
                <div className="div-porto">
                    <Image src={logoPorto} alt="Logo Porto Seguro"></Image>
                    <Image src={logoOxigenio} alt="Logo Oxigenio Aceleradora Porto"></Image>
                </div>
            </div>
            <div className="div-img">
                <Image src={bgCardiag} alt="Imagem de carros numa garagem"></Image>
            </div>
        </CarDiagContainer>

    )
}