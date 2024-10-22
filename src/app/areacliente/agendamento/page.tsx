"use client";
import { useEffect, useState } from "react";
import FormularioAgendamento from "./FormularioAgendamento";
import DetalhesAgendamento from "./DetalhesAgendamento";
import { Agendamento, Carro, Oficina } from "@/types"; 
import axios from "axios";
import { Container } from "./styledAgend";
import BotaoVoltar from "../botaoVoltar";

export default function Agendamento() {
    const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
    const [carros, setCarros] = useState<Carro[]>([]);
    const [oficinas, setOficinas] = useState<Oficina[]>([]);
    const [datasHorariosDisponiveis, setDatasHorariosDisponiveis] = useState<string[]>([]);

    useEffect(() => {
        const fetchCarros = async () => {
            try {
                const response = await axios.get<Carro[]>('/api/carros'); // Alterar a URL da API
                setCarros(response.data);
            } catch (error) {
                console.error('Erro ao buscar carros:', error);
            }
        };

        const fetchOficinas = async () => {
            try {
                const response = await axios.get<Oficina[]>('/api/oficinas'); // Alterar a URL da API
                setOficinas(response.data);
            } catch (error) {
                console.error('Erro ao buscar oficinas:', error);
            }
        };

        const fetchDatasHorarios = async () => {
            const datasHorarios = [
                '2024-10-21T14:30',
                '2024-10-22T10:00',
                '2024-10-22T15:00',
            ];
            const datasFormatadas = datasHorarios.map(formatarDataHora);
            setDatasHorariosDisponiveis(datasFormatadas);
        };

        fetchCarros();
        fetchOficinas();
        fetchDatasHorarios();
    }, []); 

    const handleSubmit = async (novoAgendamento: Agendamento) => {
        try {
            const response = await axios.post('/api/agendamentos', novoAgendamento); // Alterar URL da API
            setAgendamento(response.data);
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
        }
    };

    const handleEdit = async (agendamentoEditado: Agendamento) => {
        if (agendamentoEditado.id) {
            try {
                const response = await axios.put(`/api/agendamentos/${agendamentoEditado.id}`, agendamentoEditado);
                alert('Agendamento editado com sucesso.');
                setAgendamento(response.data);
            } catch (error) {
                console.error('Erro ao editar agendamento:', error);
            }
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/agendamentos/${id}`); // Ajustar a URL 
            alert('Agendamento excluído com sucesso.');
            setAgendamento(null); // Reseta o agendamento após a exclusão
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
        }
    };

    const formatarDataHora = (dataHora: string): string => {
        const [data, hora] = dataHora.split('T');
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano} ${hora.slice(0, 5)}`; 
    };

    const agendamentoFake: Agendamento = {
        dthoraAgendamento: '2024-10-21T14:30',
        statusAgendamento: 'Confirmado',
        oficina: {
            id: 1,
            nome: 'Oficina Teste',
            cnpj: '12.345.678/0001-95',
            acesso: {
                id: 1,
                emailAcesso: 'teste@oficina.com',
                username: 'oficina_teste',
                senha: 'senha123',
            },
        },
        carro: {
            id: 1,
            placa: 'ABC1D23',
            marca: 'Fusca',
            modelo: 'Fusca 1975',
            anoFabricacao: 1975,
            cliente: {
                id: 1,
                cpfCliente: '123.456.789-00',
                nomeCliente: 'João da Silva',
                dataNascimento: '1990-01-01',
                acesso: {
                    id: 1,
                    emailAcesso: 'joao@teste.com',
                    username: 'joao123',
                    senha: 'senha123',
                },
            },
        },
    };

    useEffect(() => {
        setAgendamento(agendamentoFake);
    }, []);

    return (
        <main>
            <Container>
                <FormularioAgendamento
                    carros={carros}
                    oficinas={oficinas}
                    datasHorariosDisponiveis={datasHorariosDisponiveis}
                    aoCriarAgendamento={handleSubmit}
                />
                <DetalhesAgendamento
                    agendamento={agendamento}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Container>
            <BotaoVoltar/>
        </main>
    );
}



