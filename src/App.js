import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import Page404 from "./pages/Page404";
import BrowserPage from "./pages/BrowserPage";
import NavBar from "./components/NavBar";
import GenresPage from "./pages/GenresPage";
import RecomendationPage from "./pages/RecomendationPage";
import ProfilePage from "./pages/ProfilePage";
import MoviePage from "./pages/MoviePage";
import { useEffect, useState } from "react";

function App() {
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");
		const username = localStorage.getItem("username");
		const id = localStorage.getItem("id");
		if (accessToken && username) {
			setUserInfo({ accessToken, refreshToken, username, id });
		}
	}, []);
	return (
		<div className="bg-[#FAF9F6] min-h-svh text-slate-700 dark:bg-slate-800 dark:text-slate-300 flex">
			<BrowserRouter basename="/">
				<NavBar userInfo={userInfo} setUserInfo={setUserInfo}></NavBar>
				<Routes>
					<Route path="/" element={<BrowserPage />}></Route>
					<Route
						path="/genres"
						element={<GenresPage userInfo={userInfo} />}
					></Route>
					<Route
						path="/recomendations"
						element={<RecomendationPage userInfo={userInfo} />}
					></Route>
					<Route
						path="/movie/:id"
						element={<MoviePage userInfo={userInfo} />}
					></Route>
					<Route
						path="/profile/*"
						element={
							<ProfilePage
								userInfo={userInfo}
								setUserInfo={setUserInfo}
							/>
						}
					></Route>
					<Route path="/signup" element={<LoginSignupPage />}></Route>
					<Route
						path="/login"
						element={<LoginSignupPage setUserInfo={setUserInfo} />}
					></Route>
					<Route path="/*" element={<Page404 />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
