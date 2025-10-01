import { useState, useEffect, useRef } from "react";

const Square = ({ value, onSquaresClick, disabled }) => {
  return (
    <button
      className={`w-20 h-20 border-2 border-gray-400 bg-white font-bold text-4xl cursor-pointer hover:bg-gray-100 transition-colors duration-200 rounded-md shadow-sm ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onSquaresClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

const Board = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-lg">
        {squares.map((val, i) => (
          <Square
            key={i}
            value={val}
            onSquaresClick={() => handleClick(i)}
            disabled={!!calculateWinner(squares)}
          />
        ))}
      </div>
    </div>
  );
};

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameData, setGameData] = useState({
    player1: "Player 1",
    player2: "Player 2",
    player1Symbol: "X",
    player2Symbol: "O",
  });

  const historyEndRef = useRef(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every((sq) => sq !== null);

  useEffect(() => {
    const savedData = window.localStorage.getItem("gameData");
    if (savedData) setGameData(JSON.parse(savedData));
  }, []);

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (move) => setCurrentMove(move);

  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history.length]);

  const getCurrentPlayerName = (symbol) =>
    gameData.player1Symbol === symbol ? gameData.player1 : gameData.player2;

  const getWinnerName = () => (winner ? getCurrentPlayerName(winner) : "");

  const moves = history.map((_, move) => {
    const moveSymbol = move % 2 === 1 ? "X" : "O";
    const playerName = getCurrentPlayerName(moveSymbol);

    return (
      <div
        key={move}
        className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium">
          {move === 0 ? "Game Start" : `${playerName} (${moveSymbol})`}
        </span>
        <button
          onClick={() => jumpTo(move)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
        >
          {move === 0 ? "Go To Game Start" : `Go To Move ${move}`}
        </button>
      </div>
    );
  });

  return (
    <div className="relative bg-gradient-to-br from-[#F0E7D5] to-[#E8D5B7] min-h-screen w-full flex flex-col items-center justify-start p-4 pt-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(9)].map((_, i) => {
          const row = i % 3;
          const topPositions = [10, 40, 70];
          const randomOffset = Math.random() * 10 - 5;
          const top = `${topPositions[row] + randomOffset}%`;
          const size = 150 + Math.random() * 150;

          return (
            <img
              key={i}
              src="img/awan.png"
              alt="cloud"
              className="absolute animate-cloud"
              style={{
                top,
                left: "100%",
                width: `${size}px`,
                height: "auto",
                animationDuration: `${20 + i * 5}s`,
                animationDelay: `${i * 3}s`,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 flex w-full max-w-4xl justify-between items-start mb-6">
        <div className="p-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {gameData.player1}
          </h2>
          <span className="text-lg font-semibold text-gray-600">
            ({gameData.player1Symbol})
          </span>
          <p
            className={`text-sm font-semibold mt-2 ${
              winner
                ? winner === gameData.player1Symbol
                  ? "text-green-600"
                  : "text-red-600"
                : (xIsNext && gameData.player1Symbol === "X") ||
                  (!xIsNext && gameData.player1Symbol === "O")
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            {winner
              ? winner === gameData.player1Symbol
                ? "Winner"
                : "Loser"
              : (xIsNext && gameData.player1Symbol === "X") ||
                (!xIsNext && gameData.player1Symbol === "O")
              ? "Your Turn"
              : "Waiting"}
          </p>
        </div>

        <div className="flex flex-col text-center">
          <h1 className="text-5xl font-bold font-mono mb-7">TicTacToe</h1>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>

        <div className="p-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {gameData.player2}
          </h2>
          <span className="text-lg font-semibold text-gray-600">
            ({gameData.player2Symbol})
          </span>
          <p
            className={`text-sm font-semibold mt-2 ${
              winner
                ? winner === gameData.player2Symbol
                  ? "text-green-600"
                  : "text-red-600"
                : (xIsNext && gameData.player2Symbol === "X") ||
                  (!xIsNext && gameData.player2Symbol === "O")
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            {winner
              ? winner === gameData.player2Symbol
                ? "Winner"
                : "Loser"
              : (xIsNext && gameData.player2Symbol === "X") ||
                (!xIsNext && gameData.player2Symbol === "O")
              ? "Your Turn"
              : "Waiting"}
          </p>
        </div>
      </div>

      {winner && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <span className="text-white text-5xl font-semibold mb-25">Winner!!!</span>
            <h2 className="text-4xl font-bold text-white mb-20">
              {getWinnerName()} Wins!
            </h2>
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {isDraw && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-20">
              It's a Draw!
            </h2>
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-bold mb-4 text-center">Game History</h3>
        <div className="h-48 overflow-y-auto space-y-2">
          {moves}
          <div ref={historyEndRef} />
        </div>
      </div>
    </div>
  );
}

const calculateWinner = (squares) => {
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
