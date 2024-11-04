"use client"
import { useEffect, useState } from "react";
import { Carro, Cliente } from "@/types";
import axios from "axios";
import { Container, MainGaragem } from "./styledGaragem";
import FormularioCarro from "./FormularioCarro";
import ListaCarros from "./ListaCarros";
import BotaoVoltar from "../botaoVoltar";
import { useRouter } from "next/navigation";

export default function Garagem() {
    const [carros, setCarros] = useState<Carro[]>([]);
    const [carroEditado, setCarroEditado] = useState<Carro | null>(null);
    const navigate = useRouter();
    const [clienteLogado, setClienteLogado] = useState<Cliente | null>(null);

    useEffect(() => {
        const cliente = localStorage.getItem('clienteLogado');
        if (cliente) {
            const clienteData: Cliente = JSON.parse(cliente);
            setClienteLogado(clienteData);
        } else {
            navigate.push('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (clienteLogado?.id) {
            fetchCarros(clienteLogado.id);
        }
    }, [clienteLogado]);

    const fetchCarros = async (idCliente: number) => {
        try {
            const response = await axios.get<Carro[]>(`/api/base-carro?clienteId=${idCliente}`);
            setCarros(response.data);
        } catch (error) {
            console.error('Erro ao buscar carros:', error);
        }
    };

    const handleSubmit = async (novoCarro: Carro) => {
        try {
            if (carroEditado) {
                const response = await axios.put(`/api/base-carro/${carroEditado.id}`, novoCarro);
                setCarros(prev => prev.map(carro => (carro.id === carroEditado.id ? response.data.carro : carro)));
            } else {
                const response = await axios.post(`/api/base-carro?clienteId=${clienteLogado?.id}`, novoCarro);
                setCarros(prev => [...prev, response.data.carro]);
            }
            setCarroEditado(null);
        } catch (error) {
            console.error('Erro ao salvar carro:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/base-carro?id=${id}`);
            setCarros(prev => prev.filter(carro => carro.id !== id));
        } catch (error) {
            console.error('Erro ao excluir carro:', error);
        }
    };

    return (
        <MainGaragem>
            <Container>
                <FormularioCarro aoCadastrarCarro={handleSubmit} carroEditado={carroEditado} setCarroEditado={setCarroEditado} />
                <ListaCarros carros={carros} onEdit={setCarroEditado} onDelete={handleDelete} />
            </Container>
            <BotaoVoltar />
        </MainGaragem>
    );
}




