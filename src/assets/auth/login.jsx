import { useState, useMemo } from "react";

const Button = ({ children, className, onClick, type = "button" }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const Login = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    if (!player1Name.trim() || !player2Name.trim()) {
      setError("Mohon isi nama kedua player!");
      return;
    }

    const randomAssignment = Math.floor(Math.random() * 2);

    const gameData = {
      player1: player1Name.trim(),
      player2: player2Name.trim(),
      player1Symbol: randomAssignment === 0 ? "X" : "O",
      player2Symbol: randomAssignment === 0 ? "O" : "X",
    };

    window.localStorage.setItem("gameData", JSON.stringify(gameData));
    window.location.href = "/dashboard";
  };

  const clouds = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const duration = 25 + Math.random() * 20;
      return {
        id: i,
        top: Math.random() * 250,
        size: 60 + Math.random() * 80,
        duration,
        delay: -Math.random() * duration,
      };
    });
  }, []);

  return (
    <div className="bg-[#F0E7D5] h-screen w-screen flex justify-center items-center flex-col relative overflow-hidden">
      {clouds.map((cloud) => (
        <img
          key={cloud.id}
          src="../public/img/awan.png"
          alt="Image Awan"
          className="absolute animate-cloud"
          style={{
            top: `${cloud.top}px`,
            width: `${cloud.size}px`,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}

      <div className="flex flex-col justify-center items-center bg-[#F0E7D5] w-[500px] h-[500px] rounded-2xl shadow-2xl border-2 border-gray-500/20 p-8 z-10 relative">
        <div className="flex flex-col justify-center items-center text-center px-2 mb-5">
          <h1 className="text-6xl font-mono font-bold cursor-pointer mb-5">TicTacToe</h1>
          <span className="text-lg font-mono cursor-pointer">
            Selamat Datang Di Game TicTacToe, Silahkan Input Username Player 1
            dan Player 2!
          </span>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col w-full mt-6">
          <div className="flex flex-col mb-5">
            <label htmlFor="player1" className="mb-1 font-semibold">
              Please Input Name Player 1
            </label>
            <input
              type="text"
              id="player1"
              value={player1Name}
              onChange={(e) => {
                setPlayer1Name(e.target.value);
                setError("");
              }}
              placeholder="Enter Player 1 name"
              className="border rounded-md h-10 px-3 focus:outline-none"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="player2" className="mb-1 font-semibold">
              Please Input Name Player 2
            </label>
            <input
              type="text"
              id="player2"
              value={player2Name}
              onChange={(e) => {
                setPlayer2Name(e.target.value);
                setError("");
              }}
              placeholder="Enter Player 2 name"
              className="border rounded-md h-10 px-3 focus:outline-none"
            />
          </div>
          <Button
            className="px-14 py-2 mt-5 border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-700 cursor-pointer font-semibold"
            type="button"
            onClick={handleStart}
          >
            Mulai
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-between">
        <img
          src="../public/img/animation2.png"
          alt="Image Animation 1"
          className="w-100 h-100 object-cover"
        />
        <img
          src="../public/img/animation1.png"
          alt="Image Animation 2"
          className="w-100 h-100 object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
