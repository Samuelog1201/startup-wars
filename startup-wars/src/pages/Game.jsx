import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

import EventGenerator from "../components/EventGenerator";
import challenges from "../data/challenges";
import rouletteResults from "../data/roulette";
import marketRaces from "../data/marketRace";

import "../styles/main.css";

function Game({ jugadores }) {

  const [ronda, setRonda] = useState(1);
  const [eventoActual, setEventoActual] = useState(null);
  const [challengeActual, setChallengeActual] = useState("");
  const [battlePlayers, setBattlePlayers] = useState([]);
  const [rouletteResult, setRouletteResult] = useState("");
  const [raceObjective, setRaceObjective] = useState("");
  const [mostrarReto, setMostrarReto] = useState(false);
  const [estadoJugadores, setEstadoJugadores] = useState(jugadores);
  const [ganadorFinal, setGanadorFinal] = useState(null);

  const sumar = (i, tipo) => {
    const copia = [...estadoJugadores];
    copia[i][tipo] += 1;
    setEstadoJugadores(copia);
  };

  const restar = (i, tipo) => {
    const copia = [...estadoJugadores];
    if (copia[i][tipo] > 0) copia[i][tipo] -= 1;
    setEstadoJugadores(copia);
  };

  const generarChallenge = () => {

    const random = challenges[Math.floor(Math.random() * challenges.length)];

    setChallengeActual(random);
    setMostrarReto(true);
    setBattlePlayers([]);
    setRouletteResult("");
    setRaceObjective("");

    if (random === "Startup Battle") {
      const copia = [...estadoJugadores].sort(() => 0.5 - Math.random());
      setBattlePlayers([copia[0], copia[1]]);
    }

    if (random === "Startup Roulette") {
      const result = rouletteResults[Math.floor(Math.random() * rouletteResults.length)];
      setRouletteResult(result);
    }

    if (random === "Market Race") {
      const race = marketRaces[Math.floor(Math.random() * marketRaces.length)];
      setRaceObjective(race);
    }

  };

  const siguienteRonda = () => {
    setRonda(ronda + 1);
    setEventoActual(null);
    setChallengeActual("");
  };

  useEffect(() => {
    estadoJugadores.forEach((j) => {
      if (j.usuarios >= 10 || j.inversion >= 10 || j.tecnologia >= 10) {
        setGanadorFinal(j.nombre);
      }
    });
  }, [estadoJugadores]);

  return (

    <div className="game-container">

      <h1 className="title">Startup Wars</h1>
      <h2 className="round">Ronda {ronda}</h2>

      <EventGenerator setEvento={setEventoActual} />

      {eventoActual && (
        <div className="event-box">
          <h3>Evento del mercado</h3>
          <h4>{eventoActual.titulo}</h4>
          <p>{eventoActual.efecto}</p>
        </div>
      )}

      <div className="actions">
        <button onClick={generarChallenge}>Generar reto</button>
        <button onClick={siguienteRonda}>Siguiente ronda</button>
      </div>

      <div className="startup-grid">

        {estadoJugadores.map((j, i) => (

          <div key={i} className={`startup-card ${j.color}`}>

            <h4>{j.nombre}</h4>

            <div className="progress-bar">
              <div
                style={{
                  width: `${Math.min((j.usuarios + j.inversion + j.tecnologia) * 3, 100)}%`
                }}
              />
            </div>

            <div className="resource">

              <span>Inversión</span>

              <div className="resource-control">

                <button onClick={() => restar(i, "inversion")}>
                  <Minus size={14} />
                </button>

                <span className="value">{j.inversion}</span>

                <button onClick={() => sumar(i, "inversion")}>
                  <Plus size={14} />
                </button>

              </div>

            </div>

            <div className="resource">

              <span>Usuarios</span>

              <div className="resource-control">

                <button onClick={() => restar(i, "usuarios")}>
                  <Minus size={14} />
                </button>

                <span className="value">{j.usuarios}</span>

                <button onClick={() => sumar(i, "usuarios")}>
                  <Plus size={14} />
                </button>

              </div>

            </div>

            <div className="resource">

              <span>Tecnología</span>

              <div className="resource-control">

                <button onClick={() => restar(i, "tecnologia")}>
                  <Minus size={14} />
                </button>

                <span className="value">{j.tecnologia}</span>

                <button onClick={() => sumar(i, "tecnologia")}>
                  <Plus size={14} />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      <AnimatePresence>

        {mostrarReto && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            <motion.div
              className="modal"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >

              <h2>{challengeActual}</h2>

              {challengeActual === "Startup Battle" && battlePlayers.length === 2 && (
                <div className="vs-box">
                  <div>{battlePlayers[0].nombre}</div>
                  <div className="vs">VS</div>
                  <div>{battlePlayers[1].nombre}</div>
                </div>
              )}

              {challengeActual === "Startup Roulette" && (
                <div className="roulette-result">{rouletteResult}</div>
              )}

              {challengeActual === "Market Race" && (
                <p>{raceObjective}</p>
              )}

              <button onClick={() => setMostrarReto(false)}>
                Cerrar
              </button>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

      {ganadorFinal && (
        <div className="winner-screen">
          <h2>{ganadorFinal} se convirtió en Unicorn</h2>
        </div>
      )}

    </div>

  );

}

export default Game;