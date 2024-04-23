
interface Props {
    tarefaInput: string;
    setTarefaInput: React.Dispatch<React.SetStateAction<string>>;
    handleAdicionar: (e: React.FormEvent<HTMLFormElement>) => void;
    editar: boolean;
  }
  

  const TarefaForm: React.FC<Props> = ({
    tarefaInput,
    setTarefaInput,
    handleAdicionar,
    editar,
  }) => {
    return (
      <form className="todo" onSubmit={handleAdicionar}>
        <input
          type="text"
          placeholder="Sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />
        {editar ? (
          <button type="submit">Atualizar</button>
        ) : (
          <button type="submit">Adicionar</button>
        )}
      </form>
    );
  };

export default TarefaForm