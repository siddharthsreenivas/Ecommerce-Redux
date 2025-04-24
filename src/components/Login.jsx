import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { BsBoxes } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, provider } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingGoogleBtn, setIsLoadingGoogleBtn] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email === "" || password === "") {
			toast.warning("Please fill out all the details.");
			return;
		}
		try {
			setIsLoading(true);
			await signInWithEmailAndPassword(auth, email, password);
			toast.success("Logged In successfully!");
			navigate("/");
			setEmail("");
			setPassword("");
		} catch (error) {
			const msg = error.message
				.replace("Firebase: ", "")
				.replace("Error (auth/", "")
				.replace(")", "")
				.replace(/-/g, " ");
			toast.error(
				msg.charAt(0).toUpperCase() + msg.slice(1) || "Something went wrong"
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleAuth = async () => {
		try {
			setIsLoadingGoogleBtn(true);
			await signInWithPopup(auth, provider);
			toast.success("Logged In successfully!");
			navigate("/");
		} catch (error) {
			console.log(error.message);
			toast.error("Something went wrong");
		} finally {
			setIsLoadingGoogleBtn(false);
		}
	};

	return (
		<div className="min-h-screen relative flex flex-col gap-5 p-4 items-center justify-center bg-slate-500">
			<Link
				to="/"
				className="px-5 absolute left-3 top-5 md:left-10 md:top-10 bg-slate-200 font-medium text-slate-800 py-2 rounded-lg hover:bg-slate-100"
			>
				Go to Home
			</Link>
			<div
				className="flex items-center gap-2 cursor-pointer"
				title="Sid E-Commerce"
			>
				<span className="font-extrabold text-4xl text-slate-900">Sid.</span>
				<BsBoxes size={32} className="text-slate-900" />
			</div>
			<p className="-mt-4 font-medium text-slate-800">Shopping made easy!</p>
			{/* main container */}
			<div className="bg-slate-700 sm:x-7 px-4 py-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-xl sm:text-2xl mb-5 font-bold text-slate-300 text-center">
					Login
				</h2>
				{/* form */}
				<form className="space-y-5" onSubmit={handleSubmit}>
					<div>
						<label className="text-slate-300 font-medium">Email:</label>
						<input
							type="email"
							placeholder="jhon123@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full border px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-slate-800"
						/>
					</div>
					<div>
						<label className="text-slate-300 font-medium">Password:</label>
						<input
							type="password"
							placeholder="*******"
							value={password}
							minLength={6}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full border px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-slate-800"
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full disabled:cursor-wait disabled:bg-black/50 bg-slate-900 font-medium text-white sm:text-lg py-2 rounded-lg hover:bg-slate-800"
					>
						{isLoading ? "Logging in..." : "Login"}
					</button>
				</form>
				{/* divider */}
				<div className="flex gap-3 my-5 items-center">
					<div className="h-0.5 rounded-full bg-slate-400 w-full" />
					<span className="text-slate-400 font-bold">x</span>
					<div className="h-0.5 rounded-full bg-slate-400 w-full" />
				</div>
				{/* register link */}
				<p className="text-center text-sm sm:text-base text-slate-300">
					Don't have an account? {""}
					<Link
						to="/register"
						className="underline underline-offset-2 hover:text-slate-400"
					>
						Register Now
					</Link>
				</p>
				{/* google signIn */}
				<button
					onClick={handleGoogleAuth}
					disabled={isLoadingGoogleBtn}
					className={`w-full mt-5 text-sm sm:text-base items-center gap-3 justify-center bg-slate-300 font-medium text-slate-800 py-2 rounded-lg flex hover:bg-slate-100 disabled:cursor-wait disabled:bg-black/20 disabled:text-white/50`}
				>
					{isLoadingGoogleBtn ? (
						"Connecting to Google..."
					) : (
						<>
							<FcGoogle size={24} /> Continue with Google
						</>
					)}
				</button>
			</div>
		</div>
	);
};

export default Login;
