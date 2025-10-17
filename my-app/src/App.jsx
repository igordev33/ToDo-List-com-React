import ListaTarefa from "./components/ListaTarefa"
import "./App.css"
import Login from "./components/Login"
import { useState } from "react"
import { UserContext } from "./contexts/UserContext"

function App() {

  const [usuario, setUsuario] = useState({nome: null, estaLogado: false})

  return (
    <UserContext.Provider value={{usuario, setUsuario}}>
      <main className="main">
        <h1 className="main__title">To-Do List App</h1>
        {usuario.estaLogado ? <ListaTarefa /> : <Login />}  
      </main>
    </UserContext.Provider>
  )
}

export default App
