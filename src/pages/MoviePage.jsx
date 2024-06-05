import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../Data.json";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import StarRating from "../components/StarRating";
import axios from "axios";

export default function MoviePage() {
	const { id } = useParams();
	const [movie, setMovie] = useState();
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

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
		fetchPage();
	}, [id]);

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
						<img
							src="https://igor-ca.github.io/cinema-recomendation-frontend/assets/image.png"
							alt=""
							className="rounded-full aspect-square h-10 cursor-pointer"
						/>
					</div>
				</div>
				<div className="flex justify-center mt-5">
					<div>
						<img
							className="max-w-80 rounded-lg shadow-xl"
							src={`https://image.tmdb.org/t/p/w500/${movie.poster_url}`}
							alt=""
						/>
						<div className="flex justify-between items-baseline">
							<button className="text-white bg-[#9E896A] p-2 rounded-md mt-3">
								Marcar como assistido
							</button>
							<StarRating></StarRating>
						</div>
					</div>
					<div>
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
				{/* <div className="grid grid-cols-5 h-fit gap-8 py-3">
					{data
						.filter((movieItem, index) => (movieItem.id.toString() !== id && index < 5))
						.map((movieItem) => {
							return (
								<a href={`/movie/${movieItem.id}`}>
									<img
										className="w-full rounded-lg shadow-xl"
										src={`https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`}
										alt=""
									/>
								</a>
							);
						})}
				</div> */}
			</div>
		</div>
	) : null;
}
