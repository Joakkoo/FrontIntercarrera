import React from 'react';
import { Button, Space } from 'antd';

const Acciones = ({ onFeed, onPlay, onSleep, isSleeping, energy, isDead, onRevive, ventiladorEncendido, toggleVentilador }) => {
  return (
    <div className="actions">
      {!isDead ? (
        <Space direction="vertical" size="middle">
          <Button type="primary" shape="round" onClick={onFeed} disabled={isSleeping} style={{ backgroundColor: 'green' }} title="Alimentar">🍌</Button>
          <Button type="primary" shape="round" onClick={onPlay} disabled={isSleeping || energy <= 20} style={{ backgroundColor: 'green' }} title="Jugar">🎮
          </Button> 
          <Button type="primary" shape="round" onClick={onSleep} disabled={isSleeping} style={{ backgroundColor: 'green' }} title="Dormir">💤
          </Button>
          <Button type="default" shape="round" onClick={toggleVentilador}>
            {ventiladorEncendido ? 'Apagar Ventilador' : 'Encender Ventilador'}
          </Button>
        </Space>
      ) : (
        <Button type="danger" shape="round" onClick={onRevive} style={{ backgroundColor: 'green', color: 'white' }}>
          Revivir
        </Button>
      )}
    </div>
  );
};

export default Acciones;
