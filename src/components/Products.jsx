import { BsFire } from "react-icons/bs";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, decreaseQuantity } from "../app/cartSlice";
import { setSelectedCategory, setSearchValue } from "../app/uiSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
	useGetAllCategoriesQuery,
	// useGetAllProductsQuery,
	useGetProductsByCategoryQuery,
} from "../app/productApi";
import Footer from "./Footer";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import { IoSearch } from "react-icons/io5";
import { motion } from "motion/react";

const Products = () => {
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth.user);
	const selectedCategory = useSelector((state) => state.ui.selectedCategory);
	const activePage = useSelector((state) => state.ui.activePage);
	const searchValue = useSelector((state) => state.ui.searchValue);
	// const {data, isLoading } = useGetAllProductsQuery()
	const { data: categories } = useGetAllCategoriesQuery();
	const { data, isLoading, isFetching, isError } = useGetProductsByCategoryQuery({
		category: selectedCategory,
		page: activePage,
	});
	const dispatch = useDispatch();

	// scroll top
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [activePage]);
	// skelton
	if (isLoading || isFetching || isError) {
		return (
			<SkeletonTheme baseColor="#93a2ba" highlightColor="#b6c1d4">
				<div className="px-5 sm:px-10 py-8 flex flex-col gap-5 max-w-6xl mx-auto">
					<Skeleton
						width={"min(100%, 20rem)"}
						baseColor="#64748b"
						highlightColor="#b6c1d4"
						style={{ marginBottom: "8px" }}
					/>
					<Skeleton
						width={"min(100%, 23.5rem)"}
						height={"2.3rem"}
						baseColor="#64748b"
						highlightColor="#b6c1d4"
					/>
					<Skeleton
						inline={true}
						width={"4rem"}
						height={"2rem"}
						borderRadius={"20px"}
						count={7}
						baseColor="#64748b"
						highlightColor="#b6c1d4"
						style={{ marginRight: 10 }}
					/>
					<div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{Array(8)
							.fill(0)
							.map((_, i) => (
								<div
									key={i}
									className="flex flex-col h-[25rem] bg-slate-100 p-4 gap-1 rounded-md shadow-lg"
								>
									<Skeleton height={"13rem"} />
									<Skeleton count={1.5} />
									<Skeleton
										width={"4rem"}
										height={"1.8rem"}
										borderRadius={"15px"}
									/>
									<Skeleton width={"8rem"} />
									<Skeleton height={"2rem"} borderRadius={"10px"} />
								</div>
							))}
					</div>
				</div>
			</SkeletonTheme>
		);
	}

	const addProduct = (e, item) => {
		e.preventDefault();
		if (user) {
			dispatch(addToCart(item));
		} else {
			toast.info("Login to proceed.");
		}
	};

	const handleCategoryChange = (e) => {
		dispatch(setSelectedCategory(e.target.value));
	};

	const filteredProducts = data?.products.filter((item) =>
		item.title.toLowerCase().includes(searchValue.toLowerCase())
	);

	isError && toast.error('Something went wrong!! Please try again after some time')
	
	return (
		<>
			<div className="px-5 sm:px-10 py-8 flex flex-col gap-5 max-w-6xl mx-auto">
				<motion.h1
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					className="text-xl text-slate-800 font-bold sm:mb-3"
				>
					Big deals, small prices-shop now!
				</motion.h1>
				{/* Search bar */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					className="flex relative items-center gap-2 bg-slate-500 w-full max-w-sm rounded-md pl-3 p-1 shadow-sm "
				>
					<IoSearch size={22} className="text-slate-300" />
					<input
						type="search"
						value={searchValue}
						onChange={(e) => dispatch(setSearchValue(e.target.value))}
						placeholder="Search..."
						className="pr-3 py-1 bg-transparent w-full outline-none placeholder:text-slate-300 text-slate-200"
					/>
				</motion.div>
				{/* categories */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					className="flex items-center gap-3 flex-wrap"
				>
					{["all", ...(categories?.categories || [])].map((c) => (
						<label
							key={c}
							className={`capitalize text-white font-medium rounded-full px-4 sm:px-6 py-1 sm:py-2 cursor-pointer hover:bg-slate-900 duration-200 transition-all ${
								selectedCategory === c
									? "bg-slate-800 shadow-lg shadow-slate-700/50"
									: "bg-slate-600"
							} `}
						>
							<input
								checked={selectedCategory === c}
								type="radio"
								name="category"
								value={c}
								onChange={handleCategoryChange}
								className="hidden"
							/>
							{c}
						</label>
					))}
				</motion.div>
				{/* product list */}
				{filteredProducts.length === 0 ? (
					<p className="text-slate-800 font-medium text-lg text-center">
						No items found!!
					</p>
				) : (
					<motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}} className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-3">
						{filteredProducts.map((item) => (
							<Link to={`/product/${item.id}`} key={item.id} className="">
								{/* card */}
								<motion.div
									initial={{ y: 10 }}
									whileInView={{ y: 0 }}
									transition={{ duration: 0.2, ease: "easeIn" }}
									className="flex flex-col gap-2 bg-slate-100 p-5 rounded-md shadow-lg cursor-pointer hover:shadow-2xl hover:scale-[102%] transition-all duration-300 relative min-h-80 h-full"
								>
									{/* popular tag */}
									{item.popular && (
										<span className="absolute flex items-center gap-1 right-2 top-2 py-1 text-sm px-4 bg-gradient-to-br from-orange-300 to-orange-600 text-white rounded-full">
											Popular <BsFire />
										</span>
									)}
									{/* image */}
									<img
										src={item.image}
										alt={item.title.slice(0, 40) + ".."}
										title={item.title}
										className="w-full h-60 rounded-md bg-slate-200 object-cover"
									/>
									{/* heading */}
									<h3 className="text-sm text-slate-800 font-medium flex-1">
										{item.title.length > 50
											? item.title.slice(0, 50) + "..."
											: item.title}
									</h3>
									{/* category */}
									<p className="bg-slate-500 text-white font-medium px-3 rounded-full w-fit py-2 text-xs leading-none capitalize">
										{item.category}
									</p>
									{/* price */}
									<p className="text-slate-800 font-bold">
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
											<>
												<span className="ml-2 text-lg">
													₹
													{Math.floor(
														(item.price - (item.price * item.discount) / 100) *
															83.2
													)}
												</span>
												<span className="text-sm font-medium text-red-500">
													{" "}
													-{item.discount}%
												</span>
											</>
										)}
									</p>
									{/* cart item + or - button */}
									{cart.find((cartItem) => cartItem.id === item.id) ? (
										<div
											onClick={(e) => e.preventDefault()}
											className="flex items-center justify-center gap-5 text-xl mt-2 py-[2px]"
										>
											<button
												onClick={() => dispatch(decreaseQuantity(item.id))}
												className="border-2 text-sm md:text-xl border-slate-800 hover:bg-slate-600 hover:text-slate-400 rounded-md p-1.5"
											>
												<FaMinus />
											</button>
											<p className="font-bold text-2xl">
												{
													cart.filter((cartItem) => cartItem.id === item.id)[0]
														.quantity
												}
											</p>
											<button
												onClick={() => dispatch(addToCart(item))}
												className="border-2 text-sm md:text-xl border-slate-800 hover:bg-slate-600 hover:text-slate-400 rounded-md p-1.5"
											>
												<FaPlus />
											</button>
										</div>
									) : (
										// add to cart button
										<button
											onClick={(e) => addProduct(e, item)}
											className="bg-slate-500 text-white font-semibold py-2 rounded-xl mt-2 hover:bg-slate-600 flex items-center justify-center gap-2"
										>
											Add to Cart
											<FaShoppingCart />
										</button>
									)}
								</motion.div>
							</Link>
						))}
					</motion.div>
				)}
				{/* pagination */}
				{selectedCategory === "all" && <Pagination />}
			</div>
			<Footer isBottom={filteredProducts.length === 0} />
		</>
	);
};
export default Products;
