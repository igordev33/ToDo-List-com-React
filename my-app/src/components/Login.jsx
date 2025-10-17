import { useContext, memo } from "react";
import useInput from "../hooks/useInput"
import { UserContext } from "../contexts/UserContext";


function Login() {
    const nomeDoUsuario = useInput();
    const {setUsuario} = useContext(UserContext)

    const handleLogin = (e) => {
        e.preventDefault()

        setUsuario({nome: nomeDoUsuario.valor, estaLogado: true})
    }

    return (
        <form onSubmit={handleLogin} className="login-form">
            <input
                className="login-form__input" 
                type="text"
                value={nomeDoUsuario.valor}
                placeholder="Digite seu nome"
                onChange={nomeDoUsuario.onChange}/>
            <button type="submit" className="login-form__button">Login</button>
        </form>
    )
}

export default memo(Login);