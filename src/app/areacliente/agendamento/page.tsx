"use client"
import { useEffect, useState } from "react";
import FormularioAgendamento from "./FormularioAgendamento";
import DetalhesAgendamento from "./DetalhesAgendamento";
import type { Agendamento, Carro, Oficina } from "@/types";
import axios from "axios";
import { Container } from "./styledAgend";
import BotaoVoltar from "../botaoVoltar";
import Modal from "@/components/Modal";

export default function Agendamento() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [carros, setCarros] = useState<Carro[]>([]);
    const [oficinas, setOficinas] = useState<Oficina[]>([]);
    const [datasHorariosDisponiveis, setDatasHorariosDisponiveis] = useState<string[]>([]);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getClienteLogado = () => {
        try {
            const clienteLogado = localStorage.getItem('clienteLogado');
            if (!clienteLogado) return null;
            return JSON.parse(clienteLogado);
        } catch (error) {
            console.error('Erro ao obter cliente logado:', error);
            return null;
        }
    };

    const fetchAgendamentos = async () => {
        try {
            const cliente = getClienteLogado();
            if (!cliente?.id) {
                setError('Usuário não está logado');
                return;
            }

            const response = await axios.get<Agendamento[]>(`/api/base-agendamento?clienteId=${cliente.id}`);
            setAgendamentos(response.data || []);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            setError('Erro ao carregar agendamentos');
        }
    };        

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cliente = getClienteLogado();
                if (!cliente?.id) {
                    setError('Usuário não está logado');
                    return;
                }

                const carrosResponse = await axios.get<Carro[]>(`/api/base-carro?clienteId=${cliente.id}`);
                setCarros(carrosResponse.data || []);

                const oficinasResponse = await axios.get<Oficina[]>(`/api/base-oficinas`);
                setOficinas(oficinasResponse.data || []);

                const datasHorarios = [
                    '2024-10-21T14:30',
                    '2024-10-22T10:00',
                    '2024-10-22T15:00',
                ].map(formatarDataHora);
                setDatasHorariosDisponiveis(datasHorarios);

                await fetchAgendamentos();
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setError('Erro ao carregar dados necessários');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (novoAgendamento: Agendamento) => {
        try {
            if (!novoAgendamento) {
                throw new Error('Dados do agendamento inválidos');
            }

            if (agendamentoSelecionado?.id) {
                const response = await axios.put(
                    `/api/base-agendamento/${agendamentoSelecionado.id}`, 
                    novoAgendamento
                );
                
                if (response.data?.agendamento) {
                    setAgendamentos(prev => prev.map(ag => 
                        ag.id === agendamentoSelecionado.id ? response.data.agendamento : ag
                    ));
                    setAgendamentoSelecionado(null);
                    alert("Agendamento atualizado com sucesso!");
                }
            } else {
                const response = await axios.post(`/api/base-agendamento`, novoAgendamento);
                if (response.data?.agendamento) {
                    setAgendamentos(prev => [...prev, response.data.agendamento]);
                    alert("Novo agendamento criado com sucesso!");
                }
            }
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
            alert("Erro ao salvar agendamento. Por favor, tente novamente.");
        }
    };

    const handleEdit = (agendamento: Agendamento) => {
        if (!agendamento?.id) return;
        setAgendamentoSelecionado(agendamento);
    };

    const handleDelete = async (id: number) => {
        if (!id) return;
        
        try {
            const response = await axios.delete(`/api/base-agendamento/${id}`);
            if (response.data?.success) {
                setAgendamentos(prev => prev.filter(agendamento => agendamento.id !== id));
                setAgendamentoSelecionado(null);
                setModalOpen(false);
                alert("Agendamento deletado com sucesso!");
            } else {
                throw new Error(response.data?.message || 'Erro ao excluir agendamento');
            }
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
            alert("Erro ao excluir agendamento. Por favor, tente novamente.");
        }
    };

    const formatarDataHora = (dataHora: string): string => {
        try {
            const [data, hora] = dataHora.split('T');
            const [ano, mes, dia] = data.split('-');
            return `${dia}/${mes}/${ano} ${hora.slice(0, 5)}`;
        } catch (error) {
            console.error('Erro ao formatar data/hora:', error);
            return dataHora;
        }
    };

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <main>
            <Container>
                <FormularioAgendamento
                    carros={carros}
                    oficinas={oficinas}
                    datasHorariosDisponiveis={datasHorariosDisponiveis}
                    aoCriarAgendamento={handleSubmit}
                    agendamentoEditado={agendamentoSelecionado}
                    setAgendamentoEditado={setAgendamentoSelecionado}
                />
                <DetalhesAgendamento
                    agendamentos={agendamentos}
                    onEdit={handleEdit}
                    onDelete={(id) => {
                        const agendamento = agendamentos.find(a => a.id === id);
                        if (agendamento) {
                            setAgendamentoSelecionado(agendamento);
                            setModalOpen(true);
                        }
                    }}
                />
            </Container>
            <BotaoVoltar/>

            {modalOpen && agendamentoSelecionado?.id && (
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => agendamentoSelecionado.id && handleDelete(agendamentoSelecionado.id)}
                >
                    <p>Tem certeza que deseja excluir este agendamento?</p>
                </Modal>
            )}
        </main>
    );
}
