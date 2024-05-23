import { FaSearch } from "react-icons/fa";
import data from "../Data.json";
import MoviesList from "../components/MoviesList";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

export default function BrowserPage() {
	const [page, setPage] = useState(1);
	const [moviesList, setMoviesList] = useState([]);
	const observer = useRef();

	useEffect(() => {
        const fetchPage = async (pageNumber) => {
            try {
                const response = await axios({
                    method: "GET",
                    url: `http://127.0.0.1:8000/movies/?page=${pageNumber}`,
                });
				if (moviesList.length > 0){
					setMoviesList(prevMovies => [...prevMovies, ...response.data.results]);
				}else{
					setMoviesList([...response.data.results]);
				}
				console.log(pageNumber)
            } catch (error) {
                console.log(error);
            }
        };
        fetchPage(page);
    }, [page]);

	const lastMovieElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, []);


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

			{moviesList.length > 0 && <MoviesList list={moviesList} lastMovieElementRef={lastMovieElementRef} />}
		</div>
	);
}
