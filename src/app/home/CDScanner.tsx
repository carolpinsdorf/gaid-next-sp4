import imgCDScanner from '@/../public/assets/hero3.png'
import Image from 'next/image'
import {CDScannerContainer} from "./styledHome"
import { useInView } from '@/hooks/useInView';

export default function CDScanner(){
    const [ref, isInView] = useInView({ threshold: 0.1 });

    return(
        <CDScannerContainer ref={ref} className={isInView ? 'visible' : ''}>
            <div className="div-texto">
                <p>
                        O <span style={{ color: "#3caaea", fontWeight: "500" }}>CarDiag Scanner</span> é como um médico para o seu carro. <br />
                    Conecte-o ao veículo e deixe-o cuidar da <span style={{ color: "#3caaea" }}>saúde automotiva</span>. Ele <span style={{ color: "#3caaea" }}>monitora constantemente</span>, identificando problemas antes que se tornem grandes
                    preocupações.
                </p>
            </div>
            <div className="div-img">
                <Image src={imgCDScanner} alt='Protótipo do CD Scanner'></Image>
            </div>
        </CDScannerContainer>
    )
}
