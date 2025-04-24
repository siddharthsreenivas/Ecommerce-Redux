import { BsFire } from "react-icons/bs";
import { useGetAllProductsQuery } from "../app/productApi";
import heroImg from "../assets/heroImage.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { motion } from "motion/react";
import { toast } from "react-toastify";

const Home = () => {
	const { data, isLoading, isError } = useGetAllProductsQuery();
	const navigate = useNavigate();

	const trendyProducts = data?.products.filter((item) => item.popular);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4, // or 1 for mobile
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 3000,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1200, // tablets
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 770, // tablets
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 630, // tablets
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 380, // mobile
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					centerPadding: "60px",
				},
			},
			{
				breakpoint: 325, // mobile
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					centerPadding: "35px",
				},
			},
		],
	};

	isError && toast.error('Something went wrong!! Please try again after some time')

	return (
		<>
			<main className="flex flex-col gap-16 max-w-6xl mx-auto px-5 sm:px-10 py-7 sm:py-12 overflow-hidden">
				{/* hero section */}
				<section className="flex gap-7 lg:gap-10 flex-col md:flex-row justify-between">
					{/* hero content */}
					<motion.div
						initial={{ x: -10, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
						className="flex flex-col gap-3"
					>
						<h1 className="font-bold text-3xl sm:text-4xl  text-slate-900">
							Welcome to Sid.
							<span>🛍️ </span>
						</h1>

						<h2 className="text-xl sm:text-2xl font-bold text-slate-900">
							Your One-Stop Online Shopping Destination!
						</h2>
						<p className="font-medium max-w-96">
							Discover thousands of products, from everyday essentials to
							trending gadgets – all in one place.
						</p>
						<div className="font-serif gap-3 flex flex-wrap">
							<p className="bg-slate-300 py-1 px-3 rounded-md w-fit shadow-md">
								🚚 Fast Delivery{" "}
							</p>
							<p className="bg-slate-300 py-1 px-3 rounded-md w-fit shadow-md">
								🔒 Secure Payments{" "}
							</p>
							<p className="bg-slate-300 py-1 px-3 rounded-md w-fit shadow-md">
								🎉 Daily Deals & Offers{" "}
							</p>
						</div>
						<button
							onClick={() => navigate("/products")}
							className="bg-slate-800 mt-2 w-fit rounded-md px-6 py-3 text-slate-300 hover:bg-slate-900"
						>
							<Link to="/products">Shop now</Link>
						</button>
					</motion.div>

					{/* hero Img */}
					<div className="w-full md:w-[70%] lg:w-1/2 max-w-lg">
						<motion.img
							initial={{ x: 20, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
							loading="lazy"
							src={heroImg}
							alt="Shopping"
							className="w-full"
						/>
					</div>
				</section>

				{/* trendy products */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
					className="relative"
				>
					<h2 className="text-3xl font-bold mb-4 group text-slate-800">
						🔥Trending Now
					</h2>

					{isLoading || isError ? (
						<SkeletonTheme baseColor="#64748b" highlightColor="#b6c1d4">
							<div className="flex gap-5 overflow-hidden">
								{Array(4)
									.fill(0)
									.map((_, i) => (
										<div key={i}>
											<Skeleton width="14rem" height="15rem" />
											<div className="py-3 rounded-b-lg px-4 space-y-1 pb-6 bg-slate-600 -mt-1">
												<Skeleton />
												<Skeleton width="40%" />
											</div>
										</div>
									))}
							</div>
						</SkeletonTheme>
					) : (
						<Slider {...settings}>
							{trendyProducts?.map((item) => (
								<div key={item.id} className="px-4 pt-2">
									<div
										onClick={() => navigate(`/product/${item.id}`)}
										className="w-44 h-[22rem] md:w-52 lg:w-56 xl:w-60 rounded-lg bg-slate-600 overflow-hidden relative shadow-lg cursor-pointer hover:scale-[102%] transition-all pb-4"
									>
										<span className="absolute flex items-center gap-1 right-4 top-3 text-sm p-2 bg-gradient-to-br from-orange-300 to-orange-600 text-white rounded-full">
											<BsFire />
										</span>
										<img
											src={item.image}
											onError={(e) =>
												(e.currentTarget.src = "https://placehold.co/600x400")
											}
											className="h-52 md:h-60 w-full object-cover bg-slate-500"
											alt={item.title.slice(0, 20) + ".."}
										/>
										<div className="py-3 px-4 space-y-1 text-slate-300 font-medium">
											{/* heading */}
											<p>{item.title.slice(0, 25) + ".."}</p>
											{/* price */}
											<p>
												{/* ₹{Math.floor(item.price * 83.2)} */}
												<span
													className={`${
														item.discount
															? "line-through text-xs opacity-70"
															: "text-base"
													}`}
												>
													₹{Math.floor(item.price * 83.2)}
												</span>
												{item.discount && (
													<>
														<span className="ml-2 text-base">
															₹
															{Math.floor(
																(item.price -
																	(item.price * item.discount) / 100) *
																	83.2
															)}
														</span>
														<span className="text-sm font-medium text-red-400">
															{" "}
															-{item.discount}%
														</span>
													</>
												)}
											</p>
										</div>
									</div>
								</div>
							))}
						</Slider>
					)}
					<p
						onClick={() => navigate("/products")}
						className="pl-4 mt-1 cursor-pointer font-medium hover:underline text-slate-800 text-lg"
					>
						Browse all products {`>>`}
					</p>
				</motion.section>
			</main>
			<Footer />
		</>
	);
};

const NextArrow = ({ onClick }) => {
	return (
		<div
			onClick={onClick}
			className=" z-10 absolute top-1/2 -translate-y-1/2 w-fit -right-2 opacity-100 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-500 border-2 p-2 rounded-full text-slate-800 cursor-pointer bg-slate-400"
		>
			<FaArrowRight size={35} />
		</div>
	);
};

const PrevArrow = ({ onClick }) => {
	return (
		<div
			onClick={onClick}
			className=" z-10 absolute top-1/2 -translate-y-1/2 w-fit -left-2 opacity-100 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-500 border-2 p-2 rounded-full text-slate-800 cursor-pointer bg-slate-400"
		>
			<FaArrowLeft size={35} />
		</div>
	);
};

export default Home;
