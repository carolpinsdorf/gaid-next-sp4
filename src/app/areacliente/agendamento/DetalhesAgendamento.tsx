import { SectAgDetails } from './styledAgend';
import { Agendamento } from '@/types';
import Image from 'next/image';
import imgDetalhes from '@/../public/assets/iconCalendario.png';

type Props = {
    agendamentos: Agendamento[]; // Recebe um array de agendamentos
    onEdit: (agendamento: Agendamento) => void; 
    onDelete: (id: number) => void; 
};

export default function DetalhesAgendamento({ agendamentos, onEdit, onDelete }: Props) {

    const formatarDataHora = (dataHora: string): string => {
        if (!dataHora) {
            return 'Data e hora não disponíveis'; // Mensagem se dataHora não for válida
        }
        
        const [data, hora] = dataHora.split('T');
        if (!data || !hora) {
            return 'Data e hora inválidas'; // Mensagem se a divisão não retornar valores esperados
        }

        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano} ${hora.slice(0, 5)}`;
    };

    return (
        <SectAgDetails>
            <div className="div-icon-calendario">
                <Image src={imgDetalhes} alt='Ícone de calendário' />
            </div>
            <h2>Agendamentos</h2>
            {agendamentos.map((agendamento) => (
                <div className='div-desc' key={agendamento.id}>
                    <p>Data e Hora: {formatarDataHora(agendamento.dthoraAgendamento)}</p>
                    <p>Status: {agendamento.statusAgendamento}</p>
                    <p>Oficina: {agendamento.oficina.nome}</p>
                    <p>Carro: {agendamento.carro.placa}</p>
                    <div className='box-botoes'>
                        <button onClick={() => onEdit(agendamento)}>Remarcar</button>
                        <button onClick={() => onDelete(agendamento.id)}>Deletar</button>
                    </div>
                </div>
            ))}
        </SectAgDetails>
    );
}



