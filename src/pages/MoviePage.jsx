import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../Data.json";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import StarRating from "../components/StarRating";
import axios from "axios";
import api from "../utils/api";
import MoviesList from "../components/MoviesList";

export default function MoviePage({ userInfo }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [movie, setMovie] = useState();
	const [search, setSearch] = useState("");
	const [recomendations, setRecomendations] = useState([]);
	const [userList, setUserList] = useState([]);
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		const fetchList = async () => {
			try {
				const response = await api.get(`/watched-list/`);
				const list = response.data.map((object) => object.movie);
				setUserList(list);
			} catch (error) {
				console.log(error);
			}
		};
		if (userInfo) {
			fetchList();
		}
		setUpdated(false);
	}, [updated]);
	useEffect(() => {
		const fetchPage = async () => {
			try {
				const response = await axios({
					method: "GET",
					url: `http://127.0.0.1:8000/movies/${id}`,
				});
				const selectedMovie = response.data;
				setMovie(selectedMovie);
			} catch (error) {
				console.log(error);
			}
		};
		const fetchRecomended = async () => {
			try {
				const response = await api.get(`/recommendations/similarity/${id}`);
				const recomendations = response.data;
				console.log(recomendations);
				setRecomendations(recomendations);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPage();
		fetchRecomended();
	}, [id]);

	const checkWatchedMovie = () => {
		if (userList) {
			return userList.map((movie) => movie.id.toString()).includes(id);
		}
		return false;
	};
	const addOrRemoveMovie = async () => {
		try {
			const movieInList = checkWatchedMovie();
			const url = movieInList
				? "/watched-list/remove/"
				: "/watched-list/add/";
			const packageData = movieInList ? { movie_id: id } : { movie: id };
			await api.post(url, packageData);
			setUpdated(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		const inputValue = e.target.value;
		setSearch(inputValue);
	};
	const handleEnter = (e) => {
		if (e.key === "Enter") navigate(`/?search=${search}`);
	};

	return movie ? (
		<div className="bg-[#FAF9F6] text-[#9E896A] w-full min-h-screen absolute left-0 p-5">
			<div className="max-w-6xl m-auto">
				<div className="flex justify-between items-center">
					<button
						className="bg-[#9E896A] rounded-md text-white text-3xl p-2"
						aria-label="back to main"
						onClick={() => {
							navigate(-1);
						}}
					>
						<IoIosArrowBack />
					</button>
					<div className="flex items-center gap-4">
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
								value={search}
								onKeyDown={handleEnter}
								onChange={handleChange}
								className="bg-[#9E896A] placeholder:text-white/50 w-full p-2.5 mx-4"
							/>
						</label>
					</div>
				</div>
				<div className="flex justify-center mt-5">
					<div>
						<img
							className="max-w-80 rounded-lg shadow-xl"
							src={`https://image.tmdb.org/t/p/w500/${movie.poster_url}`}
							alt=""
						/>
						<div className="flex gap-2 justify-between items-baseline">
							<button
								className="text-white bg-[#9E896A] p-2 rounded-md mt-3 w-full"
								onClick={addOrRemoveMovie}
							>
								{checkWatchedMovie()
									? "Remover da lista"
									: "Minha lista"}
							</button>
							<StarRating></StarRating>
						</div>
					</div>
					<div className="flex-grow">
						<h1 className="px-5 w-fit border-b-[#9E896A] text-2xl font-semibold border-b-4">
							{movie.title}
						</h1>
						<h2 className="pl-5 my-2 w-fit text-xl font-semibold mt-8">
							Sinopse
						</h2>
						<p className="pl-5 indent-4">{movie.description}</p>
					</div>
				</div>
				<h2 className="w-fit border-b-[#9E896A] text-2xl font-semibold border-b-4 mt-2">
					Titulos semelhantes
				</h2>
				<div className="-mx-8">
					<MoviesList list={recomendations} />
				</div>
			</div>
		</div>
	) : null;
}
