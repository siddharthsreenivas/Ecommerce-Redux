import { BsFire } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, decreaseQuantity } from "../app/cartSlice";
import { FaMinus, FaPlus, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useGetProductByIdQuery } from "../app/productApi";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { useEffect } from "react";

const SingleProduct = () => {
	const { id } = useParams();
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth.user);
	const { data, isLoading, isError } = useGetProductByIdQuery(id);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	if (isLoading || isError) {
		return (
			<SkeletonTheme baseColor="#72849e" highlightColor="#94a3b8">
				<div className="px-5 sm:px-10 py-8 flex md:flex-row flex-col gap-6 md:gap-16 max-w-6xl mx-auto">
					<div className="w-full md:w-1/3">
						<Skeleton height={"20rem"} borderRadius={"8px"} />
					</div>
					<div className="flex flex-col gap-3 flex-1">
						<Skeleton height={"2rem"} count={2.5} />
						<Skeleton width={"4rem"} height={"1.8rem"} borderRadius={"15px"} />
						<Skeleton width={"8rem"} />
						<Skeleton height={"3rem"} borderRadius={"10px"} />
						<div>
							<Skeleton width={"8rem"} />
							<Skeleton width={"12rem"} />
						</div>
						<div>
							<Skeleton count={2.5} />
						</div>
						<div>
							<Skeleton count={3} />
						</div>
						<div>
							<Skeleton count={2} />
						</div>
					</div>
				</div>
			</SkeletonTheme>
		);
	}

	const handleAddToCart = (item) => {
		if (user) {
			dispatch(addToCart(item));
		} else {
			toast.info("Login to proceed.");
		}
	};

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.2,
				ease: "easeIn",
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, x: 5, y: 1 },
		visible: { opacity: 1, x: 0, y: 0 },
	};

	isError &&
		toast.error("Something went wrong!! Please try again after some time");

	return (
		<div className="px-5 sm:px-10 relative max-w-6xl py-10 mx-auto flex flex-col md:flex-row gap-6 md:gap-16 text-slate-900 ">
			<motion.button
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				onClick={() => navigate(-1)}
				className="absolute z-10 p-3 top-4  rounded-full bg-slate-500 text-slate-200 hover:text-slate-300"
			>
				<FaArrowLeft size={30} />
			</motion.button>
			{/* image left side */}
			<motion.div
				initial={{ opacity: 0, x: -30 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.3 }}
				className="w-full md:w-1/3 relative"
			>
				{/* image */}
				<img
					src={data.product.image}
					alt={data.product.title.slice(0, 30) + ".."}
					className="w-full rounded-lg"
				/>
				{/* popular tag */}
				{data.product.popular && (
					<span className="absolute flex items-center gap-1 right-2 top-2 py-1 text-sm px-4 bg-gradient-to-br from-orange-300 to-orange-600 text-white rounded-full">
						Popular <BsFire />
					</span>
				)}
			</motion.div>
			{/* right side */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				className="flex flex-col gap-3 flex-1"
			>
				{/* heading */}
				<motion.h1
					variants={itemVariants}
					className="text-xl sm:text-3xl font-medium"
				>
					{data.product.title}
				</motion.h1>
				{/* category */}
				<motion.p
					variants={itemVariants}
					className="bg-slate-500 text-white font-medium px-3 rounded-full w-fit py-2 text-xs leading-none capitalize"
				>
					{/* {data.product.category.charAt(0).toUpperCase() + data.product.category.slice(1)} */}
					{data.product.category}
				</motion.p>
				{/* price */}
				<motion.p variants={itemVariants} className=" text-slate-700 font-bold">
					<span
						className={`${
							data.product.discount
								? "line-through text-base sm:text-lg opacity-70"
								: "text-lg sm:text-2xl"
						}`}
					>
						₹{Math.floor(data.product.price * 83.2)}
					</span>
					{data.product.discount && (
						<>
							<span className="ml-2 text-lg sm:text-2xl">
								₹
								{Math.floor(
									(data.product.price -
										(data.product.price * data.product.discount) / 100) *
										83.2
								)}
							</span>
							<span className="text-base sm:text-lg ml-0.5 font-medium text-red-500">
								{" "}
								-{data.product.discount}%
							</span>
						</>
					)}
				</motion.p>
				{/* cart button */}
				{cart.find((cartItem) => cartItem.id === data.product.id) ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						className="flex items-center justify-center gap-5 text-xl mt-2 py-[2px]"
					>
						<button
							onClick={() => dispatch(decreaseQuantity(data.product.id))}
							className="border-2 text-sm md:text-xl border-slate-800 hover:bg-slate-600 hover:text-slate-400 rounded-md p-1.5"
						>
							<FaMinus />
						</button>
						<p className="font-bold text-2xl">
							{
								cart.filter((cartItem) => cartItem.id === data.product.id)[0]
									.quantity
							}
						</p>
						<button
							onClick={() => dispatch(addToCart(data.product))}
							className="border-2 text-sm md:text-xl border-slate-800 hover:bg-slate-600 hover:text-slate-400 rounded-md p-1.5"
						>
							<FaPlus />
						</button>
					</motion.div>
				) : (
					<motion.button
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						onClick={() => handleAddToCart(data.product)}
						className="bg-slate-500 w-[90%] sm:min-w-96 mx-auto text-white font-semibold py-2 rounded-xl mt-2 hover:bg-slate-600 flex items-center justify-center gap-2"
					>
						Add to Cart
						<FaShoppingCart />
					</motion.button>
				)}
				{/* Brand & Model Info */}
				<motion.div variants={itemVariants}>
					<p className="font-medium text-slate-900 text-lg capitalize">
						Brand: {data.product.brand}
					</p>
					<p className="font-medium text-slate-900 text-lg capitalize">
						Model: {data.product.model}
					</p>
				</motion.div>
				{/* Description */}
				<motion.div variants={itemVariants}>
					{data.product.description.split("\r\n").map((i, idx) => (
						<p key={idx} className="text-slate-700 font-medium">
							- {i}
						</p>
					))}
				</motion.div>
			</motion.div>
		</div>
	);
};

export default SingleProduct;
