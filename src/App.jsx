import Products from "./components/Products";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import "react-loading-skeleton/dist/skeleton.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorPage from "./components/ErrorPage";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "./app/authSlice";
import { useEffect } from "react";
import { auth } from "./firebase";
import ProtectedRoutes from "./components/ProtectedRoutes";
import {
	deleteCartFromFirestore,
	loadCartFromFirebase,
	storeCartToFirestore,
} from "./util/cartFirestore";
import { setCart } from "./app/cartSlice";
import "lenis/dist/lenis.css";
import ReactLenis from "lenis/react";
// import Lenis  from "lenis";

const App = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth.user);

	// useEffect(() => {
	// 	const lenis = new Lenis({
	// 		lerp: 0.1,
	// 		smoothWheel: true,
	// 		smoothTouch: true,
	// 	});

	// 	function raf(time) {
	// 		lenis.raf(time);
	// 		requestAnimationFrame(raf);
	// 	}

	// 	requestAnimationFrame(raf);

	// 	return () => {
	// 		lenis.destroy(); // cleanup
	// 	};
	// }, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			// console.log(user);
			if (user) {
				dispatch(
					setUser({
						uid: user.uid,
						email: user.email,
						name: user.displayName,
						photo: user.photoURL,
					})
				);
				const {items} = await loadCartFromFirebase(user.uid)
				dispatch(setCart(items))
				// console.log(items);
			} else {
				dispatch(clearUser());
			}
		});
		return () => unsubscribe();
		
	}, [dispatch]);

	useEffect(() => {
		if (!user) return;
		// console.log("cart", cart);
		if (cart.length === 0) {
			deleteCartFromFirestore(user.uid);
		} else {
			storeCartToFirestore(user.uid, cart);
		}
	}, [cart]);

	const location = useLocation();
	const hideNavbarRoutes = ["/login", "/register"];
	const showHideNavbar = hideNavbarRoutes.includes(location.pathname);

	return (
		<ReactLenis root>
			<div className="bg-slate-400 min-h-screen overflow-hidden relative">
				<ToastContainer position="top-right"  className={`${!showHideNavbar && "top-24"} p-3 gap-2`} />
				{!showHideNavbar && <Navbar />}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/product/:id" element={<SingleProduct />} />
					<Route
						path="/cart"
						element={
							<ProtectedRoutes>
								<Cart />
							</ProtectedRoutes>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</div>
		</ReactLenis>
	);
};
export default App;
