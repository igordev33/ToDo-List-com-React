import { useState } from "react";

function useInput(valorDoInput = '') {

    const [valor, setValor] = useState(valorDoInput)

    const onChange = (e) => {
        setValor(e.target.value)
    }

    const limpar = () => {
        setValor('')
    }

    return ({
        valor,
        onChange,
        limpar
    })
}

export default useInput;