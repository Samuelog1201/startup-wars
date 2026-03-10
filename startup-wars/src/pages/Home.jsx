function Home({ iniciarJuego }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Startup Wars</h1>

      <p>
        Compite con otras startups para construir la empresa más exitosa.
      </p>

      <button onClick={iniciarJuego}>
        Iniciar juego
      </button>
    </div>
  );
}

export default Home;