import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";

export default function StarRating() {
	const [rating, setRating] = useState(0)
	const { id } = useParams();

	useEffect( () => {
		const fetchRating = async () => {
			try {
				const response = await api.get(`/average-ratings`)
				const filteredMovie = response.data.filter(movie => movie.movie === +id)[0]
				const average = filteredMovie.avg_rating
				if(average){
					setRating(average)
				}
			} catch (error) {
				console.log(error)
			}
		}
		const fetchUserRating = async () => {
			try {
				const response = await api.get(`/user-rating/${id}`)
				const userRating = response.data.rating
				setRating(userRating)
			} catch (error) {
				console.log(error)
			}
		}
		if(localStorage.getItem("accessToken")){
			fetchUserRating()
		}
		fetchRating()
	}, [])
	const handleChange = async(e) => {
		console.log(e.target.value)
		try {
			const notaNova = e.target.value
			const response = await api.post(`/user-rating/${id}/`, {
				rating: parseInt(notaNova),
			})
			const nota = response.data
			if(nota){
				setRating(nota)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Rating name="half-rating-read" defaultValue={0} precision={0.5} onChange={handleChange} value={rating}/>
	);
}
