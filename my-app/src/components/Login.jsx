import { memo } from "react";
import useInput from "../hooks/useInput"
import { userState } from "../state/UserState.js"
import { useSetRecoilState } from "recoil";


function Login() {
    const nomeDoUsuario = useInput();
    const setUsuario = useSetRecoilState(userState);

    const handleLogin = (e) => {
        e.preventDefault()

        setUsuario({ nome: nomeDoUsuario.valor, estaLogado: true })
    }

    return (
        <form onSubmit={handleLogin} className="login-form">
            <input
                className="login-form__input"
                type="text"
                value={nomeDoUsuario.valor}
                placeholder="Digite seu nome"
                onChange={nomeDoUsuario.onChange} />
            <button type="submit" className="login-form__button">Login</button>
        </form>
    )
}

export default memo(Login);