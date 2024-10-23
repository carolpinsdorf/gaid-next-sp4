'use client';
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

    // Estado para guardar o cliente logado
    const [clienteLogado, setClienteLogado] = useState<Cliente | null>(null);

    // useEffect para carregar o cliente logado do localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cliente = localStorage.getItem('clienteLogado');
            if (cliente) {
                const clienteData: Cliente = JSON.parse(cliente);
                setClienteLogado(clienteData); // Certifique-se de que estamos usando o objeto completo do cliente
            } else {
                console.error('Cliente não está logado, redirecionando para login.');
                navigate.push('/login');
            }
        }
    }, [navigate]);
    

    // useEffect para buscar os carros assim que o cliente logado for definido
    useEffect(() => {
        if (clienteLogado?.id) {
            fetchCarros(clienteLogado.id); // Chama a função para buscar os carros do cliente logado
        }
    }, [clienteLogado]);

    // Função para buscar carros do cliente logado
    const fetchCarros = async (idCliente: number) => {
        try {
            const response = await axios.get<Carro[]>(`http://localhost:3000/api/base-carro?clienteId=${idCliente}`);
            console.log('Carros retornados:', response.data); // Verifique a resposta aqui
            setCarros(response.data);
        } catch (error) {
            console.error('Erro ao buscar carros:', error);
        }
    };
    
    // Função para cadastrar um novo carro
    const handleSubmit = async (novoCarro: Carro) => {
        if (clienteLogado) {
            try {
                const response = await axios.post(`http://localhost:3000/api/base-carro?clienteId=${clienteLogado.id}`, {
                    ...novoCarro
                    // Não precisa passar cliente aqui, pois o clienteId está na URL
                });
                setCarros(prev => [...prev, response.data.carro]); // Use response.data.carro para adicionar o carro correto
            } catch (error) {
                console.error('Erro ao cadastrar carro:', error);
            }
        }
    };


    // Função para editar um carro existente
    const handleEdit = async (carroEditado: Carro) => {
        if (carroEditado.id) {
            try {
                const response = await axios.put(`http://localhost:3000/api/base-carro/${carroEditado.id}`, carroEditado);
                setCarros(prev => prev.map(carro => (carro.id === carroEditado.id ? response.data : carro)));
                setCarroEditado(null); // Reseta o carro editado após a edição
            } catch (error) {
                console.error('Erro ao editar carro:', error);
            }
        }
    };

    // Função para excluir um carro
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/base-carro/${id}`);
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


