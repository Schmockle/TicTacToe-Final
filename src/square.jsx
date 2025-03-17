import React from 'react';

export default function Square({ value, onSquareClick }) {
  // Bestem ekstra klasse basert på verdien (X eller O)
  const extraClass = value === 'X' ? 'x' : value === 'O' ? 'o' : '';

  return (
    <button className={`square ${extraClass}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}
