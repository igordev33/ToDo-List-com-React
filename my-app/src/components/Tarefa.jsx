import { memo } from "react";

function Tarefa({ texto, concluida, alternar, acaoBotao }) {
  return (
    <li className={`lista-de-tarefas__card`}>
      <input
        type="checkbox"
        checked={concluida}
        onChange={alternar}
      />
      <span className={concluida ? "concluida" : "nao-concluida"}>{texto}</span>
      <button onClick={acaoBotao}> Excluir </button>
    </li>
  );
}

export default memo(Tarefa);