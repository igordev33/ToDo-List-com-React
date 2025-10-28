import ListaTarefa from "./components/ListaTarefa"
import "./App.css"
import Login from "./components/Login"
import { userState } from "./state/UserState.js";
import { useRecoilState } from "recoil";

function App() {

  const [usuario, setUsuario] = useRecoilState(userState);

  return (
      <main className="main">
        <h1 className="main__title">To-Do List App</h1>
        {usuario.estaLogado ? <ListaTarefa /> : <Login />}  
      </main>
  )
}

export default App
