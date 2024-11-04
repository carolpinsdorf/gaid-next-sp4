import iconGaldi from "@/../public/assets/iconGaldi.png"
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
                    Em uma breve conversa o <span style={{ color: "#3caaea", fontWeight: "500" }}>Galdí</span>, você pode <span style={{ color: "#3caaea" }}>dianosticar</span> seu problema, <span style={{ color: "#3caaea" }}>orçar</span> o reparo e <span style={{ color: "#3caaea" }}>agendá-lo</span>.
                    <br/> Tudo em questão de segundos
                </p>
            </div>

        </GaldiContainer>
    )
}
