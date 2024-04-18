import { useLocation, useNavigate } from "react-router-dom";

export default function ToggleButton() {
    const page = useLocation().pathname === "/login"? "Login":"Register"
    const navigate = useNavigate()
	const changePage = () => {
        page === "Login"?navigate("/signup"):navigate("/login")
    }
    return (
		<div className="flex w-fit relative bg-[#F8EDDD]  shadow-md p-2 mb-3 mt-6 rounded-full">
			<input
				type="radio"
				id="radio-1"
				name="tabs"
				className="hidden peer/login"
				onChange={changePage}
				checked={page === "Login"}
			/>
			<label
				className="text-[#9E896A] font-semibold rounded-full z-10 cursor-pointer transition peer-checked/login:text-white py-2 px-10"
				for="radio-1"
			>
				Login
			</label>
			<input
				type="radio"
				id="radio-2"
				name="tabs"
				onChange={changePage}
				className="hidden peer/signup"
				checked={page === "Register"}
			/>
			<label
				className="text-[#9E896A] font-semibold rounded-full z-10 cursor-pointer transition peer-checked/signup:text-white py-2 px-10"
				for="radio-2"
			>
				Signup
			</label>
			<span className="absolute h-10 w-[121px] bg-[#9E896A] rounded-full transition peer-checked/login:translate-x-0 peer-checked/signup:w-[130px] peer-checked/signup:translate-x-[121px]"></span>
		</div>
	);
}
