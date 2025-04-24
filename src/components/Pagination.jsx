import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {setActivePage} from '../app/uiSlice'

const Pagination = () => {
	const activePage = useSelector(state => state.ui.activePage)
	const dispatch = useDispatch()
	const totalPages = 13;

	const getVisiblePages = () => {
		const pages = [];

		let startPage = Math.max(activePage - 1, 1);
		let endPage = Math.min(startPage + 2, totalPages);

		if (endPage - startPage < 2) {
			startPage = Math.max(endPage - 2, 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return pages;
	};

	const handleNext = () => {
		if (activePage < totalPages) dispatch(setActivePage(activePage + 1));
	};

	const handlePrev = () => {
		if (activePage > 1) dispatch(setActivePage(activePage - 1));
	};

	const className =
		"text-lg font-bold border-2 border-slate-600 p-3 text-slate-800 leading-3 rounded-md cursor-pointer hover:bg-slate-500/30";

	return (
		<div className="my-5 mx-auto text-center">
			{/* <p className="mb-3 text-lg">Active Page: {activePage}</p> */}
			<div className="flex items-center justify-center gap-1 sm:gap-3">
				{/* prev button */}
				<button
					className="border-2 p-0.5 border-slate-800 hover:bg-slate-500/30 rounded-md disabled:opacity-40"
					onClick={handlePrev}
					disabled={activePage === 1}
				>
					<BiChevronLeft size={32} />
				</button>

				{getVisiblePages()[0] > 1 && <span className={className}>...</span>}

				{getVisiblePages().map((page) => (
					<span
						key={page}
						className={`${className} ${
							activePage === page &&
							"bg-slate-600 border-slate-600 text-slate-100"
						} text-sm`}
						onClick={() => dispatch(setActivePage(page))}
					>
						{page}
					</span>
				))}

				{getVisiblePages().slice(-1)[0] < totalPages && (
					<span className={className}>...</span>
				)}

				{/* next button */}
				<button
					className="border-2 p-0.5 border-slate-800 hover:bg-slate-500/30 rounded-md disabled:opacity-40"
					onClick={handleNext}
					disabled={activePage === totalPages}
				>
					<BiChevronRight size={32} />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
