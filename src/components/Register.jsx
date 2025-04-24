import { useState } from "react";
import { BsBoxes } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setUser } from "../app/authSlice";

const Login = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingGoogleBtn, setIsLoadingGoogleBtn] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name === "" || email === "" || password === "") {
			toast.warning("Please fill out all the details.");
			return;
		}
		try {
			setIsLoading(true);
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateProfile(userCredential.user, {
				displayName: name,
			});
			dispatch(
				setUser({
					uid: userCredential.user.uid,
					email: userCredential.user.email,
					name,
					photo: userCredential.user.photoURL,
				})
			);
			toast.success("Account created successfully!");
			navigate("/");
			setName("");
			setEmail("");
			setPassword("");
		} catch (error) {
			const msg = error.message
				.replace("Firebase: ", "")
				.replace("Error (auth/", "")
				.replace(")", "")
				.replace(/-/g, " ");
			// console.log(msg)
			toast.error(
				msg.charAt(0).toUpperCase() + msg.slice(1) || "Something went wrong."
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
		<div className="min-h-screen flex flex-col gap-5 p-4 items-center justify-center bg-slate-500 relative">
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
			{/* main conatiner */}
			<div className="bg-slate-700 sm:px-7 px-4 py-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-xl sm:text-2xl font-bold mb-5 text-slate-300 text-center">
					Create Account
				</h2>
				<form className="space-y-3" onSubmit={handleSubmit}>
					<div>
						<label className="text-slate-300 font-medium">Name:</label>
						<input
							type="text"
							placeholder="Jhon Doe"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full border px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-slate-800"
						/>
					</div>
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
							minLength={6}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full border px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-slate-800"
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full disabled:cursor-wait disabled:bg-black/50 bg-slate-900 font-medium sm:text-lg text-white py-2 rounded-lg hover:bg-slate-800"
					>
						{isLoading ? "Creating account..." : "Register Now"}
					</button>
				</form>
				{/* divider */}
				<div className="flex gap-3 my-5 items-center">
					<div className="h-0.5 rounded-full bg-slate-400 w-full" />
					<span className="text-slate-400 font-bold">x</span>
					<div className="h-0.5 rounded-full bg-slate-400 w-full" />
				</div>
				{/* Login */}
				<p className="text-center text-sm sm:text-base text-slate-300">
					Already have an account? {""}
					<Link
						to="/login"
						className="underline underline-offset-2 hover:text-slate-400"
					>
						Login
					</Link>
				</p>
				{/* google login */}
				<button
					onClick={handleGoogleAuth}
					disabled={isLoadingGoogleBtn}
					className={`w-full text-sm sm:text-base mt-5 items-center gap-3 justify-center bg-slate-300 font-medium text-slate-800 py-2 rounded-lg flex hover:bg-slate-100 disabled:cursor-wait disabled:bg-black/20 disabled:text-white/50`}
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
