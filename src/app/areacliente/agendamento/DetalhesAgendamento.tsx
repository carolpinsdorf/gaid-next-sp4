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
   

    return (
        <SectAgDetails>
            <div className="div-icon-calendario">
                <Image src={imgDetalhes} alt='Ícone de calendário' />
            </div>
            <h2>Agendamentos</h2>
            {agendamentos.length === 0 ? (
                <div className="div-desc">
                    <p>Nenhum agendamento encontrado.</p>
                </div>
            ) : (
                agendamentos.map((agendamento, index) => (
                    <div className='div-desc' key={agendamento.id || index}>
                        <p>Data e Hora: {agendamento.dthoraAgendamento}</p>
                        <p>Status: {agendamento.statusAgendamento}</p>
                        <p>Oficina: {agendamento.oficina?.nome || "Nome não disponível"}</p>
                        <p>Carro: {agendamento.carro?.placa || "Placa não disponível"}</p>
                        <div className='box-botoes'>
                            <button onClick={() => onEdit(agendamento)}>Remarcar</button>
                            <button onClick={() => onDelete(agendamento.id!)}>Deletar</button>
                        </div>
                    </div>
                ))
            )}
        </SectAgDetails>
    );
}




