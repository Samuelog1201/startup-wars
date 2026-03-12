import { useState } from "react";
import "../styles/main.css";

const coloresDisponibles = [
  "rosado",
  "naranja",
  "amarillo",
  "verde",
  "azul",
  "rojo"
];

function Setup({ iniciarPartida }) {

  const [jugadores, setJugadores] = useState([
    { nombre: "", color: "rosado" },
    { nombre: "", color: "naranja" }
  ]);

  const agregarJugador = () => {

    if (jugadores.length < 6) {

      setJugadores([
        ...jugadores,
        {
          nombre: "",
          color: coloresDisponibles[jugadores.length]
        }
      ]);

    }

  };

  const cambiarNombre = (index, valor) => {

    const copia = [...jugadores];
    copia[index].nombre = valor;

    setJugadores(copia);

  };

  const cambiarColor = (index, color) => {

    const copia = [...jugadores];
    copia[index].color = color;

    setJugadores(copia);

  };

  const comenzarJuego = () => {

    const jugadoresConDatos = jugadores.map((j, index) => ({

      nombre: j.nombre || `Startup ${index + 1}`,
      color: j.color,

      inversion: 0,
      usuarios: 0,
      tecnologia: 0

    }));

    iniciarPartida(jugadoresConDatos);

  };

  return (

    <div className="setup-container">

      <h2>Configurar startups</h2>

      {jugadores.map((jugador, index) => (

        <div className="setup-card" key={index}>

          <label>Startup {index + 1}</label>

          <input
            type="text"
            placeholder="Nombre de la startup"
            value={jugador.nombre}
            onChange={(e) =>
              cambiarNombre(index, e.target.value)
            }
          />

          <div className="color-selector">

            {coloresDisponibles.map((color) => (

              <div
                key={color}
                className={`color-option ${color} ${
                  jugador.color === color ? "selected" : ""
                }`}
                onClick={() => cambiarColor(index, color)}
              />

            ))}

          </div>

        </div>

      ))}

      {jugadores.length < 6 && (

        <button onClick={agregarJugador}>
          Agregar startup
        </button>

      )}

      <button
        className="start-btn"
        onClick={comenzarJuego}
      >
        Comenzar partida
      </button>

    </div>

  );

}

export default Setup;