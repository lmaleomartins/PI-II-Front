import { FaSearch } from "react-icons/fa";
import data from "../Data.json";

export default function BrowserPage() {
	return (
		<div className="flex-grow w-full">
			<div>
				<div className="relative">
					<div className="flex items-center gap-4 absolute top-8 right-8">
						<label
							htmlFor="search"
							className="flex font-semibold text-[#9E896A] overflow-hidden items-center bg-white/70 px-2.5 rounded-full w-96"
						>
							<span className="sr-only">Pesquisa</span>
							<FaSearch />
							<input
								type="text"
								id="search"
								name="search"
								placeholder="Pesquisar ..."
								className="bg-transparent placeholder:text-[#9E896A]/50 w-full p-2.5 mx-4"
							/>
						</label>
						<img
							src="https://igor-ca.github.io/cinema-recomendation-frontend/assets/image.png"
							alt=""
							className="rounded-full aspect-square h-10 cursor-pointer"
						/>
					</div>
					<div className="bg-[url(https://ntvb.tmsimg.com/assets/p16645155_v_h8_ae.jpg?w=960&h=540)] bg-no-repeat bg-cover bg-bottom	w-full h-80 rounded-b-3xl shadow-xl"></div>
				</div>
			</div>

			<h1 className="block mx-auto w-fit text-center border-b-[#9E896A] text-[#9E896A] text-3xl font-semibold mt-4 border-b-4">
				Mais assistidos
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
