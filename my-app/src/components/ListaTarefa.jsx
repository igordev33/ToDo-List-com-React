import { useEffect, memo, useState, useCallback, useRef } from "react";
import useInput from "../hooks/useInput";
import Tarefa from "./Tarefa";
import { filtroState, filtroTarefas, listaTarefasState, userState } from "../state/States"
import { useRecoilState, useRecoilValue } from "recoil";

function ListaTarefa() {

    const URL_API = 'https://crudcrud.com/api/e487186cbee247c09c9c539294cdf48b'

    const [carregando, setCarregando] = useState(true);
    const [filtro, setFiltro] = useRecoilState(filtroState);
    const inputTarefa = useInput();
    const [listaTarefa, setListaTarefa] = useRecoilState(listaTarefasState);
    const estaProcessando = useRef(false);
    const usuario = useRecoilValue(userState);
    const tarefasFiltradas = useRecoilValue(filtroTarefas)

    //Busca dados da API ao montar o elemento
    useEffect(() => {
        fetch(`${URL_API}/tarefas`)
            .then(response => response.json())
            .then(dados => {
                setListaTarefa(dados)
                setCarregando(false)
            })
            .catch(error => console.error('Erro ao buscar dados da api ', error))
    }, [])

    //Função que cadastra novas tarefas
    const handleSubmit = (e) => {
        e.preventDefault();

        if (estaProcessando.current) {
            return
        }
        estaProcessando.current = true;

        //Faz o envio dos dados para a API
        fetch(`${URL_API}/tarefas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario: usuario.nome, texto: inputTarefa.valor, concluida: false })
        })
            .then(response => response.json())
            .then(dados => { setListaTarefa((prev) => [...prev, dados]) })
            .catch(error => console.error('Erro ao enviar os dados para a Api ', error))
            .finally(() => { estaProcessando.current = false })

        inputTarefa.limpar();
    }

    //Função que exclui as tarefas cadastradas na API
    const excluirTarefa = useCallback((id) => {

        if (estaProcessando.current) {
            return
        }
        estaProcessando.current = true;

        fetch(`${URL_API}/tarefas/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => {
                setListaTarefa(prev => prev.filter(tarefa => tarefa._id !== id));
            })
            .catch(error => { console.error("Erro ao excluir a tarefa:", error) })
            .finally(() => { estaProcessando.current = false })
    }, [])

    //função que altera o valor concluida do objeto como true
    const alternarConcluida = useCallback((id, estadoAtual, texto) => {

        if (estaProcessando.current) {
            console.log('alternarConcluida já está processando')
            return
        }
        estaProcessando.current = true

        fetch(`${URL_API}/tarefas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario: usuario.nome, texto, concluida: !estadoAtual })
        })
            .then(() =>
                setListaTarefa(prev =>
                    prev.map(tarefa =>
                        tarefa._id === id
                            ? { ...tarefa, concluida: !estadoAtual }
                            : tarefa
                    )))
            .catch(error => console.error('erro ao alterar status da tarefa ', error))
            .finally(() => { estaProcessando.current = false })
    }, [])

    return (
        <>
            <section className="form-de-tarefas">
                <form onSubmit={handleSubmit}>
                    <input onChange={inputTarefa.onChange} value={inputTarefa.valor} type="text" placeholder="Digite aqui a sua tarefa." />
                    <button type="submit">Enviar</button>
                </form>
            </section>

            <section className="filtro-de-tarefas">
                <p>Filtrar por <select
                    name="filtro"
                    id="filtro"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}>
                    <option value="todos">Todos</option>
                    <option value="concluido">Concluidas</option>
                    <option value="pendente">Pendentes</option>
                </select></p>
            </section>

            <ul className="lista-de-tarefas">
                {carregando ? (
                    <p className="lista-de-tarefas__loading">Carregando...</p>
                ) : (
                    tarefasFiltradas
                        .map((dados) => {
                            return (
                                <Tarefa
                                    texto={dados.texto}
                                    acaoBotao={() => { excluirTarefa(dados._id) }}
                                    key={dados._id}
                                    concluida={dados.concluida}
                                    alternar={() => alternarConcluida(dados._id, dados.concluida, dados.texto)}
                                />
                            )
                        })
                )}
            </ul>
        </>
    )
}

export default memo(ListaTarefa);