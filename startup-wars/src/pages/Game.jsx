import { useState } from "react";
import EventGenerator from "../components/EventGenerator";

function Game({ jugadores }) {

  const [eventoActual, setEventoActual] = useState("");
  const [estadoJugadores, setEstadoJugadores] = useState(jugadores);

  const sumarRecurso = (index, tipo) => {
    const copia = [...estadoJugadores];
    copia[index][tipo] += 1;
    setEstadoJugadores(copia);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Partida en curso</h2>

      <EventGenerator setEvento={setEventoActual} />

      <h3>Evento del mercado</h3>
      <p>{eventoActual}</p>

      <h3>Startups</h3>

      {estadoJugadores.map((j, index) => (
        <div key={index} style={{border:"1px solid #ccc", margin:"10px", padding:"10px"}}>

          <h4>{j.nombre}</h4>

          <p>Inversión: {j.inversion}</p>
          <p>Usuarios: {j.usuarios}</p>
          <p>Tecnología: {j.tecnologia}</p>

          <button onClick={() => sumarRecurso(index,"inversion")}>
            + Inversión
          </button>

          <button onClick={() => sumarRecurso(index,"usuarios")}>
            + Usuarios
          </button>

          <button onClick={() => sumarRecurso(index,"tecnologia")}>
            + Tecnología
          </button>

        </div>
      ))}

    </div>
  );
}

export default Game;