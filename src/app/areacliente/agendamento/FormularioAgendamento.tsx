import { useState, useEffect } from 'react';
import { FormStyled } from './styledAgend'; 
import { Agendamento, Carro, Oficina } from '@/types'; 
import Image from 'next/image';
import imgAgendamento from '@/../public/assets/iconAreaDoCliente1.png';

type Props = {
    carros: Carro[];
    oficinas: Oficina[];
    datasHorariosDisponiveis: string[];
    aoCriarAgendamento: (agendamento: Agendamento) => void;
    agendamentoEditado: Agendamento | null;
    setAgendamentoEditado: (agendamento: Agendamento | null) => void;
}

export default function FormularioAgendamento({ carros, oficinas, datasHorariosDisponiveis, aoCriarAgendamento, agendamentoEditado, setAgendamentoEditado }: Props) {
    const [carroSelecionado, setCarroSelecionado] = useState<number | null>(null);
    const [oficinaSelecionada, setOficinaSelecionada] = useState<number | null>(null);
    const [dataHoraSelecionada, setDataHoraSelecionada] = useState<string>('');
    const [servicoSelecionado, setServicoSelecionado] = useState<string>('');

    const servicos = ['Troca de Óleo', 'Limpeza de Bicos Injetores', 'Alinhamento e Balanceamento']; // Exemplo de serviços

    useEffect(() => {
        if (agendamentoEditado) {
            setCarroSelecionado(agendamentoEditado.carro.id);
            setOficinaSelecionada(agendamentoEditado.oficina.id);
            setDataHoraSelecionada(agendamentoEditado.dthoraAgendamento);
        }
    }, [agendamentoEditado]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (carroSelecionado && oficinaSelecionada && dataHoraSelecionada && servicoSelecionado) {
            const agendamento: Agendamento = {
                id: agendamentoEditado?.id || 0,
                dthoraAgendamento: dataHoraSelecionada,
                statusAgendamento: agendamentoEditado?.statusAgendamento || 'Confirmado',
                oficina: oficinas.find(oficina => oficina.id === oficinaSelecionada)!,
                carro: carros.find(carro => carro.id === carroSelecionado)!,
            };
            aoCriarAgendamento(agendamento);
            resetForm();
        }
    };

    const resetForm = () => {
        setCarroSelecionado(null);
        setOficinaSelecionada(null);
        setDataHoraSelecionada('');
        setServicoSelecionado('');
        setAgendamentoEditado(null);
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className='div-icon-agendamento'>
                <Image src={imgAgendamento} alt="ícone de agendamento" />
            </div>
            <h2>{agendamentoEditado ? 'Editar Agendamento' : 'Agendar Serviço'}</h2>

            <div className='div-campo'>
                <label htmlFor="carro">Carro:</label>
                <select id="carro" value={carroSelecionado || ''} onChange={e => setCarroSelecionado(Number(e.target.value))}>
                    <option value="">Selecione um carro</option>
                    {carros.length > 0 ? (
                        carros.map(carro => (
                            <option key={carro.id} value={carro.id}>{carro.placa}</option>
                        ))
                    ) : (
                        <option disabled>Sem carros cadastrados</option>
                    )}
                </select>
            </div>

            <div className='div-campo'>
                <label htmlFor="oficina">Oficina:</label>
                <select id="oficina" value={oficinaSelecionada || ''} onChange={e => setOficinaSelecionada(Number(e.target.value))}>
                    <option value="">Selecione uma oficina</option>
                    {oficinas.map(oficina => (
                        <option key={oficina.id} value={oficina.id}>{oficina.nome}</option>
                    ))}
                </select>
            </div>

            <div className='div-campo'>
                <label htmlFor="dataHora">Data e Hora:</label>
                <select id="dataHora" value={dataHoraSelecionada} onChange={e => setDataHoraSelecionada(e.target.value)}>
                    <option value="">Selecione uma data e hora</option>
                    {datasHorariosDisponiveis.map((dataHora, index) => (
                        <option key={index} value={dataHora}>{dataHora}</option>
                    ))}
                </select>
            </div>

            <div className='div-campo'>
                <label htmlFor="servico">Serviço:</label>
                <select id="servico" value={servicoSelecionado} onChange={e => setServicoSelecionado(e.target.value)}>
                    <option value="">Selecione um serviço</option>
                    {servicos.map((servico, index) => (
                        <option key={index} value={servico}>{servico}</option>
                    ))}
                </select>
            </div>

            <button type="submit">{agendamentoEditado ? 'Salvar Alterações' : 'Agendar'}</button>
        </FormStyled>
    );
}
