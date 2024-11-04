import { SectAgDetails } from './styledAgend';
import { Agendamento } from '@/types';
import Image from 'next/image';
import imgDetalhes from '@/../public/assets/iconCalendario.png';

type Props = {
    agendamentos: Agendamento[];
    onEdit: (agendamento: Agendamento) => void;
    onDelete: (id: number) => void;
};

export default function DetalhesAgendamento({ agendamentos = [], onEdit, onDelete }: Props) {
    // Verifica se agendamentos existe e é um array
    if (!Array.isArray(agendamentos)) {
        return (
            <SectAgDetails>
                <div className="div-icon-calendario">
                    <Image 
                        src={imgDetalhes} 
                        alt='Ícone de calendário'
                        width={100} // Adicione width e height para evitar warnings
                        height={100}
                    />
                </div>
                <h2>Agendamentos</h2>
                <div className="div-desc">
                    <p>Erro ao carregar agendamentos.</p>
                </div>
            </SectAgDetails>
        );
    }

    return (
        <SectAgDetails>
            <div className="div-icon-calendario">
                <Image 
                    src={imgDetalhes} 
                    alt='Ícone de calendário'
                    width={100}
                    height={100}
                />
            </div>
            <h2>Agendamentos</h2>
            {agendamentos.length === 0 ? (
                <div className="div-desc">
                    <p>Nenhum agendamento encontrado.</p>
                </div>
            ) : (
                agendamentos.map((agendamento, index) => {
                    // Verifica se o agendamento é válido
                    if (!agendamento) return null;

                    return (
                        <div className='div-desc' key={agendamento.id ?? index}>
                            <p>Data e Hora: {agendamento.dthoraAgendamento || 'Não definido'}</p>
                            <p>Status: {agendamento.statusAgendamento || 'Não definido'}</p>
                            <p>Oficina: {agendamento.oficina?.nome || 'Nome não disponível'}</p>
                            <p>Carro: {agendamento.carro?.placa || 'Placa não disponível'}</p>
                            <div className='box-botoes'>
                                <button 
                                    onClick={() => agendamento && onEdit(agendamento)}
                                    disabled={!agendamento}
                                >
                                    Remarcar
                                </button>
                                <button 
                                    onClick={() => {
                                        if (agendamento && agendamento.id) {
                                            onDelete(agendamento.id);
                                        }
                                    }}
                                    disabled={!agendamento || !agendamento.id}
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </SectAgDetails>
    );
}




