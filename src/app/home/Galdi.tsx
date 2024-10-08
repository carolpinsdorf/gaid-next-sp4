import iconGaldi from "../assets/iconGaldi.png"
import {GaldiContainer} from './styledHome'
import Image from "next/image"


export default function Galdi(){


    return(
        <GaldiContainer>
            <div className='div-video'>
                <video autoPlay loop muted playsInline>
                    <source src="/videos/chatGaldi.mp4" type="video/mp4" />
                </video>
            </div>

            <div className='div-img'>
                <Image src={iconGaldi} alt="Icone robô Galdi"></Image>
            </div>

            <div className="div-p">
                <p>
                    Em uma breve conversa o Galdí, você pode dianosticar seu problema, orçar o reparo e agendá-lo.
                    <br/> Tudo em questão de segundos
                </p>
            </div>

        </GaldiContainer>
    )

}