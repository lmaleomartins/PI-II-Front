import { FaSearch } from "react-icons/fa";
import GenreComponent from "../components/GenreComponent";

const genres = [
	"Ação",
	"Aventura",
	"Comédia",
	"Cinema e Arte",
	"Drama",
	"Documentário",
	"Fantasia",
	"Ficção Científica",
	"Terror",
	"Música",
	"Mistério",
	"Psicológico",
	"Sobrenatural",
	"Romance",
];

export default function GenresPage() {
	return (
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
						className="bg-[#9E896A] placeholder:text-white/50 w-full p-2.5 mx-4"
					/>
				</label>

				<img
					src="https://igor-ca.github.io/cinema-recomendation-frontend/assets/image.png"
					alt=""
                    className="rounded-full aspect-square h-10 cursor-pointer"
				/>
			</div>

			<h1 className="block mx-auto w-fit text-center border-b-[#9E896A] text-[#9E896A] text-3xl font-semibold mt-4 border-b-4">
				Minhas preferências
			</h1>
			<div className="grid grid-cols-5 py-8 gap-8">
				{genres.map((genre) => (
					<GenreComponent genre={genre}></GenreComponent>
				))}
			</div>
		</div>
	);
}
