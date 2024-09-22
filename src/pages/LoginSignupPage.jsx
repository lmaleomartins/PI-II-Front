import { Link, useLocation, useNavigate } from "react-router-dom";
import ToggleButton from "../components/ToggleButton";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import api from "../utils/api";

export default function LoginSignupPage({ setUserInfo }) {
	const page = useLocation().pathname === "/login" ? "Login" : "Register";
	const [formData, setFormData] = useState({ username: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const login = async () => {
		try {
			const response = await api.post("/api/token/", formData);
			const accessToken = response.data.access;
			const username = response.data.username;
			if (accessToken && username) {
				setUserInfo({
					username,
					accessToken,
					refreshToken: response.data.refresh,
					id: response.data.id,
				});
			}
			localStorage.setItem("username", username);
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", response.data.refresh);
			localStorage.setItem("id", response.data.id);
			console.log("Response:", response.data);
			navigate(`/profile`);
		} catch (error) {
			console.log(error);
		}
	};
	const register = async () => {
		try {
			const response = await axios({
				method: "POST",
				data: formData,
				withCredentials: true,
				headers: {
					Authorization: process.env.REACT_APP_API_KEY,
				},
				url: `http://127.0.0.1:8000/register/`,
			});
			console.log(response);
			navigate(`/login`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		page === "Login" ? login() : register();
	};

	return (
		<div className="bg-[#FAF9F6] flex w-full absolute left-0">
			<div className="relative rounded-r-3xl overflow-hidden">
				<div className="absolute w-full h-screen bg-gradient-to-b from-[#977644]/30 to-black/30 z-10 "></div>
				<img
					src="https://igor-ca.github.io/cinema-recomendation-frontend/assets/image.png"
					alt="cinema"
					className="grayscale max-h-screen w-full"
				/>
				<button
					className="absolute top-0 z-20 text-white text-3xl p-3"
					aria-label="back to main"
					onClick={() => {
						navigate("/");
					}}
				>
					<IoIosArrowBack />
				</button>
				<div className="absolute bottom-0 text-white p-12">
					<p className="text-2xl font-bold">
						Primeira regra do Clube da Luta: você não fala do Clube
						da Luta
					</p>
					<p>Primeira regra do Director's Cut: você fala sobre o Director's Cut</p>
					
				</div>
			</div>

			<div className="flex-grow flex justify-center pt-20">
				<div className="flex flex-col items-center max-w-md">
					<h1 className="font-semibold">Bem-vindo ao Director's Cut</h1>

					<ToggleButton></ToggleButton>
					<br />
					<p>
						Sua busca interminável por algo para assistir acaba
						aqui.
					</p>
					<br />

					<form
						className="flex self-stretch flex-col"
						action="post"
						onSubmit={handleSubmit}
					>
						<label
							className="self-start w-full mb-6"
							htmlFor="username"
						>
							Usuário
							<input
								onChange={handleChange}
								type="text"
								id="username"
								name="username"
								className="rounded-full border border-[#9E896A] w-full p-2.5 mt-2"
								placeholder="Insira seu nome de usuário"
							/>
						</label>

						<label
							className="self-start w-full mb-6"
							htmlFor="password"
						>
							Senha
							<input
								onChange={handleChange}
								type="password"
								id="password"
								name="password"
								className="rounded-full border border-[#9E896A] w-full p-2.5 mt-2"
								placeholder="Insira sua senha"
							/>
						</label>
						{page === "Register" && (
							<label
								className="self-start w-full mb-6"
								htmlFor="email"
							>
								Email
								<input
									onChange={handleChange}
									type="email"
									id="email"
									name="email"
									className="rounded-full border border-[#9E896A] w-full p-2.5 mt-2"
									placeholder="Insira seu email"
								/>
							</label>
						)}
						{page === "Login" && (
							<Link
								to="/forgot"
								className="underline text-[#9E896A] self-end my-1"
							>
								Esqueci minha senha
							</Link>
						)}
						<button
							className="py-2 px-10 bg-[#9E896A] rounded-full text-white self-end mt-4"
							onClick={handleSubmit}
						>
							{page === "Login" ? "Login" : "Registrar"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
