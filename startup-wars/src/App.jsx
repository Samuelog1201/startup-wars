import { useState } from "react";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Game from "./pages/Game";

function App() {

  const [pantalla, setPantalla] = useState("home");
  const [jugadores, setJugadores] = useState([]);

  const iniciarJuego = () => {
    setPantalla("setup");
  };

  const iniciarPartida = (listaJugadores) => {
    setJugadores(listaJugadores);
    setPantalla("game");
  };

  if (pantalla === "home") {
    return <Home iniciarJuego={iniciarJuego} />;
  }

  if (pantalla === "setup") {
    return <Setup iniciarPartida={iniciarPartida} />;
  }

  return <Game jugadores={jugadores} />;
}

export default App;