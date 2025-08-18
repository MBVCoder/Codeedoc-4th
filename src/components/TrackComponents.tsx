

const TrackComponents = ({ track }: { track: any }) => {
	return (
		<div>
			<div className="bg-white/30 backdrop-blur-2xl p-5 rounded-lg flex flex-col items-center justify-around h-40">
				<h1 className="text-2xl font-bold text-white">{track.title}</h1>
			</div>
			<div>
				
			</div>
		</div>
	)
}

export default TrackComponents
