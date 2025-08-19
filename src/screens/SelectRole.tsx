import { useNavigate } from "react-router-dom";

const SelectRole = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role: "host" | "member") => {
    navigate(`/${role}`);
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-white/30 backdrop-blur-2xl p-5 rounded-lg flex flex-col items-center justify-around h-40 w-80">
        <h1 className="text-2xl font-bold text-slate-900">Select Role</h1>
        <div className="flex gap-10">
          <button
            className="bg-slate-800 px-7 py-2 rounded-2xl text-white hover:cursor-pointer hover:scale-105 transition-all duration-300 tracking-wide"
            onClick={() => handleSelectRole("host")}
          >
            Host
          </button>
          <button
            className="bg-slate-800 px-7 py-2 rounded-2xl text-white hover:cursor-pointer hover:scale-105 transition-all duration-300 tracking-wide"
            onClick={() => handleSelectRole("member")}
          >
            Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
