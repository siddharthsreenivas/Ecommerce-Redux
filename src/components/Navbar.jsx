import { Link, useNavigate } from "react-router-dom";
import { BsBoxes } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RiMenu3Fill } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { MdAccountCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { clearCart } from "../app/cartSlice";
import { AnimatePresence, motion } from "motion/react";

const Navbar = () => {
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth.user);
	const containerRef = useRef(null);
	// console.log(user);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [isNavOpen, setIsNavOpen] = useState(false);
	const [isAccountOpen, setIsAccountOpen] = useState(false);

	const navLinks = [
		{
			title: "Home",
			link: "/",
		},
		{
			title: "Proucts",
			link: "/products",
		},
		// {
		// 	title: "Login",
		// 	link: "/login",
		// },
	];

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setIsAccountOpen(false);
			}
		};
		if (isAccountOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		// Cleanup
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isAccountOpen]);

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			dispatch(clearCart());
			setIsAccountOpen(false);
			toast.success("Successfully Logged out");
			console.log("Signed Out");
		} catch (error) {
			toast.error("Error logging out");
		}
	};

	const handleCart = () => {
		if (user) {
			navigate("/cart");
		} else {
			toast.info("Login to proceed.");
		}
	};

	return (
		<motion.header
			initial={{ y: -50, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.4, ease: "easeIn" }}
			className="bg-slate-500 py-5 w-full flex items-center relative"
		>
			<div className="flex items-center px-5 sm:px-10 w-full gap-2 sm:gap-5 max-w-6xl mx-auto relative">
				<div
					className="flex items-center gap-2 cursor-pointer"
					title="Sid E-Commerce"
				>
					<span className="font-extrabold text-3xl sm:text-4xl text-slate-900">Sid.</span>
					<BsBoxes size={32} className="text-slate-900" />
				</div>

				{navLinks.map((item, i) => (
					<Link
						key={i}
						to={item.link}
						className="font-mono hidden sm:block text-2xl hover:bg-slate-600 rounded-md px-3 py-1 hover:text-gray-400 transition-all duration-200 text-slate-900"
					>
						{item.title}
					</Link>
				))}

				{/* cart */}
				<button
					onClick={handleCart}
					className="font-mono text-2xl hover:bg-slate-600 rounded-md px-3 py-1 hover:text-gray-400 transition-all duration-200 flex items-center relative gap-1 ml-auto text-slate-900 group"
				>
					<span className="hidden sm:block">Cart</span>
					<FaShoppingCart size={26} />
					{cart.length > 0 && (
						<span className="bg-slate-800 leading-none rounded-full w-7 h-7 flex items-center justify-center text-white absolute text-base -right-2 -bottom-2 group-hover:bg-slate-600 transition-all duration-200">
							{cart.length}
						</span>
					)}
				</button>

				{/* account */}
				<div
					className={` cursor-pointer px-2 py-0.5 sm:py-1 sm:px-4 rounded-md transition-all duration-200 font-mono text-xl sm:text-2xl ${
						user
							? "text-slate-900 hover:text-gray-400 hover:bg-slate-600"
							: "bg-emerald-600 hover:bg-emerald-700 text-white"
					}`}
					onClick={
						user
							? () => setIsAccountOpen(!isAccountOpen)
							: () => navigate("/login")
					}
				>
					{/* <MdAccountCircle size={33} /> */}
					{user ? (
						user.photo ? (
							<img
								src={user?.photo}
								alt={user?.name}
								className="bg-green-200 w-7 h-7 sm:w-8 sm:h-8 rounded-full"
								referrerPolicy="no-referrer"
							/>
						) : (
							<MdAccountCircle size={32} />
						)
					) : (
						"Login"
					)}
				</div>
				<AnimatePresence>
					{isAccountOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{
								height: isAccountOpen ? 185 : 0,
								opacity: isAccountOpen ? [0, 1] : 0,
							}}
							exit={{ height: 0, opacity: 0 }}
							className="absolute bg-slate-600 top-14 right-10 rounded-lg z-50 shadow-lg shadow-slate-300 flex gap-3 flex-col w-[80%] sm:max-w-lg px-6 py-8"
							ref={containerRef}
						>
							<motion.p
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
								}}
								transition={{ delay: 0.2 }}
								exit={{ opacity: 0 }}
								className="text-slate-300 font-mono text-xl"
							>
								👋Hey {user?.name}, Welcome back!
							</motion.p>

							<motion.button
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
								}}
								transition={{ delay: 0.2 }}
								exit={{ opacity: 0 }}
								onClick={handleSignOut}
								className="font-mono ml-auto w-fit
							text-xl rounded-md px-4 py-2 hover:text-gray-400 transition-all duration-200 text-slate-300 bg-red-600 hover:bg-red-700"
							>
								Logout
							</motion.button>
						</motion.div>
					)}
				</AnimatePresence>

				{/* nav burger open */}
				<div
					className="sm:hidden cursor-pointer hover:bg-slate-600 p-2 rounded-full"
					onClick={() => setIsNavOpen(!isNavOpen)}
				>
					{isNavOpen ? (
						<IoMdClose size={29} className="text-slate-800" />
					) : (
						<RiMenu3Fill size={29} className="text-slate-800" />
					)}
				</div>
				<AnimatePresence>
					{isNavOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{
								height: isNavOpen ? 113 : 0,
								opacity: isNavOpen ? [0, 1] : 0,
							}}
							exit={{ height: 0, opacity: 0 }}
							transition={{ delayChildren: 5 }}
							className="absolute sm:hidden bg-slate-600 top-14 right-10 rounded-lg z-50 shadow-lg shadow-slate-300 flex flex-col px-2 py-4 w-48"
						>
							{navLinks.map((item, i) => (
								<Link
									key={i}
									to={item.link}
									onClick={() => setIsNavOpen(!isNavOpen)}
									className="font-mono text-2xl hover:bg-slate-700 rounded-md px-3 py-1 hover:text-gray-400 transition-all duration-200 text-slate-300"
								>
									{item.title}
								</Link>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.header>
	);
};
export default Navbar;
