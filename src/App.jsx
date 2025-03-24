import { useState } from 'react';
import './App.css'; // sørg for at CSS er importert

function Square({ value, onSquareClick, isWinner }) {
  return (
    <button className={`square ${isWinner ? 'winner' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = winner ? `Winner: ${winner.player}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const winningSquares = winner ? winner.line : [];

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((val, i) => (
          <Square
            key={i}
            value={val}
            onSquareClick={() => handleClick(i)}
            isWinner={winningSquares.includes(i)}
          />
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
        <button className="reset-btn" onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line };
    }
  }
  return null;
}

/* Vinner-animasjon */
.square.winner {
  background-color: #90ee90;
  animation: winner-glow 1s ease-in-out infinite alternate;
  border: 2px solid #32cd32;
  color: #000;
}

@keyframes winner-glow {
  from {
    box-shadow: 0 0 10px #32cd32;
  }
  to {
    box-shadow: 0 0 20px #32cd32, 0 0 10px #32cd32 inset;
  }
}