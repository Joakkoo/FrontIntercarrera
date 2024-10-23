import React from 'react';

const Acciones = ({ onFeed, onPlay, onSleep, isSleeping, energy, isDead,  onRevive, ventiladorEncendido, toggleVentilador }) => {
  return (
    <div className="actions">
      {!isDead ? (
        <>
          <button onClick={onFeed} disabled={isSleeping}>Alimentar</button>
          <button onClick={onPlay} disabled={isSleeping || energy <= 20}>Jugar</button>
          <button onClick={onSleep} disabled={isSleeping}>Dormir</button>
          <button onClick={toggleVentilador}>
            {ventiladorEncendido ? 'Apagar Ventilador' : 'Encender Ventilador'}
          </button>
        </>
      ) : (
        <button onClick={onRevive}>Revivir</button>
      )}
    </div>
  );
};

export default Acciones;
