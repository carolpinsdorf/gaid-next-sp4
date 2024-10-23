import { Carro } from '@/types';
import { ListaCarro } from './styledGaragem';

type Props = {
    carros: Carro[];
    onEdit: (carro: Carro) => void;
    onDelete: (id: number) => void;
};

export default function ListaCarros({ carros, onEdit, onDelete }: Props) {
    console.log('Carros na lista:', carros); // Verifique se os carros estão sendo passados corretamente
    return (
        <ListaCarro>
            <h2>Meus Carros</h2>
            {carros.map(carro => (
                <div key={carro.id}>
                    <p>{carro.placa} - {carro.marca} {carro.modelo} ({carro.anoFabricacao})</p>
                    <button onClick={() => onEdit(carro)}>Editar</button>
                    <button onClick={() => onDelete(carro.id!)}>Excluir</button>
                </div>
            ))}
        </ListaCarro>
    );
}

