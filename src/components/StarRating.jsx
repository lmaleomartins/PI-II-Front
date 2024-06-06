import React from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating() {
	return (
		<fieldset className="flex justify-center text-xl text-gray-400">
			<FaStar/>
			<FaStar/>
			<FaStar/>
			<FaStar/>
			<FaStar/>
		</fieldset>
	);
}
