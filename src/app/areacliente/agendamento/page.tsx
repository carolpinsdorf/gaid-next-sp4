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

    useEffect(() => {

        fetchAgendamentos();

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

        fetchAgendamentos(); 
        fetchCarros();
        fetchOficinas();
        fetchDatasHorarios();
    }, []);

   const handleSubmit = async (novoAgendamento: Agendamento) => {
        try {
            if (agendamentoSelecionado) {
                // Edição
                const response = await axios.put(`http://localhost:3000/api/base-agendamento/${agendamentoSelecionado.id}`, novoAgendamento);
                setAgendamentos(prev => prev.map(ag => ag.id === agendamentoSelecionado.id ? response.data.agendamento : ag));
                setAgendamentoSelecionado(null);
                alert("Agendamento atualizado com sucesso!");
            } else {
                // Criação
                const response = await axios.post('http://localhost:3000/api/base-agendamento', novoAgendamento);
                setAgendamentos(prev => [...prev, response.data.agendamento]);
                alert("Novo agendamento criado com sucesso!");
            }
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
            alert("Erro ao salvar agendamento. Por favor, tente novamente.");
        }
    };

    const handleEdit = (agendamento: Agendamento) => {
        setAgendamentoSelecionado(agendamento);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/base-agendamento/${id}`);
            if (response.data.success) {
                setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id));
                setAgendamentoSelecionado(null);
                setModalOpen(false);
                alert("Agendamento deletado com sucesso!"); // Adicionado alerta de sucesso
            } else {
                console.error('Erro ao excluir agendamento:', response.data.message);
                alert("Erro ao excluir agendamento. Por favor, tente novamente."); // Alerta de erro
            }
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
            alert("Erro ao excluir agendamento. Por favor, tente novamente."); // Alerta de erro
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
                    agendamentoEditado={agendamentoSelecionado}
                    setAgendamentoEditado={setAgendamentoSelecionado}
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
            {modalOpen && agendamentoSelecionado && (
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => handleDelete(agendamentoSelecionado.id)}
                >
                    <p>Tem certeza que deseja excluir este agendamento?</p>
                </Modal>
            )}
        </main>
    );
}
