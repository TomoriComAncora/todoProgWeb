import {useState, useEffect} from 'react'
import './styles.css'
import { MdEdit } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";

interface Tarefa {
  texto: string;
}

function App() {
  const [tarefaInput, setTarefaInput] = useState<string>('');
  const [tarefas, setTarefas] = useState<Tarefa[]>(() => {
    try {
      const localStorageData = localStorage.getItem('@todos');
      if (localStorageData) {
        return JSON.parse(localStorageData) || [];
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  });

  const [editar, setEditar] = useState<Tarefa | undefined>(undefined);

  useEffect(() => {
    const buscarItens = (): void => {
      const tarefasLocal = localStorage.getItem('@todos');

      if (tarefasLocal) {
        setTarefas(JSON.parse(tarefasLocal));
      }
    };

    buscarItens();
  }, []);

  useEffect(() => {
    localStorage.setItem('@todos', JSON.stringify(tarefas)); 
  }, [tarefas]);

  const handleAdicionar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tarefaInput === '') {
      alert('Digite uma tarefa');
      return;
    }

    if (editar) {
      handleAtualizarEdicao();
      return;
    }

    setTarefas((prevTarefas) => [...prevTarefas, { texto: tarefaInput }]);
    setTarefaInput('');
  };

  const handleEditar = (tarefa: Tarefa) => {
    setTarefaInput(tarefa.texto);
    setEditar(tarefa);
  };

  const handleAtualizarEdicao = () => {
    const indexTarefa = tarefas.findIndex((tarefa) => tarefa === editar);
    if (indexTarefa !== -1) {
      const novasTarefas = [...tarefas];
      novasTarefas.splice(indexTarefa, 1, { texto: tarefaInput });
      setTarefas(novasTarefas);
    }
    setTarefaInput('');
    setEditar(undefined);
  };

  const handleConcluir = (index: number) => {
    const indexTarefa = tarefas.findIndex(
      (tarefa) => tarefas.indexOf(tarefa) === index
    );
    if (indexTarefa !== -1) {
      const tarefaConcluida = tarefas.filter((_, idx) => idx !== indexTarefa);
      setTarefas(tarefaConcluida);
    }
  };

  return (
    <div className="app">
      <h1>ToDo's de Prog Web</h1>
      <form className="todo" onSubmit={handleAdicionar}>
        <input
          type="text"
          placeholder='Sua tarefa...'
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />
        {editar ? (
          <button type="submit">Atualizar</button>
        ) : (
          <button type="submit">Adicionar</button>
        )}
      </form>

      <div className="lista">
        {tarefas.map((tarefa, index) => (
          <article className="tarefa" key={index}>
            <p>{tarefa.texto}</p>
            <div className="buttons">
              <button onClick={() => handleEditar(tarefa)}><MdEdit /></button>
              <button onClick={() => handleConcluir(index)} id='concluir'><FaCheckDouble /></button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default App