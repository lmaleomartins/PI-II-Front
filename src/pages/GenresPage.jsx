import { FaSearch } from "react-icons/fa";
import GenreComponent from "../components/GenreComponent";
import { useEffect, useRef, useState } from "react";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

const genres = [
	{
		id: 58,
		name: "Action",
		pt_name: "Ação",
	},
	{
		id: 59,
		name: "Crime",
		pt_name: "Crime",
	},
	{
		id: 60,
		name: "Thriller",
		pt_name: "Suspense",
	},
	{
		id: 61,
		name: "Horror",
		pt_name: "Terror",
	},
	{
		id: 62,
		name: "Mystery",
		pt_name: "Mistério",
	},
	{
		id: 63,
		name: "Adventure",
		pt_name: "Aventura",
	},
	{
		id: 64,
		name: "Science Fiction",
		pt_name: "Ficção Científica",
	},
	{
		id: 65,
		name: "Drama",
		pt_name: "Drama",
	},
	{
		id: 66,
		name: "Animation",
		pt_name: "Animação",
	},
	{
		id: 67,
		name: "Family",
		pt_name: "Família",
	},
	{
		id: 68,
		name: "Fantasy",
		pt_name: "Fantasia",
	},
	{
		id: 69,
		name: "Comedy",
		pt_name: "Comédia",
	},
	{
		id: 70,
		name: "War",
		pt_name: "Guerra",
	},
	{
		id: 71,
		name: "Romance",
		pt_name: "Romance",
	},
	{
		id: 72,
		name: "History",
		pt_name: "História",
	},
	{
		id: 73,
		name: "Documentary",
		pt_name: "Documentário",
	},
	{
		id: 74,
		name: "Music",
		pt_name: "Música",
	},
	{
		id: 75,
		name: "TV Movie",
		pt_name: "Seriados",
	},
	{
		id: 76,
		name: "Western",
		pt_name: "Faroeste",
	},
];

export default function GenresPage({ userInfo }) {
	const genresRefs = useRef({});
	const [userGenres, setUserGenres] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			console.log({ userInfo });
			if (userInfo) {
				try {
					const response = await api.get(`/users/${userInfo.id}`);
					setUserGenres(response.data.favorite_genres);
				} catch (error) {
					console.log(error);
				}
			}
		};
		fetchUser();
	}, [userInfo]);

	const getLists = () => {
		const addList = [];
		const removeList = [];

		for (const genreId in genresRefs.current) {
			if (genresRefs.current[genreId].checked) {
				addList.push(+genreId);
			} else {
				removeList.push(+genreId);
			}
		}

		console.log("True List:", addList);
		console.log("False List:", removeList);
		return { addList, removeList };
	};
	const updateGenresList = async () => {
		const { addList, removeList } = getLists();
	
		try {
			// Enviar a lista de adição, mesmo que esteja vazia
			await api.post(`/users/${userInfo.id}/add-favorite-genre/`, {
				genre_ids: addList,
			});
	
			// Enviar a lista de remoção, mesmo que esteja vazia
			await api.post(`/users/${userInfo.id}/remove-favorite-genre/`, {
				genre_ids: removeList,
			});
	
			navigate(`/recomendations`);
		} catch (error) {
			console.error("Erro ao atualizar gêneros:", error);
			alert("Erro ao salvar suas preferências. Tente novamente.");
		}
	};	
	return userInfo ? (
		<div className="p-8 flex flex-col">
			<div className="flex items-center gap-4 self-end">
				<label
					htmlFor="search"
					className="flex text-white overflow-hidden items-center bg-[#9E896A] px-2.5 rounded-full w-96"
				>
					<span className="sr-only">Pesquisa</span>
					<FaSearch />
					<input
						type="text"
						id="search"
						name="search"
						placeholder="Pesquisar ..."
						className="bg-[#9E896A] placeholder:text-white/50 w-full p-2.5 mx-4 focus:outline-none"
					/>
				</label>
			</div>

			<h1 className="block mx-auto w-fit text-center border-b-[#9E896A] text-[#9E896A] text-3xl font-semibold mt-4 border-b-4">
				Minhas preferências
			</h1>
			<div className="grid grid-cols-5 py-8 gap-8">
				{genres.map((genre) => (
					<GenreComponent
						key={genre.id}
						genre={genre}
						userGenres={userGenres}
						ref={(element) =>
							(genresRefs.current[genre.id] = element)
						}
					></GenreComponent>
				))}
			</div>
			<button
				className="text-white bg-[#9E896A] p-2 rounded-md mt-3 w-full"
				onClick={updateGenresList}
			>
				Salvar seleção
			</button>
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
