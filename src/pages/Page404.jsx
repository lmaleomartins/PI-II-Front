import { Link } from "react-router-dom";

export default function Page404() {
	return (
		<div className="p-5 text-slate-400 flex-grow dark:text-slate-500 text-center text-5xl font-extrabold min-h-svh flex flex-col justify-center">
			<span>404</span>
			<span>Page not found</span>
			<span>It may still be in development</span>
			<Link
				className="text-base underline mt-3 hover:text-slate-500 dark:hover:text-slate-400"
				to={"/"}
			>
				Return to main page
			</Link>
		</div>
	);
}
