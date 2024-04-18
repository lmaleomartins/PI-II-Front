import { useState } from "react";

function App() {
	const [state, setState] = useState("Register");

	const toggleState = () => {
		state === "Login" ? setState("Register") : setState("Login");
	};

	return (
		<div className="bg-[#FAF9F6] flex  w-full">
			<div className="relative rounded-r-3xl overflow-hidden">
				<div className="absolute w-full h-screen bg-gradient-to-b from-[#977644]/30 to-black/30 z-10 "></div>
				<img
					src="https://igor-ca.github.io/cinema-recomendation-frontend/assets/image.png"
					alt="cinema"
					className="grayscale max-h-screen w-full"
				/>
				<div className="absolute bottom-0 text-white p-12">
					<p className="text-2xl font-bold">Lorem ipsum is simply</p>
					<p>Lorem ipsum is simply</p>
				</div>
			</div>

			<div className="flex-grow flex justify-center items-center">
				<div className="flex flex-col items-center max-w-md">
					<h1 className="font-semibold">welcome to lorem...!</h1>
					<div className="bg-[#F8EDDD] flex w-fit rounded-full p-2 mb-3 mt-6">
						<button
							className={
								state === "Login"
									? "py-2 px-10 bg-[#9E896A] rounded-full text-white"
									: "py-2 px-10 text-[#9E896A]"
							}
							onClick={toggleState}
						>
							Login
						</button>
						<button
							className={
								state === "Register"
									? "py-2 px-10 bg-[#9E896A] rounded-full text-white"
									: "py-2 px-10 text-[#9E896A]"
							}
							onClick={toggleState}
						>
							Register
						</button>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Corporis sint facilis, voluptas possimus
					</p>
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
					{state === "Register" && (
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
					{state === "Login" && (
						<a
							href="/forgot"
							className="underline text-[#9E896A] self-end my-1"
						>
							Forgot password?
						</a>
					)}
					<button className="py-2 px-10 bg-[#9E896A] rounded-full text-white self-end mt-4">
						Register
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
