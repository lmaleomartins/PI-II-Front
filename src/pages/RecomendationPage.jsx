import { FaSearch } from "react-icons/fa";
import data from "../Data.json";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import MoviesList from "../components/MoviesList";

export default function RecomendationPage({ userInfo }) {
	const { id } = useParams();
	const [recomendations, setRecomendations] = useState([]);
	useEffect(()=> {
		const fetchRecomended = async () => {
			try {
				const response = await api.get(`/recommendations/genre/`);
				const recomendations = response.data;
				console.log(recomendations);
				setRecomendations(recomendations);
			} catch (error) {
				console.log(error);
			}
		};
		fetchRecomended()
	},[])
	return userInfo ? (
		<div className="flex-grow w-full">
			<h1 className="block mx-auto w-fit text-center border-b-[#9E896A] text-[#9E896A] text-3xl font-semibold mt-4 border-b-4">
				Recomendações para você
			</h1>

			<MoviesList list={recomendations} />
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
