import logo from './logo.svg';
import './App.css';
import Tamagotchi from './components/Tamagotchi';
import Estadisticas from './components/Estadisticas/mqtt';

function App() {
  return (
    <div>
      <Estadisticas></Estadisticas>
      <Tamagotchi/>
    </div>
    
  );
}

export default App;
