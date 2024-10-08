import imgCDScanner from '../assets/hero3.png'
import Image from 'next/image'
import {CDScannerContainer} from "./styledHome"

export default function CDScanner(){

    return(
        <CDScannerContainer>
            <div className="div-texto">
                <p>
                        O CarDiag Scanner é como um médico <br /> para o seu carro. <br />
                    Conecte-o ao veículo e deixe-o cuidar da <br />
                    saúde automotiva. <br />
                    Ele monitora constantemente, <br />
                    identificando problemas antes que se <br /> tornem grandes
                    preocupações.
                </p>
            </div>
            <div className="div-img">
                <Image src={imgCDScanner} alt='Protótipo do CD Scanner'></Image>
            </div>
        </CDScannerContainer>
    )
}