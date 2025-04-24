import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { MdDelete, MdOutlineShoppingCartCheckout } from "react-icons/md";
import {
	addToCart,
	clearCart,
	decreaseQuantity,
	removeFromCart,
} from "../app/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from '../assets/emptyCart.svg'
import { AnimatePresence, motion } from "motion/react";
import { toast } from "react-toastify";

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	if (cart.length === 0) {
		return (
			<div className="px-10 py-8 text-slate-800 text-xl sm:text-2xl font-bold text-center">
				<img src={EmptyCart} alt="Empty Cart" className="sm:max-w-sm mx-auto my-10" />
				No items in the cart...
			</div>
		);
	}

	const subtotal = cart.reduce(
		(acc, item) => acc + Math.floor(item.price * 83.2) * item.quantity,
		0
	);
	const discount = cart.reduce(
		(acc, item) => acc + item.discountAmount * item.quantity,
		0
	);
	const total = cart.reduce(
		(acc, item) => acc + item.sellingPrice * item.quantity,
		0
	);
	const shippingFee = subtotal > 500 ? 0 : 199;

	const handlePayment = async () => {
		const res = await loadRazorpayScript();
		if (!res) {
			alert("Failed to load Razorpay");
			return;
		}

		const options = {
			key: import.meta.env.VITE_RAZORPAY_KEY_ID,
			amount: (total + shippingFee) * 100, // amount in paise
			currency: "INR",
			name: "Sid. Ecommerce",
			description: "Order Payment",
			// image: "/your-logo.png",
			handler: (response) => {
				// alert(`Payment successful! ID: ${response.razorpay_payment_id}`)
				navigate("/");
				toast.success('Payment successfull!')
				dispatch(clearCart());
			},
			prefill: {
				name: user.name,
				email: user.email,
			},
			theme: {
				color: "#64748b",
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	function loadRazorpayScript() {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = "https://checkout.razorpay.com/v1/checkout.js";
			script.onload = () => resolve(true);
			script.onerror = () => resolve(false);
			document.body.appendChild(script);
		});
	}

	const cartItemVariants = {
		initial: { opacity: 0, y: 20 },
		animate: (i) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				delay: i * 0.2,
			},
		}),
		exit: {
			opacity: 0,
			y: 20,
			transition: {
				duration: 0.2,
				delay: 0, // Instant exit
			},
		},
	};

	return (
		<div className="px-5 sm:px-10 py-8 flex flex-col gap-5 max-w-6xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex gap-5 items-center"
			>
				{/* back button */}
				<button
					onClick={() => navigate(-1)}
					className="p-2 rounded-full bg-slate-500 text-slate-200 hover:text-slate-300"
				>
					<FaArrowLeft className="text-2xl md:text-3xl"/>
				</button>
				<h2 className=" text-2xl md:text-3xl font-bold text-slate-900 ">Your cart:</h2>
			</motion.div>
			{/* cart items list */}
			<div className="flex flex-col gap-5 ">
				<AnimatePresence mode="popLayout">
					{cart.map((item, i) => (
						<motion.div
							layout
							variants={cartItemVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							custom={i}
							key={item.id}
							className="bg-slate-500/20 min-h-32 w-full rounded-xl flex flex-col sm:flex-row justify-between items-center px-4 py-3 gap-5 shadow-md hover:shadow-lg"
						>
							<Link to={`/product/${item.id}`} className="flex gap-3 md:gap-5 w-full">
								{/* image */}
								<img
									src={item.image}
									alt={item.title.slice(0, 15) + ".."}
									className="w-24 md:w-32 h-full rounded-lg object-cover"
								/>
								<div className="flex-1">
									{/* title */}
									<h3 className="text-sm md:text-lg text-slate-800 font-medium">
										{item.title.length > 30
											? item.title.slice(0, 30) + "..."
											: item.title}
									</h3>
									{/* price details */}
									<p className="text-slate-800 font-bold flex flex-col sm:flex-row sm:gap-2 \ mb-1">
										<span
											className={`${
												item.discount
													? "line-through text-base opacity-70"
													: "text-lg"
											}`}
										>
											₹{Math.floor(item.price * 83.2)}
										</span>
										{item.discount && (
											<span>
												<span className=" text-lg mr-2">
													₹{item.sellingPrice}
												</span>
												<span className="text-sm font-medium text-red-500">
													-{item.discount}%
												</span>
											</span>
										)}
									</p>
									{/* add or decrease button */}
									<div
										onClick={(e) => e.preventDefault()}
										className="flex items-center gap-3 md:gap-5 text-xl mt-2"
									>
										<button
											onClick={() => dispatch(decreaseQuantity(item.id))}
											className="border-2 text-sm md:text-xl border-slate-800 hover:bg-slate-600 hover:text-slate-400 rounded-md p-1.5"
										>
											<FaMinus />
										</button>
										<p className="font-bold">{item.quantity}</p>
										<button
											onClick={() => dispatch(addToCart(item))}
											className="border-2 text-sm md:text-xl border-slate-800 hover:bg-slate-600 hover:text-slate-400 rounded-md p-1.5"
										>
											<FaPlus />
										</button>
									</div>
								</div>
							</Link>
							{/* total price */}
							<p className="hidden sm:block text-base md:text-lg font-medium">
								₹{item.sellingPrice * item.quantity}
							</p>
							{/* remove cart button */}
							<div className="md:mr-5 w-full sm:w-fit">
								<button
									onClick={() => dispatch(removeFromCart(item.id))}
									className="border-2 bg-transparent border-slate-800 hover:bg-red-500 hover:text-red-950 hover:border-red-400 rounded-md p-1.5 w-full"
								>
									<span className="sm:hidden font-medium">Delete</span>
									<MdDelete className="text-xl md:text-3xl hidden sm:block" />
								</button>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
			{/* divider */}
			<motion.hr
				initial={{ width: 0, opacity: 0 }}
				whileInView={{ width: "100%", opacity: 1 }}
				viewport={{ once: true }}
				layout
				className="border-2 border-slate-800 rounded-full my-6"
			/>
			{/* payment details */}
			<div className="flex justify-between flex-col sm:flex-row gap-8 items-start">
				{/* clear cart */}
				<motion.button
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					viewport={{ once: true }}
					layout
					onClick={() => dispatch(clearCart())}
					className="border-2 rounded-lg py-2 px-6 bg-red-500 border-red-800 text-white font-medium text-base md:text-lg hover:bg-red-600 hover:shadow-lg"
				>
					Clear Cart
				</motion.button>
				{/* price details */}
				<div className="self-end  w-full md:w-72">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						layout
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.2 }}
						viewport={{ once: true }}
						className="bg-slate-500/20 mb-6 p-5 rounded-lg space-y-2 shadow-lg border border-slate-700"
					>
						<p className="flex justify-between">
							Subtotal :{" "}
							<span className="font-medium text-lg"> ₹{subtotal}</span>
						</p>
						<p className="flex justify-between">
							Discount :{" "}
							<span className="font-medium text-lg"> -₹{discount}</span>
						</p>
						<p className="flex justify-between">
							Shipping fee :{" "}
							<span className="font-medium text-lg"> ₹{shippingFee}</span>
						</p>
						<hr className="border-1 border-slate-800 rounded-full" />
						<p className="flex justify-between">
							Total :{" "}
							<span className="font-medium text-lg">
								{" "}
								₹{total + shippingFee}
							</span>
						</p>
					</motion.div>
					{/* payment button */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.3 }}
						viewport={{ once: true }}
						layout
					>
						<button
							className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-white justify-center text-lg font-medium bg-green-500 border-2 border-green-700 hover:bg-green-600/70"
							onClick={handlePayment}
						>
							Checkout <MdOutlineShoppingCartCheckout size={25} />
						</button>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
export default Cart;
