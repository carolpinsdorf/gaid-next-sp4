import Image from "next/image";
import iconCall from "../../../public/assets/iconCall.png"
import iconMail from "@/../public/assets/iconEmail.png"
import iconeShop from "@/../public/assets/iconShop.png"
import {SuporteContainer} from './styledHome'
import { useInView } from '@/hooks/useInView';

export default function Suporte(){
    const [ref, isInView] = useInView({ threshold: 0.1 });
   
    return (
        <SuporteContainer ref={ref} className={isInView ? 'visible' : ''}>
            <h1>Suporte ao cliente</h1>
            <div className="div-box">
            <div className="div-telefone">
                <div className="div-img">
                    <Image src={iconCall} alt="icone do Call Center" ></Image>
                </div>
                <div className="div-texto">
                    <p> Esquecemos de algum detalhe? <br /> Ligue para <span style={{ color: "#3caaea" }}>(11)1234-5678 </span><br /> Queremos conversar </p>
                </div>
            </div>
            <div className="div-email">
                <div className="div-img">
                    <Image src={iconMail} alt="icone para central de email"></Image>
                </div>
                <div className="div-texto">
                    <p>Dúvidas mais técnicas? <br /> Enviei um email para <br />  <span style={{ color: "#3caaea", textDecoration:"underline" }}>faleconosco@gaid.com.br</span> </p>
                </div>
            </div>
            <div className="div-loja">
                <div className="div-img">
                    <Image src={iconeShop} alt="icone de loja"></Image>
                </div>
                <div className="div-texto">
                    <p> Interessado em adquirir o seu? <br /> <span style={{ color: "#3caaea" }}>Visite a nossa loja</span> <br /> Av Paulista, 1009 - São Paulo, SP</p>
                </div>
            </div>
            </div>
        </SuporteContainer>
    );
};
  

  
