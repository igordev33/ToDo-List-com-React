import { useEffect, memo} from "react"

function Tarefa ({texto, acaoBotao}) {

    console.log(`componente executado ${texto}`)
    useEffect(() => {
        console.log('componente montado', texto)
    },[])

    return (
        <li>
            <input type="checkbox"/> 
            {texto}
            <button onClick={acaoBotao}> Excluir </button>
        </li>
    )
}

export default memo(Tarefa);