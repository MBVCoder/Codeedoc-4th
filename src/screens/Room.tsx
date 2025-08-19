import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { socket } from "../config/socket";
import { extractYouTubeId } from "../config/extractid";
import { useNavigate } from "react-router-dom";

const Room = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [trackName, setTrackName] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [isClearState, setIsClearState] = useState(false);
  const navigate = useNavigate();
  const roomId = useParams().roomId;

  const handleDelete= ()=>{}

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("new track added");

    const videoId = extractYouTubeId(videoUrl);
    console.log(videoId);
    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return;
    }

    const newTrack = {
      id: Date.now().toString(),
      title: trackName || `YouTube Video (${videoId})`,
      url: videoUrl,
      videoId,
    };

    socket.emit("add-track", { roomId, tracks: [newTrack] });

    toast.success("Track Added");

    setVideoUrl("");
    setTrackName("");
  };

  useEffect(() => {
    if (!socket.connected || isClearState) {
      navigate("/"); // Redirect to SelectRole
    }
    socket.on("clear-state", () => {
      setIsClearState((prev) => !prev);
      toast.error("Host Leave the Room");
    });
    socket.on("room-tracks", (data) => {
      setTracks(data);
    });

    return () => {
      socket.off("disconnect");
      socket.off("clear-state");
      socket.off("room-tracks");
    };
  }, [roomId, navigate,isClearState]);

  return (
    <div className="bg-black flex flex-col justify-center items-center 2xl:h-screen px-10">
      <div className="my-15 border-b-2  border-white">
        <h1 className="text-5xl text-header font-semibold tracking-wide">
          Welcome to the Live Room
        </h1>
      </div>
      <div className="">
        <div className="grid grid-cols-1 2xl:grid-cols-5 gap-5 ">
          <div className=" 2xl:col-span-2 p-5 w-full h-full rounded-2xl">
            <h1 className="text-3xl text-left text-white">
              Room ID: <strong className="underline">{roomId}</strong>
            </h1>
            <div className="flex justify-start flex-col items-center my-10 rounded-2xl border bg-purple-200/10 shadow-lg shadow-purple-500/30 p-5 w-full  inset-shadow-2xs inset-shadow-black min-w-[500px]">
              <h1 className="text-3xl font-semibold mb-5 text-header text-center w-full">
                Add a new track
              </h1>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col my-4 gap-2">
                  <label className="text-white">Video Link : </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Link of video"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className=" focus:outline-0 border-b-[1px] border-l-[1px] border-gray-100 rounded-lg px-5 py-3 bg-black text-white"
                  />
                </div>
                <div className="flex flex-col my-4 gap-2">
                  <label className="text-white">Track Name : </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Track name"
                    value={trackName}
                    onChange={(e) => setTrackName(e.target.value)}
                    className=" focus:outline-0 border-b-[1px] border-l-[1px] border-gray-100 rounded-lg px-5 py-3 bg-black text-white "
                  />
                </div>
                <button
                  type="submit"
                  className="bg-purple-900 text-white px-5 py-2 rounded-lg hover:bg-purple-700 my-5 hover:cursor-pointer duration-500 "
                >
                  Add Track
                </button>
              </form>
            </div>
          </div>
          <div className=" 2xl:col-span-3 p-5 border-2 border-white rounded-2xl">
            <ul>
              {tracks?.map((track) => (
                <li key={track.id} className="text-white my-2 flex gap-10 items-center">
                  🎵 {track.title}
                  {/* {track.url} */}
                  <div className="bg-white px-3 py-1 text-black  rounded-2xl" >
                    <button className="text-sm flex justify-center items-center" onClick={handleDelete}>Delete</button>
                  </div>
                  {track.isPlaying && (
                    <span className="text-white bg-red-500 rounded-full px-2 py-1">
                      🎧
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
