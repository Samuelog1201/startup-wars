import eventos from "../data/events";

function EventGenerator({ setEvento }) {

  const generarEvento = () => {
    const random = eventos[Math.floor(Math.random() * eventos.length)];
    setEvento(random);
  };

  return (
    <div>
      <button onClick={generarEvento}>
        Generar evento del mercado
      </button>
    </div>
  );
}

export default EventGenerator;