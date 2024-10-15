"use client"
import React, { useState } from 'react';
import { Cliente } from '@/types';
import axios from 'axios';
import { ApiResponse } from '@/types';
import { useRouter } from 'next/navigation';
import {MainCadastro} from './styledCad'

export default function Cadastro() {

    const navigate = useRouter()

    const [cliente, setCliente] = useState<Cliente>({
        cpfCliente: '',
        nomeCliente: '',
        dataNascimento: '',
        acesso: {
        emailAcesso: '',
        username: '',
        senha: '',
        },
    });

    const [mensagem, setMensagem] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('acesso.')) {
        const accessField = name.split('.')[1];
        setCliente({
            ...cliente,
            acesso: { ...cliente.acesso, [accessField]: value },
        });
        } else {
        setCliente({ ...cliente, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const response = await axios.post<ApiResponse>('URL_DA_API/clientes', cliente);
            if (response.data.success) {
                alert('Cliente cadastrado com sucesso!');
                setCliente({
                    cpfCliente: '',
                    nomeCliente: '',
                    dataNascimento: '',
                    acesso: {
                        emailAcesso: '',
                        username: '',
                        senha: '',
                    },
                }); // Limpa o formulário
                navigate.push('/login')
            } else {
                setMensagem(`Erro: ${response.data.message}`);
            }
        } catch (error) {
            setMensagem('Erro ao conectar com a API.');
        }
    };

  return (
        <MainCadastro>
            <h1>Realizar Cadastro</h1>
            <p>Ao se cadastrar você concorda com os nossos <span style={{ color: "#3caaea" ,textDecoration: "underline" }}>Termos, Políticas de privacidade e política de cookies</span>
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="cpfCliente"
                    value={cliente.cpfCliente}
                    onChange={handleInputChange}
                    placeholder="CPF"
                    required
                />
                <input
                    type="text"
                    name="nomeCliente"
                    value={cliente.nomeCliente}
                    onChange={handleInputChange}
                    placeholder="Nome"
                    required
                />
                <input
                    type="date"
                    name="dataNascimento"
                    value={cliente.dataNascimento}
                    onChange={handleInputChange}
                    placeholder="Data de Nascimento"
                    required
                />

                {/* Campos de Acesso */}
                <input
                    type="email"
                    name="acesso.emailAcesso"
                    value={cliente.acesso.emailAcesso}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="acesso.username"
                    value={cliente.acesso.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="acesso.senha"
                    value={cliente.acesso.senha}
                    onChange={handleInputChange}
                    placeholder="Senha"
                    required
                />

                <button type="submit">Cadastrar</button>
            </form>

            {mensagem && <p>{mensagem}</p>}
        </MainCadastro>
    );
};

