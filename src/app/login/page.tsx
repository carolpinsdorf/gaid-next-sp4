"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Acesso, ApiResponse } from '@/types';
import Link from 'next/link';
import {MainLogin} from './styledLogin'

export default function Login() {
    // Usando o tipo Acesso para tipar os campos de login
    const [acesso, setAcesso] = useState<Acesso>({
        emailAcesso: '', // Não vai ser usado no login
        username: '',
        senha: '',
    });
    
    const [mensagem, setMensagem] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAcesso({ ...acesso, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        const response = await axios.get<ApiResponse>(`URL_DA_API/login`, {
            params: {
                username: acesso.username,
                senha: acesso.senha,
            },
        });

        if (response.data.success) {
            setMensagem('Login realizado com sucesso!');
        } else {
            setMensagem(`Erro: ${response.data.message}`);
        }
        } catch (error) {
        setMensagem('Erro ao conectar com a API.');
        }
    };

    return (
        <MainLogin>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={acesso.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="senha"
                    value={acesso.senha}
                    onChange={handleInputChange}
                    placeholder="Senha"
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
            <div className='div-cadastro'>
                <p>Não tem uma conta?</p>
                <Link href={'/cadastro'}>Cadastre-se</Link>
            </div>
        </MainLogin>
    );
}
