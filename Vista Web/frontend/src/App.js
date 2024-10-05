import logo from './logo.svg';
import './App.css';
import RestrictSchedule from './components/Restrictions'; // Importar el componente actualizado

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edita <code>src/App.js</code> y guarda para recargar.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aprende React
        </a>
      </header>

      {/* Aquí integramos el componente RestrictSchedule */}
      <div className="schedule-section">
        <h2>Restricción de Horarios</h2>
        <RestrictSchedule />
      </div>
    </div>
  );
}

export default App;

