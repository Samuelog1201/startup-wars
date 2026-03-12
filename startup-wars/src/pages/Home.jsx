function Home({ iniciarJuego }) {
  return (
    <div className="home-container">

      <div className="home-card">

        <h1>Startup Wars</h1>

        <p className="home-description">
          Compite con otras startups para construir la empresa más exitosa.
        </p>

        <button
          className="primary-button"
          onClick={iniciarJuego}
        >
          Iniciar juego
        </button>

      </div>

    </div>
  );
}

export default Home;