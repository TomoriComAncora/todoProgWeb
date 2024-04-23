import { MdEdit } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";

interface Props {
  tarefa: { texto: string };
  index: number;
  handleEditar: (tarefa: { texto: string }) => void;
  handleConcluir: (index: number) => void;
}

const Tarefa: React.FC<Props> = ({
  tarefa,
  index,
  handleEditar,
  handleConcluir,
}) => {
  return (
    <article className="tarefa" key={index}>
      <p>{tarefa.texto}</p>
      <div className="buttons">
        <button onClick={() => handleEditar(tarefa)}>
          <MdEdit />
        </button>
        <button onClick={() => handleConcluir(index)} id="concluir">
          <FaCheckDouble />
        </button>
      </div>
    </article>
  );
};

export default Tarefa;
