import {useState, useEffect} from 'react'

function App() {
  return (
    <div className="app">
      <h1>ToDo's de Prog Web</h1>
      <form className="todo" onSubmit={handleAdicionar}>
        <input
          type="text"
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
              <button onClick={() => handleEditar(tarefa)}>Editar</button>
              <button onClick={() => handleConcluir(index)}>Concluir</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default App