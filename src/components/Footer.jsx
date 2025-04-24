import { motion } from "motion/react";
import { BsBoxes } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			duration: 0.2,
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const Footer = ({isBottom}) => {
	return (
		<footer
			className={`${
				isBottom && "absolute bottom-0"
			} w-full py-8 bg-slate-500 text-slate-900`}
		>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="max-w-6xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-4"
			>
				{/* Logo */}
				<motion.div variants={itemVariants}
					className="flex items-center gap-2 cursor-pointer"
					title="Sid E-Commerce"
				>
					<span className="font-extrabold text-2xl sm:text-4xl text-slate-900">
						Sid.
					</span>
					<BsBoxes size={32} className="text-slate-900" />
				</motion.div>

				{/* GitHub */}
				<motion.a variants={itemVariants}
					href="https://github.com/siddharthsreenivas"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-2 hover:underline"
				>
					<FaGithub size={22} />
					<span>GitHub</span>
				</motion.a>

				{/* Trademark */}
				<motion.p variants={itemVariants} className="text-sm opacity-75 text-center md:text-right">
					© {new Date().getFullYear()} SidStore™. All rights reserved.
				</motion.p>
			</motion.div>
		</footer>
	);
};
export default Footer;
