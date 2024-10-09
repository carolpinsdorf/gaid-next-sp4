
import Image from "next/image";
import iconCall from "../assets/iconCall.png"
import iconMail from "../assets/iconEmail.png"
import iconeShop from "../assets/iconShop.png"
import {SuporteContainer} from './styledHome'

export default function Suporte(){
   
    return (
        <SuporteContainer>
            <h1>Suporte ao cliente</h1>
            <div className="div-box">
            <div className="div-telefone">
                <div className="div-img">
                    <Image src={iconCall} alt="icone do Call Center" ></Image>
                </div>
                <div className="div-texto">
                    <p> Esquecemos de algum detalhe? <br /> Ligue para (11)1234-5678 <br /> Queremos conversar </p>
                </div>
            </div>
            <div className="div-email">
                <div className="div-img">
                    <Image src={iconMail} alt="icone para central de email"></Image>
                </div>
                <div className="div-texto">
                    <p>Dúvidas mais técnicas? <br /> Enviei um email para <br /> faleconosco@gaid.com.br </p>
                </div>
            </div>
            <div className="div-loja">
                <div className="div-img">
                    <Image src={iconeShop} alt="icone de loja"></Image>
                </div>
                <div className="div-texto">
                    <p> Interessado em adquirir o seu? <br /> Visite a nossa loja <br /> Av Paulista, 1009 - São Paulo, SP</p>
                </div>
            </div>
            </div>
        </SuporteContainer>
    );
};
  

  