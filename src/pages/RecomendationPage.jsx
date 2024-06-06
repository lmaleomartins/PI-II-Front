import { FaSearch } from "react-icons/fa";
import data from "../Data.json";
import { Link } from "react-router-dom";

export default function RecomendationPage({ userInfo }) {
	return userInfo ? (
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
	) : (
		<div className="p-5 text-slate-400 flex-grow dark:text-slate-500 text-center text-5xl font-extrabold min-h-svh flex flex-col justify-center">
			<span>404</span>
			<span>Usuário não autenticado</span>
			<span>Favor logar para poder ver essa pagina</span>
			<Link
				className="text-base underline mt-3 hover:text-slate-500 dark:hover:text-slate-400"
				to={"/login"}
			>
				logar
			</Link>
		</div>
	);
}
