import NavBar from "../components/NavBar";
import data from "../Data.json";

export default function BrowserPage() {
	console.log(data);
	return (
		<div className="flex-grow w-full">
			<div>
				<div className="bg-[url(https://ntvb.tmsimg.com/assets/p16645155_v_h8_ae.jpg?w=960&h=540)] bg-no-repeat bg-cover bg-bottom	w-full h-80 rounded-b-3xl shadow-xl"></div>
			</div>

			<h1 className="block mx-auto w-fit text-center border-b-[#9E896A] text-[#9E896A] text-3xl font-semibold mt-4 border-b-4">
				Mais assistidos
			</h1>

			<div className="grid grid-cols-4 h-fit gap-10 p-10">
				{data.map((movie) => {
					return (
						<img
							className="w-full rounded-lg shadow-xl"
							src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
							alt=""
						/>
					);
				})}
			</div>
		</div>
	);
}
