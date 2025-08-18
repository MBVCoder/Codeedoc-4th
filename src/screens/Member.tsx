import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../config/Socket";
import { toast } from "react-toastify";


const Member = () => {
	const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (!roomId.trim()) {
      toast.error("Please enter a Room ID");
      return;
    }
		socket.emit("join-room", roomId);
		
    navigate(`/room/${roomId}`);
  };
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-black">
			<div className="bg-white/30 backdrop-blur-2xl p-5 rounded-lg flex flex-col items-center justify-around h-40">
				<h1 className="text-2xl font-bold text-slate-900">Join a Room</h1>
				<div className="flex gap-10">
					<input type="text" name="roomid" value={roomId} onChange={(e) => setRoomId(e.target.value)} className="bg-slate-800 px-7 py-2 rounded-2xl text-white tracking-wide focus:outline-0" placeholder="Enter Room ID" />
					<button onClick={handleJoinRoom} className="bg-teal-800 px-7 py-2 rounded-2xl text-white hover:cursor-pointer hover:scale-105 transition-all duration-300 tracking-wide">Join</button>
				</div>
			</div>
		</div>
	)
}

export default Member
