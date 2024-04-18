import { useLocation, useNavigate } from "react-router-dom";
import ToggleButton from "../components/ToggleButton";
import { IoIosArrowBack } from "react-icons/io";

export default function LoginSignupPage(){
    const page = useLocation().pathname === "/login"? "Login":"Register"
	const navigate = useNavigate()
    return (
		<div className="bg-[#FAF9F6] flex w-full absolute left-0">
			<div className="relative rounded-r-3xl overflow-hidden">
				<div className="absolute w-full h-screen bg-gradient-to-b from-[#977644]/30 to-black/30 z-10 "></div>
				<img
					src="https://igor-ca.github.io/cinema-recomendation-frontend/assets/image.png"
					alt="cinema"
					className="grayscale max-h-screen w-full"
				/>
				<button className="absolute top-0 z-20 text-white text-3xl p-3" aria-label="back to main" onClick={() => {navigate("/")}}>
					<IoIosArrowBack/>
				</button>
				<div className="absolute bottom-0 text-white p-12">
					<p className="text-2xl font-bold">Lorem ipsum is simply</p>
					<p>Lorem ipsum is simply</p>
				</div>
			</div>

			<div className="flex-grow flex justify-center items-center">
				<div className="flex flex-col items-center max-w-md">
					<h1 className="font-semibold">welcome to lorem...!</h1>
					
					<ToggleButton ></ToggleButton>
					
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Corporis sint facilis, voluptas possimus
					</p>
					<form className="flex self-stretch flex-col" action="">
						<label
							className="self-start w-full mb-6 mt-6"
							htmlFor="email"
						>
							Email address
							<input
								type="email"
								id="email"
								className="rounded-full border border-[#9E896A] w-full p-2.5 mt-2"
								placeholder="Enter your email adress"
							/>
						</label>
						{page === "Register" && (
							<label
								className="self-start w-full mb-6"
								htmlFor="username"
							>
								User name
								<input
									type="text"
									id="username"
									className="rounded-full border border-[#9E896A] w-full p-2.5 mt-2"
									placeholder="Enter your username"
								/>
							</label>
						)}
						<label
							className="self-start w-full mb-6"
							htmlFor="password"
						>
							Password
							<input
								type="password"
								id="password"
								className="rounded-full border border-[#9E896A] w-full p-2.5 mt-2"
								placeholder="Enter your password"
							/>
						</label>
						{page === "Login" && (
							<a
								href="/forgot"
								className="underline text-[#9E896A] self-end my-1"
							>
								Forgot password?
							</a>
						)}
						<button className="py-2 px-10 bg-[#9E896A] rounded-full text-white self-end mt-4">
							{page === "Login"?"Login":"Register"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}