"use client"
import { useEffect, useState } from "react";
import FormularioAgendamento from "./FormularioAgendamento";
import DetalhesAgendamento from "./DetalhesAgendamento";
import { Agendamento, Carro, Oficina } from "@/types";
import axios from "axios";
import { Container } from "./styledAgend";
import BotaoVoltar from "../botaoVoltar";
import Modal from "@/components/Modal";

export default function Agendamento() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]); // Array de agendamentos
    const [carros, setCarros] = useState<Carro[]>([]);
    const [oficinas, setOficinas] = useState<Oficina[]>([]);
    const [datasHorariosDisponiveis, setDatasHorariosDisponiveis] = useState<string[]>([]);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null); // Agendamento selecionado para edição ou deleção
    const [modalOpen, setModalOpen] = useState(false)


    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const clienteLogado = localStorage.getItem('clienteLogado');
                if (!clienteLogado) {
                    console.error('Nenhum cliente logado encontrado.');
                    return;
                }
        
                const { id } = JSON.parse(clienteLogado);
                const response = await axios.get<Agendamento[]>(`http://localhost:3000/api/base-agendamento?clienteId=${id}`);
                setAgendamentos(response.data); // Use setAgendamentos para definir o estado
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
            }
        };        

        const fetchCarros = async () => {
            try {
                const clienteLogado = localStorage.getItem('clienteLogado');
                if (!clienteLogado) {
                    console.error('Nenhum cliente logado encontrado.');
                    return;
                }

                const { id } = JSON.parse(clienteLogado);
                const response = await axios.get<Carro[]>(`http://localhost:3000/api/base-carro?clienteId=${id}`);
                setCarros(response.data);
            } catch (error) {
                console.error('Erro ao buscar carros:', error);
            }
        };

        const fetchOficinas = async () => {
            try {
                const response = await axios.get<Oficina[]>('http://localhost:3000/api/base-oficinas');
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

        fetchAgendamentos(); // Corrigido para chamar a função correta
        fetchCarros();
        fetchOficinas();
        fetchDatasHorarios();
    }, []);

   const handleSubmit = async (novoAgendamento: Agendamento) => {
        try {
            const response = await axios.post('http://localhost:3000/api/base-agendamento', novoAgendamento);
            setAgendamentos([...agendamentos, response.data]); // Adiciona o novo agendamento
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
        }
    };


    const handleEdit = async (agendamentoEditado: Agendamento) => {
        if (agendamentoEditado.id) {
            try {
                const response = await axios.put(`http://localhost:3000/api/base-agendamento/${agendamentoEditado.id}`, agendamentoEditado);
                const updatedAgendamentos = agendamentos.map((agendamento) => agendamento.id === agendamentoEditado.id ? response.data : agendamento);
                setAgendamentos(updatedAgendamentos);
            } catch (error) {
                console.error('Erro ao editar agendamento:', error);
            }
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/base-agendamento/${id}`);
            setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id)); // Remove o agendamento deletado
            setAgendamentoSelecionado(null);
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
        }
    };

    const formatarDataHora = (dataHora: string): string => {
        const [data, hora] = dataHora.split('T');
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano} ${hora.slice(0, 5)}`;
    };

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
                    agendamentos={agendamentos} // Passa o array de agendamentos
                    onEdit={handleEdit}
                    onDelete={(id) => {
                        setAgendamentoSelecionado(agendamentos.find(a => a.id === id) || null);
                        setModalOpen(true);
                    }}
                />
            </Container>
            <BotaoVoltar/>
            {/* Modal de Exclusão */}
            {modalOpen && (
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => {
                        if (agendamentoSelecionado) {
                            handleDelete(agendamentoSelecionado.id);
                        }
                        setModalOpen(false);
                    }}
                >
                    <p>Tem certeza que deseja excluir este agendamento?</p>
                    <button onClick={() => setModalOpen(false)}>Cancelar</button>
                </Modal>
            )}
        </main>
    );
}
