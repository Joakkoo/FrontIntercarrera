import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Estadisticas from "./Estadísticas";
import Acciones from "./Acciones";
import "./estilos/Tamagotchi.css";

const socket = io("http://localhost:8080"); // Conectar al servidor de Socket.IO

const Tamagotchi = () => {
  const [hunger, setHunger] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [health, setHealth] = useState(100);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [mood, setMood] = useState(0);
  const [gif, setGif] = useState("");
  const [sensores, setSensores] = useState({
    temperatura: 0,
    humedad: 0,
    luz: 0,
    estadoTemp: 0,
    estadoHum: 0,
    estadoLuz: 0,
  });
  const [ventiladorEncendido, setVentiladorEncendido] = useState(false); // Estado del ventilador

  // Funciones para convertir el valor numérico de los sensores en texto
  const getMoodText = (moodValue) => {
    switch (moodValue) {
      case 0:
        return "Muerto";
      case 1:
        return "Triste";
      case 2:
        return "Enojado";
      case 3:
        return "Neutral";
      case 4:
        return "Muy Feliz";
      case 5:
        return "Cansado";
      case 6:
        return "Hambriento";
      default:
        return "Desconocido";
    }
  };

  const getTempText = (tempValue) => {
    switch (tempValue) {
      case 1:
        return "Calor";
      case 2:
        return "Templado";
      case 3:
        return "Frío";
      default:
        return "Desconocido";
    }
  };

  const getHumText = (humValue) => {
    switch (humValue) {
      case 1:
        return "Seco";
      case 2:
        return "Húmedo";
      default:
        return "Desconocido";
    }
  };

  const getLuzText = (luzValue) => {
    switch (luzValue) {
      case 1:
        return "Visible";
      case 2:
        return "Oscuro";
      default:
        return "Desconocido";
    }
  };

  useEffect(() => {
    let gifPath = ""; // Inicializamos una variable para la ruta del gif

    // Si el Tamagotchi está muerto, forzamos la imagen de muerto
    if (isDead) {
      gifPath = "/images/muerto/monoMuerte.png";
    } else {
      // Si no está muerto, actualizamos el gif según el estado de ánimo (mood)
      switch (mood) {
        case 0:
          gifPath = "/images/muerto/monoMuerte.png";
          break;
        case 1:
          gifPath = "/images/triste/ezgif-3-e96dce553d.gif";
          break;
        case 2:
          gifPath = "/images/enojado/ezgif-3-69f7ba81fd.gif";
          break;
        case 3:
          gifPath = "/images/neutral/ezgif-3-2b41c819c0.gif";
          break;
        case 4:
          gifPath = "/images/feliz/ezgif-2-5c56ce61fb.gif";
          break;
        case 5:
          gifPath = "/images/cansado/ezgif-3-982fb85154.gif";
          break;
        case 6:
          gifPath = "/images/hambre/ezgif-3-06d5e2b833.gif";
          break;
        default:
          gifPath = "/images/neutral/ezgif-3-2b41c819c0.gif"; // Ruta por defecto
          break;
      }
    }

    setGif(gifPath); // Actualizamos el estado del gif
  }, [mood, isDead]); // El useEffect se ejecutará cuando `mood` o `isDead` cambien

  useEffect(() => {
    // Función para enviar estadísticas al backend
    const enviarEstadisticas = () => {
      fetch("http://localhost:4001/api/mascota/estadisticas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hunger,
          happiness,
          energy,
          health,
          sensores,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Estadísticas enviadas:", data);
        })
        .catch((error) => {
          console.error("Error al enviar estadísticas:", error);
        });
    };
  
    // Escuchar las actualizaciones del estado del Tamagotchi desde el servidor
    socket.on("stateUpdate", (newState) => {
      setHunger(newState.hunger);
      setHappiness(newState.happiness);
      setEnergy(newState.energy);
      setHealth(newState.health);
      setIsSleeping(newState.isSleeping);
      setIsDead(newState.isDead);
      setMood(newState.mood);
  
      // Enviar estadísticas después de actualizar el estado
      enviarEstadisticas();
    });
  
    // Escuchar las actualizaciones de los datos de sensores desde el servidor
    socket.on("sensorDataUpdate", (newSensores) => {
      setSensores(newSensores);
  
      // Enviar estadísticas después de actualizar los sensores
      enviarEstadisticas();
    });
  
    // Limpiar los listeners de socket al desmontar el componente
    return () => {
      socket.off("stateUpdate");
      socket.off("sensorDataUpdate");
    };
  }, [hunger, happiness, energy, health, sensores]); // Dependencias para actualizar la función enviarEstadisticas si cambian los estados
  



  const toggleVentilador = () => {
    const nuevoEstado = !ventiladorEncendido;
    setVentiladorEncendido(nuevoEstado);

    // Enviar el estado del ventilador al backend
    fetch("http://localhost:4001/api/ventilador", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estadoVentilador: nuevoEstado ? 1 : 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error al enviar el estado del ventilador:", error);
      });
  };

  const feed = () => {
    socket.emit("feed");
  };

  const play = () => {
    socket.emit("play");
  };

  const sleep = () => {
    socket.emit("sleep");
  };

  const revive = () => {
    if (isDead) {
      socket.emit("revive", (response) => {
        if (response.success) {
          setHunger(100);
          setHappiness(100);
          setEnergy(100);
          setHealth(100);
          setIsDead(false);
        }
      });
    }
  };

  return (
    <div className="tamagotchi-container">
    <h1>Mario</h1>
    <div className="tamagotchi-main">
      {/* Ventana del Tamagotchi */}
      <div className="tamagotchi-ventana">
        <div className="gif-container">
          <img src={gif} alt="Tamagotchi mood" />
        </div>
        <p>Estado de ánimo: {getMoodText(mood)}</p>
        {isSleeping && <p>El Tamagotchi está durmiendo...</p>}
        <div className="tamagotchi-acciones">
      <Acciones
        onFeed={feed}
        onPlay={play}
        onSleep={sleep}
        isSleeping={isSleeping}
        energy={energy}
        isDead={isDead}
        onRevive={revive}
        ventiladorEncendido={ventiladorEncendido}
        toggleVentilador={toggleVentilador}
      />
    </div>
      </div>

      {/* Estadísticas */}
      <div className="tamagotchi-stats">
        <Estadisticas
          hunger={hunger}
          happiness={happiness}
          energy={energy}
          health={health}
        />
        <div className="sensores">
          <h2>Datos de Sensores:</h2>
          <p>Temperatura: {sensores.temperatura}°C - {getTempText(sensores.estadoTemp)}</p>
          <p>Humedad: {sensores.humedad}% - {getHumText(sensores.estadoHum)}</p>
          <p>Luz: {sensores.luz} lx - {getLuzText(sensores.estadoLuz)}</p>
        </div>
      </div>
    </div>

  </div>
  );
};

export default Tamagotchi;
