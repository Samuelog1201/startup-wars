import { useState } from "react";

function Setup({ iniciarPartida }) {

  const [jugadores, setJugadores] = useState(["", ""]);

  const agregarJugador = () => {
    if (jugadores.length < 6) {
      setJugadores([...jugadores, ""]);
    }
  };

  const cambiarNombre = (index, valor) => {
    const copia = [...jugadores];
    copia[index] = valor;
    setJugadores(copia);
  };

  const comenzarJuego = () => {

    const jugadoresConDatos = jugadores.map((nombre, index) => ({
      nombre: nombre || `Startup ${index + 1}`,
      inversion: 0,
      usuarios: 0,
      tecnologia: 0
    }));

    iniciarPartida(jugadoresConDatos);
  };

  return (
    <div className="container">

      <h2>Configurar jugadores</h2>

      {jugadores.map((jugador, index) => (
        <div className="card" key={index}>
          <label>Startup {index + 1}</label>

          <input
            type="text"
            placeholder={`Nombre de la startup`}
            value={jugador}
            onChange={(e) => cambiarNombre(index, e.target.value)}
          />
        </div>
      ))}

      {jugadores.length < 6 && (
        <button onClick={agregarJugador}>
          Agregar startup
        </button>
      )}

      <br /><br />

      <button onClick={comenzarJuego}>
        Comenzar partida
      </button>

    </div>
  );
}

export default Setup;