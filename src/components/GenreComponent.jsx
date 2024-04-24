export default function GenreComponent({genre}) {
	return (
		<div className="relative h-fit rounded-lg overflow-hidden text-center shadow-lg">
			<label
				htmlFor={`${genre}-checkmark`}
				className="text-white p-20 cursor-pointer font-semibold text-2xl absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			>
				{genre}
			</label>
			<input
				type="checkbox"
				name={`${genre}-checkmark`}
				id={`${genre}-checkmark`}
				className="hidden peer"
			/>
			<div className="absolute w-full h-full bg-gradient-to-b rounded from-[#977644]/30 to-black/30 z-10 peer-checked:border-8 border-[#977644]"></div>
			<img
				src="https://igor-ca.github.io/cinema-recomendation-frontend/assets/image.png"
				alt={`${genre}-cover`}
			/>
		</div>
	);
}
