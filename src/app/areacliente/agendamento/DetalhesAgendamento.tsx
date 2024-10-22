import { useState } from 'react';
import {SectAgDetails } from './styledAgend';
import { Agendamento } from '@/types';
import Image from 'next/image';
import imgDetalhes from '@/../public/assets/iconCalendario.png';
import Modal from '@/components/Modal';

type Props = {
    agendamento: Agendamento | null; 
    onEdit: (agendamento: Agendamento) => void; 
    onDelete: (id: number) => void; 
};

export default function DetalhesAgendamento({ agendamento, onEdit, onDelete }: Props) {
    if (!agendamento) {
        return null;
    }

    const [isModalOpen, setModalOpen] = useState(false);

    const handleDelete = () => {
        if (agendamento && agendamento.id !== undefined) {
            onDelete(agendamento.id); // Chama a função de deleção no componente pai
            setModalOpen(false);
        }
    }

    const formatarDataHora = (dataHora: string): string => {
        const [data, hora] = dataHora.split('T');
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano} ${hora.slice(0, 5)}`;
    };

    return (
        <SectAgDetails>
            <div className="div-icon-calendario">
                <Image src={imgDetalhes} alt='Ícone de calendário' />
            </div>
            <h2>Detalhes do Agendamento</h2>
            <p>Data e Hora: {formatarDataHora(agendamento.dthoraAgendamento)}</p>
            <p>Status: {agendamento.statusAgendamento}</p>
            <p>Oficina: {agendamento.oficina.nome}</p>
            <p>Carro: {agendamento.carro.placa}</p>
            <p>Serviço: {agendamento.statusAgendamento}</p>

            <div className='boxBotoes'>
                <button>Remarcar</button>
                <button onClick={() => setModalOpen(true)}>Deletar</button>
            </div>


            {/* Modal de Exclusão */}
            <Modal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete} // Passa a função de deletar para o modal
            >
                <p>Tem certeza que deseja excluir este agendamento?</p>
                <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </Modal>
        </SectAgDetails>
    );
}


