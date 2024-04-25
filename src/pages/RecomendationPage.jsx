import { FaSearch } from "react-icons/fa";
import data from "../Data.json";

export default function RecomendationPage(){
    return (
		<div className="flex-grow w-full">
			<h1 className="block mx-auto w-fit text-center border-b-[#9E896A] text-[#9E896A] text-3xl font-semibold mt-4 border-b-4">
				Recomendações para você
			</h1>

			<div className="grid grid-cols-5 h-fit gap-8 p-8">
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