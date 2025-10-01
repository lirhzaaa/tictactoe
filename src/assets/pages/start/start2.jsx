import Button from "../../components/Button";

const Start2 = () => {
  return (
    <div className="bg-[#F0E7D5] h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-[#F0E7D5] w-[630px] h-[453px] rounded-2xl shadow-2xl border-2 border-gray-500/20">
        <div className="flex flex-col justify-center items-center text-center p-10">
          <h1 className="text-3xl font-mono font-bold cursor-pointer mb-10">
            Halo Selamat Datang!!!
          </h1>
          <span className="text-lg font-mono cursor-pointer">
            Selamat datang di permainan ini! Di sini kamu bisa menikmati serunya
            bermain bersama teman dengan penuh keseruan. Setiap langkah yang kamu
            ambil akan membawa tantangan baru untuk diselesaikan. Gunakan
            strategi terbaikmu agar bisa memenangkan permainan. Nikmati waktu
            bermainmu dan rasakan pengalaman seru yang tidak akan terlupakan.
          </span>

        </div>
        <div className="flex justify-between items-center w-full px-10">
          <Button
            color="bg-transparant"
            textColor="text-black"
            className="px-14 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-700 cursor-pointer"
            type="button"
            onClick={() => (window.location.href = "/")}
          >
            Back
          </Button>
          <Button
            color="bg-transparant"
            textColor="text-black"
            className="px-14 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-700 cursor-pointer"
            type="button"
            onClick={() => (window.location.href = "/login")}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Start2;
