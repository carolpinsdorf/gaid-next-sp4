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

export default function FormularioAgendamento({ 
    carros = [], 
    oficinas = [], 
    datasHorariosDisponiveis = [], 
    aoCriarAgendamento, 
    agendamentoEditado, 
    setAgendamentoEditado 
}: Props) {
    const [carroSelecionado, setCarroSelecionado] = useState<number | null>(null);
    const [oficinaSelecionada, setOficinaSelecionada] = useState<number | null>(null);
    const [dataHoraSelecionada, setDataHoraSelecionada] = useState<string>('');
    const [servicoSelecionado, setServicoSelecionado] = useState<string>('');

    const servicos = ['Troca de Óleo', 'Limpeza de Bicos Injetores', 'Alinhamento e Balanceamento'];

    useEffect(() => {
        if (agendamentoEditado) {
            setCarroSelecionado(agendamentoEditado.carro?.id ?? null);
            setOficinaSelecionada(agendamentoEditado.oficina?.id ?? null);
            setDataHoraSelecionada(agendamentoEditado.dthoraAgendamento ?? '');
        }
    }, [agendamentoEditado]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const selectedCarro = carros.find(carro => carro.id === carroSelecionado);
        const selectedOficina = oficinas.find(oficina => oficina.id === oficinaSelecionada);

        if (!carroSelecionado || !oficinaSelecionada || !dataHoraSelecionada || !servicoSelecionado) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        if (!selectedCarro || !selectedOficina) {
            alert('Erro ao encontrar carro ou oficina selecionada');
            return;
        }

        const agendamento: Agendamento = {
            id: agendamentoEditado?.id ?? 0,
            dthoraAgendamento: dataHoraSelecionada,
            statusAgendamento: agendamentoEditado?.statusAgendamento ?? 'Confirmado',
            oficina: selectedOficina,
            carro: selectedCarro,
        };

        try {
            aoCriarAgendamento(agendamento);
            resetForm();
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            alert('Erro ao criar agendamento. Tente novamente.');
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
                <Image 
                    src={imgAgendamento} 
                    alt="ícone de agendamento"
                    width={100}
                    height={100}
                />
            </div>
            <h2>{agendamentoEditado ? 'Editar Agendamento' : 'Agendar Serviço'}</h2>

            <div className='div-campo'>
                <label htmlFor="carro">Carro:</label>
                <select 
                    id="carro" 
                    value={carroSelecionado ?? ''} 
                    onChange={e => setCarroSelecionado(e.target.value ? Number(e.target.value) : null)}
                >
                    <option value="">Selecione um carro</option>
                    {carros && carros.length > 0 ? (
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
                <select 
                    id="oficina" 
                    value={oficinaSelecionada ?? ''} 
                    onChange={e => setOficinaSelecionada(e.target.value ? Number(e.target.value) : null)}
                >
                    <option value="">Selecione uma oficina</option>
                    {oficinas && oficinas.map(oficina => (
                        <option key={oficina.id} value={oficina.id}>{oficina.nome}</option>
                    ))}
                </select>
            </div>

            <div className='div-campo'>
                <label htmlFor="dataHora">Data e Hora:</label>
                <select 
                    id="dataHora" 
                    value={dataHoraSelecionada} 
                    onChange={e => setDataHoraSelecionada(e.target.value)}
                >
                    <option value="">Selecione uma data e hora</option>
                    {datasHorariosDisponiveis && datasHorariosDisponiveis.map((dataHora, index) => (
                        <option key={`${dataHora}-${index}`} value={dataHora}>{dataHora}</option>
                    ))}
                </select>
            </div>

            <div className='div-campo'>
                <label htmlFor="servico">Serviço:</label>
                <select 
                    id="servico" 
                    value={servicoSelecionado} 
                    onChange={e => setServicoSelecionado(e.target.value)}
                >
                    <option value="">Selecione um serviço</option>
                    {servicos.map((servico, index) => (
                        <option key={`${servico}-${index}`} value={servico}>{servico}</option>
                    ))}
                </select>
            </div>

            <button 
                type="submit"
                disabled={!carroSelecionado || !oficinaSelecionada || !dataHoraSelecionada || !servicoSelecionado}
            >
                {agendamentoEditado ? 'Salvar Alterações' : 'Agendar'}
            </button>
        </FormStyled>
    );
}
