import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";

export default function StarRating() {
    const [rating, setRating] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                // Obtendo a média de avaliações
                const avgResponse = await api.get(`/average-ratings`);
                const movieData = avgResponse.data.find(movie => movie.movie === parseInt(id));
                if (movieData) setRating(movieData.avg_rating);

                // Obtendo a avaliação do usuário
                if (localStorage.getItem("accessToken")) {
                    const userResponse = await api.get(`/movies/${id}/user-rating/`);
                    setRating(userResponse.data.rating);
                }
            } catch (error) {
                console.error("Error fetching ratings:", error);
            }
        };
        fetchRatings();
    }, [id]);

    const handleChange = async (event, value) => {
        try {
            // Enviando avaliação do usuário
            const response = await api.post(`/movies/${id}/rate/`, { rating: value });
            if (response.data.rating) setRating(response.data.rating.rating);
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    };

    return (
        <Rating
            name="movie-rating"
            value={rating}
            precision={0.5}
            onChange={handleChange}
        />
    );
}