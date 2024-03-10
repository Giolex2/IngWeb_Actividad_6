import React from 'react';

export function Header() {
  const headerStyle = {
    backgroundColor: '#ffeb3b', // Fondo amarillo
    color: '#1e88e5', // Texto azul
    padding: '10px 20px', // Espaciado interno
    textAlign: 'center', // Centrar texto
    borderBottom: '2px solid #1565c0' // Borde inferior azul, un tono más oscuro
  };

  return (
    <header style={headerStyle}>
      <h1>Estudiantes - Uniminuto</h1>
    </header>
  );
};
