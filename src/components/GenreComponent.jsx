import React, { forwardRef, useEffect, useState } from "react";

const checkIfInList = (userGenres, id) => {
	if (!userGenres) return false;
	if (userGenres.length === 0) return false;

	const list = userGenres.map((genre) => genre.id);
	const value = list.includes(id);
	return value;
};

const GenreComponent = forwardRef(({ genre, userGenres }, ref) => {
	const { name, pt_name, id } = genre;
	const [checked, setChecked] = useState(checkIfInList(userGenres, id));

	useEffect(() => {
		setChecked(checkIfInList(userGenres, id));
	}, [userGenres]);
	
	const handleChange = (e) => {
		console.log(checked);
		setChecked(e.target.checked);
	};
	return (
		<div className="relative h-fit rounded-lg overflow-hidden text-center shadow-lg aspect-[2/3]">
			<label
				htmlFor={id}
				className="text-white p-20 cursor-pointer font-semibold text-2xl absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			>
				{pt_name}
				{checked}
			</label>
			<input
				type="checkbox"
				name={`${name}-checkmark`}
				id={id}
				ref={ref}
				onChange={handleChange}
				checked={checked}
				className="hidden peer"
			/>
			<div className="absolute w-full h-full bg-gradient-to-b rounded from-[#977644]/30 to-black/30 z-10 peer-checked:border-8 border-[#977644]"></div>
			<img
				src={`https://raw.githubusercontent.com/Igor-CA/cinema-recomendation-frontend/creating-main-screens/public/assets/${pt_name}.jpg`}
				alt={`${pt_name}-cover`}
				className="w-full h-full object-cover"
			/>
		</div>
	);
});

export default GenreComponent;
