import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Start1 = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F0E7D5] h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-5 bg-[#F0E7D5] w-[630px] h-[453px] rounded-2xl shadow-2xl border-2 border-gray-500/20">
        <h1 className="text-5xl font-bold mb-5 cursor-pointer">TicTacToe</h1>
        <Button
          color="bg-transparant"
          textColor="text-black"
          className="px-14 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-700 cursor-pointer"
          type="button"
          onClick={() => navigate("/start")}
        >
          Start Game
        </Button>
        <Button
          color="bg-transparant"
          textColor="text-black"
          className="px-15 py-2 border border-black rounded-lg hover:bg-red-600 hover:text-white transition-all duration-700 cursor-pointer"
          type="button"
          onClick={() => (window.location.href = "https://google.com")}
        >
          Quit Game
        </Button>
      </div>
    </div>
  );
};

export default Start1;
