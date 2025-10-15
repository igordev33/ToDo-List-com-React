import { useEffect, memo, useState, useCallback } from "react";
import useInput from "../hooks/UseInput";
import Tarefa from "./Tarefa";

function ListaTarefa() {

    const [carregando, setCarregando] = useState(true)

    const URL_API = 'https://crudcrud.com/api/c7fe26a359fc498ab2a6e2c2c6268099'

    const tarefa = useInput()
    const [listaTarefa, setListaTarefa] = useState([])
    
    //apenas para testes, excluir depois
    console.log('componente ListaTarefa executado')

    //Busca dados da API ao montar o elemento
    useEffect(() => {
        fetch(`${URL_API}/tarefas`)
        .then(response => response.json())
        .then(dados => {
            setListaTarefa(dados)
            setCarregando(false)
        })
        .catch(error => console.error('Erro ao buscar dados da api ', error))

        //apenas para testes, excluir depois
        console.log('componente ListaTarefa montado')
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        //Faz o envio dos dados para a API
        fetch(`${URL_API}/tarefas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({texto: tarefa.valor})
        })
        .then(response => response.json())
        .then(dados => {setListaTarefa((prev) => [...prev, dados])})
        .catch(error => console.error('Erro ao enviar os dados para a Api ', error))
        
        tarefa.limpar();
    }

    //Função que exclui as tarefas cadastradas na API
    const excluirTarefa = useCallback((id) => {
        fetch(`${URL_API}/tarefas/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao deletar");
            console.log("Item deletado com sucesso!");

            setListaTarefa(prev => prev.filter(tarefa => tarefa._id !== id));
        })
        .catch(error => {
        console.error("Erro ao excluir a tarefa:", error);
        });       
    },[])

    return  (
        <> 
            <form onSubmit={handleSubmit}>
                <input onChange={tarefa.onChange} value={tarefa.valor} type="text" placeholder="Digite aqui a sua tarefa."/>
                <button type="submit">Enviar</button>
            </form>

            <ul>
                {carregando ? (
                   <p>Carregando...</p> 
                ) : (
                    listaTarefa.map((dados) => {
                        return (
                            <Tarefa texto = {dados.texto} acaoBotao={() => {excluirTarefa(dados._id)}} key={dados._id}/>
                        )
                    })
                )}
            </ul>
        </>
    )
}

export default memo(ListaTarefa);