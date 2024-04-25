import { FaRegUser } from "react-icons/fa";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Page404 from "./Page404";
import { useEffect, useState } from "react";

export default function ProfilePage() {
	const location = useLocation();
	const [activeLink, setActiveLink] = useState(
		location.pathname.replace("/profile/", "")
	);

	useEffect(() => {
		setActiveLink(location.pathname.replace("/profile/", ""));
	}, [location]);
	return (
		<div className="text-[#9E896A] w-full p-6">
			<div className="flex justify-between w-full">
				<div className="flex gap-2 items-end">
					<FaRegUser className="text-6xl" />
					<div className="border-b-2 border-[#9E896A] space-x-3">
						<span className="text-2xl">Nome de usuário</span>
						<button className="bg-[#9E896A] text-white px-5 rounded-md ">
							Editar
						</button>
					</div>
				</div>
				<div className="text-center border-b-2 border-[#9E896A] text-2xl">
					3 <br />
					filmes assistidos
				</div>
			</div>

			<nav className="mt-5 text-white bg-[#9E896A] p-2 rounded-md">
				<ul className="flex gap-2 justify-around text-center">
					<li className={getStyle(activeLink === "")}>
						<Link to={"./"} className="w-full block">Perfil</Link>
					</li>
					<li className={getStyle(activeLink === "feed")}>
						<Link to={"./feed"} className="w-full block">Atividade</Link>
					</li>
					<li className={getStyle(activeLink === "favorites")}>
						<Link to={"./favorites"} className="w-full block">Favoritos</Link>
					</li>
					<li className={getStyle(activeLink === "list")}>
						<Link to={"./list"} className="w-full block">Minha lista</Link>
					</li>
					<li className={getStyle(activeLink === "settings")}>
						<Link to={"./settings"} className="w-full block">Ajustes</Link>
					</li>
					<li className={getStyle(activeLink === "logout")}>
						<Link to={"./logout"} className="w-full block">Sair</Link>
					</li>
				</ul>
			</nav>

			<div>
				<Routes>
					<Route path="/*" element={<Page404 />}></Route>
				</Routes>
			</div>
		</div>
	);
}

const getStyle = (condition) => {
	return condition
		? "p-1 flex-grow bg-white text-[#9E896A] rounded-sm"
		: "p-1 flex-grow hover:bg-white hover:text-[#9E896A] rounded-sm";
};
