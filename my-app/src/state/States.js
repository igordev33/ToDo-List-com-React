import {atom, selector} from "recoil";

export const userState = atom({
    key: "userState",
    default: {nome: null, estaLogado: false}
});

export const listaTarefasState = atom({
    key: "listaTarefas",
    default: []
})

export const filtroState = atom({
    key: 'filtroState',
    default: 'todos',
});

export const filtroTarefas = selector({
    key: "filtroTarefas",
    get: ({get}) => {
        const listaTarefas = get(listaTarefasState);
        const usuario = get(userState);
        const filtro = get(filtroState);

        return listaTarefas
        .filter(tarefa => tarefa.usuario === usuario.nome)
        .filter(tarefa => {
            if (filtro === 'todos') return true;
            if (filtro === 'concluido') return tarefa.concluida;
            if (filtro === 'pendente') return !tarefa.concluida;
            return true;
        })
    }
})