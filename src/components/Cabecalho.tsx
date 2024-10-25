'use client'
import {HeaderContainer} from './styled'
import Image from 'next/image'; 
import Link from 'next/link';
import logoGaid from '@/../public/assets/logohr.png';
import loginIcon from '@/../public/assets/iconLogin.png';



export default function Cabecalho() {
  return (
    <HeaderContainer>
      <div className='div-logoGaid'>
        <Link href="/">
            <Image src={logoGaid} alt="Logo da empresa" priority/>
        </Link>
      
      </div>
      
      <div>
        <Link href="/login" target="_blank" rel="noopener noreferrer">
            <Image src={loginIcon} alt="Login"/>
        </Link>
      </div>
    </HeaderContainer>
  );
}
