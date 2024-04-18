import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi";
import { FaCommentDots, FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoLogIn, IoLogOut } from "react-icons/io5";

export default function NavBar() {
	return (
		<nav className="bg-white px-4 py-8 w-fit h-svh text-2xl rounded-r-xl shadow-lg sticky top-0 flex flex-col justify-between">
			<ul className="flex flex-col space-y-4">
				<li>
					<Link to={"/"} className="flex items-center gap-2 bg-[#9E896A] rounded-md p-2 text-white">
						<TiHome />
						Inicio
					</Link>
				</li>
				<li>
					<Link to={"/genres"} className="flex items-center gap-2 rounded-md p-2">
						<TbEdit />
						Gêneros
					</Link>
				</li>
				<li>
					<Link to={"/recomendations"} className="flex items-center gap-2 rounded-md p-2">
						<BiSolidCategory />
						Recomendações
					</Link>
				</li>
				<li>
					<Link to={"/profile"} className="flex items-center gap-2 rounded-md p-2">
						<FaUsers />
						Perfil
					</Link>
				</li>
				<li>
					<Link to={"/suport"} className="flex items-center gap-2 rounded-md p-2">
						{" "}
						<FaCommentDots />
						Suporte
					</Link>
				</li>
				<li>
					<Link to={"/settings"} className="flex items-center gap-2 rounded-md p-2">
						<FaGear />
						Ajustes
					</Link>
				</li>
			</ul>

			<Link to={"/login"} className="flex items-center gap-2 bg-[#9E896A]/30 rounded-md p-2">
                <IoLogIn />
				Login
			</Link>
		</nav>
	);
}
