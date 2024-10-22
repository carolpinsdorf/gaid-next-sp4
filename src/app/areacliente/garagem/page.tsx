"use client";
import { useEffect, useState } from "react";
import { Carro, Cliente } from "@/types"; 
import axios from "axios";
import { Container, MainGaragem } from "./styledGaragem"; 
import FormularioCarro from "./FormularioCarro";
import ListaCarros from "./ListaCarros"; 
import BotaoVoltar from "../botaoVoltar";

export default function Garagem() {
    const [carros, setCarros] = useState<Carro[]>([]);
    const [carroEditado, setCarroEditado] = useState<Carro | null>(null);

    useEffect(() => {
        fetchCarros();
    }, []);

    const fetchCarros = async () => {
        try {
            const response = await axios.get<Carro[]>('/api/carros'); // Ajuste a URL da API
            setCarros(response.data);
        } catch (error) {
            console.error('Erro ao buscar carros:', error);
        }
    };

    const handleSubmit = async (novoCarro: Carro) => {
        try {
            const response = await axios.post('/api/carros', novoCarro); // Ajuste a URL da API
            setCarros(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Erro ao cadastrar carro:', error);
        }
    };

    const handleEdit = async (carroEditado: Carro) => {
        if (carroEditado.id) {
            try {
                const response = await axios.put(`/api/carros/${carroEditado.id}`, carroEditado);
                setCarros(prev => prev.map(carro => (carro.id === carroEditado.id ? response.data : carro)));
                setCarroEditado(null); // Reseta o carro editado
            } catch (error) {
                console.error('Erro ao editar carro:', error);
            }
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/carros/${id}`); // Ajustar a URL da API
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
