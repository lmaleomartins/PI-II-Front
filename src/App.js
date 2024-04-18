import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import Page404 from "./pages/Page404";

function App() {
	const [state, setState] = useState("Register");

	const toggleState = () => {
		state === "Login" ? setState("Register") : setState("Login");
	};

	return (
		<div className="bg-slate-50 min-h-svh text-slate-700 dark:bg-slate-800 dark:text-slate-300">
			<BrowserRouter basename="/">
				<Routes>
					<Route path="/" element={<LoginSignupPage />}></Route>
					<Route path="/signup" element={<LoginSignupPage />}></Route>
					<Route path="/login" element={<LoginSignupPage />}></Route>
					<Route path="/*" element={<Page404 />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
