import { FaRegUser } from "react-icons/fa";
import {
	Link,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import Page404 from "./Page404";
import { useEffect, useState } from "react";
import data from "../Data.json";
import api from "../utils/api";
import MoviesList from "../components/MoviesList";

export default function ProfilePage({ userInfo, setUserInfo }) {
	const location = useLocation();
	const navigate = useNavigate();
	const [activeLink, setActiveLink] = useState(
		location.pathname.replace("/profile", "")
	);
	const [userList, setUserList] = useState([]);

	useEffect(() => {
		const fetchList = async () => {
			const response = await api.get(`/watched-list/`);
			const list = response.data.map((object) => object.movie);
			console.log(list);
			setUserList(list);
		};
		if (userInfo) {
			fetchList();
		}
	}, [userInfo]);

	useEffect(() => {
		setActiveLink(location.pathname.replace("/profile", ""));
	}, [location]);

	const logout = async () => {
		try {
			const refreshToken = { refresh: userInfo.refreshToken };
			console.log("User info:", userInfo);
			await api.post("/logout/", refreshToken);
			localStorage.clear();
			setUserInfo(null);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	return userInfo ? (
		<div className="text-[#9E896A] w-full p-6">
			<div className="flex justify-between w-full">
				<div className="flex gap-2 items-end">
					<FaRegUser className="text-6xl" />
					<div className="border-b-2 border-[#9E896A] space-x-3">
						<span className="text-2xl">{userInfo.username}</span>
						<button className="bg-[#9E896A] text-white px-5 rounded-md ">
							Editar
						</button>
					</div>
				</div>
				<div className="text-center border-b-2 border-[#9E896A] text-2xl">
					{userList.length} <br />
					filmes assistidos
				</div>
			</div>

			<nav className="mt-5 text-white bg-[#9E896A] p-2 rounded-md">
				<ul className="flex gap-2 justify-around text-center">
					<li className={getStyle(activeLink === "/favorites")}>
						<Link to={"./favorites"} className="w-full block">
							Favoritos
						</Link>
					</li>
					<li
						className={getStyle(
							activeLink === "/list" || activeLink === ""
						)}
					>
						<Link to={"./list"} className="w-full block">
							Minha lista
						</Link>
					</li>
					<li className={getStyle(activeLink === "/logout")}>
						<button className="w-full" onClick={logout}>
							Sair
						</button>
					</li>
				</ul>
			</nav>

			<div>
				<Routes>
					<Route
						path="/favorites"
						element={
							<div className="grid grid-cols-5 h-fit gap-8 p-8">
								{data.map((movie, i) => {
									if (i % 2) return null;
									return (
										<img
											className="w-full rounded-lg shadow-xl"
											src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
											alt=""
										/>
									);
								})}
							</div>
						}
					></Route>
					<Route
						path="/"
						element={<MoviesList list={userList} />}
					></Route>
					<Route
						path="/list"
						element={<MoviesList list={userList} />}
					></Route>
					<Route path="/*" element={<Page404 />}></Route>
				</Routes>
			</div>
		</div>
	) : (
		<div className="p-5 text-slate-400 flex-grow dark:text-slate-500 text-center text-5xl font-extrabold min-h-svh flex flex-col justify-center">
			<span>404</span>
			<span>Usuário não autenticado</span>
			<span>Favor logar para poder ver essa pagina</span>
			<Link
				className="text-base underline mt-3 hover:text-slate-500 dark:hover:text-slate-400"
				to={"/login"}
			>
				logar
			</Link>
		</div>
	);
}

const getStyle = (condition) => {
	return condition
		? "p-1 flex-grow bg-white text-[#9E896A] rounded-sm"
		: "p-1 flex-grow hover:bg-white hover:text-[#9E896A] rounded-sm";
};
