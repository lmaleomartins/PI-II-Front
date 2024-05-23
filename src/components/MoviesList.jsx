export default function MoviesList({ list, lastMovieElementRef }) {
	return (
		<div className="grid grid-cols-5 h-fit gap-8 p-8">
			{list.map((movie, index) => {
				if (index === list.length - 1) {
					return (
						<a
							href={`/movie/${movie.id}`}
							key={movie.id}
							ref={lastMovieElementRef}
						>
							<img
								className="w-full rounded-lg shadow-xl"
								src={`https://image.tmdb.org/t/p/w300/${movie.poster_url}`}
								alt=""
							/>
						</a>
					);
				} else {
					return (
						<a href={`/movie/${movie.id}`} key={movie.id}>
							<img
								className="w-full rounded-lg shadow-xl"
								src={`https://image.tmdb.org/t/p/w300/${movie.poster_url}`}
								alt=""
							/>
						</a>
					);
				}
			})}
		</div>
	);
}
