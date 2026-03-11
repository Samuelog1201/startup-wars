import { useState } from "react";
import EventGenerator from "../components/EventGenerator";
import challenges from "../data/challenges";
import rouletteResults from "../data/roulette";

function Game({ jugadores }) {

  const [eventoActual, setEventoActual] = useState(null);
  const [challengeActual, setChallengeActual] = useState("");
  const [battlePlayers, setBattlePlayers] = useState([]);
  const [rouletteResult, setRouletteResult] = useState("");
  const [estadoJugadores, setEstadoJugadores] = useState(jugadores);

  const sumarRecurso = (index, tipo) => {
    const copia = [...estadoJugadores];
    copia[index][tipo] += 1;
    setEstadoJugadores(copia);
  };

  const generarChallenge = () => {

    const randomChallenge =
      challenges[Math.floor(Math.random() * challenges.length)];

    setChallengeActual(randomChallenge);

    // Reset resultados anteriores
    setBattlePlayers([]);
    setRouletteResult("");

    // Startup Battle
    if (randomChallenge === "Startup Battle" && estadoJugadores.length >= 2) {

      const copia = [...estadoJugadores].sort(() => 0.5 - Math.random());
      setBattlePlayers([copia[0], copia[1]]);
    }

    // Startup Roulette
    if (randomChallenge === "Startup Roulette") {

      const randomResult =
        rouletteResults[Math.floor(Math.random() * rouletteResults.length)];

      setRouletteResult(randomResult);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Partida en curso</h2>

      <EventGenerator setEvento={setEventoActual} />

      <h3>Evento del mercado</h3>

      {eventoActual && (
        <div>
          <h4>{eventoActual.titulo}</h4>
          <p>{eventoActual.efecto}</p>
        </div>
      )}

      <button onClick={generarChallenge}>
        Generar Challenge
      </button>

      <h3>Challenge actual</h3>

      <p>{challengeActual}</p>

      {/* Startup Battle */}
      {challengeActual === "Startup Battle" && battlePlayers.length === 2 && (
        <h4>
          {battlePlayers[0].nombre} vs {battlePlayers[1].nombre}
        </h4>
      )}

      {/* Startup Roulette */}
      {challengeActual === "Startup Roulette" && (
        <div>
          <h4>Resultado de la ruleta</h4>
          <p>{rouletteResult}</p>
        </div>
      )}

      <h3>Startups</h3>

      {estadoJugadores.map((j, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h4>{j.nombre}</h4>

          <p>Inversión: {j.inversion}</p>
          <p>Usuarios: {j.usuarios}</p>
          <p>Tecnología: {j.tecnologia}</p>

          <button onClick={() => sumarRecurso(index, "inversion")}>
            + Inversión
          </button>

          <button onClick={() => sumarRecurso(index, "usuarios")}>
            + Usuarios
          </button>

          <button onClick={() => sumarRecurso(index, "tecnologia")}>
            + Tecnología
          </button>
        </div>
      ))}
    </div>
  );
}

export default Game;