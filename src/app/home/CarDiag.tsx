import Image from "next/image";
import bgCardiag from "@/../public/assets/hero1.png";
import {CarDiagContainer} from "./styledHome";
import logoPorto from '@/../public/assets/logoMarcaPorto.png'
import logoOxigenio from "@/../public/assets/logoOxigenio.png"

export default function CarDiag(){

    return(
        <CarDiagContainer>
            <div className="div-texto">
                <p>
                    Otimize seu tempo <br /> com a <span style={{ color: "#3caaea", fontWeight: "500" }}>GAID</span>: a <br /> solução definitiva{" "}
                    <br /> para <span style={{ color: "#3caaea" }}>auto-diagnóstico</span> e <br /> <span style={{ color: "#3caaea" }}>orçamentos</span>
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