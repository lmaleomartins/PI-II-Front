import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import Page404 from "./pages/Page404";
import BrowserPage from "./pages/BrowserPage";
import NavBar from "./components/NavBar";
import GenresPage from "./pages/GenresPage";
import RecomendationPage from "./pages/RecomendationPage";
import ProfilePage from "./pages/ProfilePage";
import MoviePage from "./pages/MoviePage";

function App() {
	return (
		<div className="bg-[#FAF9F6] min-h-svh text-slate-700 dark:bg-slate-800 dark:text-slate-300 flex">
			<BrowserRouter basename="/">
				<NavBar></NavBar>
				<Routes>
					<Route path="/" element={<BrowserPage />}></Route>
					<Route path="/genres" element={<GenresPage />}></Route>
					<Route path="/recomendations" element={<RecomendationPage />}></Route>
					<Route path="/movie/:id" element={<MoviePage />}></Route>
					<Route path="/profile/*" element={<ProfilePage />}></Route>
					<Route path="/signup" element={<LoginSignupPage />}></Route>
					<Route path="/login" element={<LoginSignupPage />}></Route>
					<Route path="/*" element={<Page404 />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
