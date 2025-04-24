import { useRef, useState, useEffect } from "react";
import ErrorPageSvg from "../assets/ErrorPage.svg";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
	const [time, setTime] = useState(4);

  const navigate = useNavigate()
  const intervalRef = useRef(null);

  useEffect(() => {
		intervalRef.current = setInterval(() => {
			setTime((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(intervalRef.current);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(intervalRef.current); 
	}, []);

    useEffect(() => {
			if (time === 0) {
				navigate("/");
			}
		}, [time]);

	return (
		<div className=" max-w-6xl mx-auto px-10 py-5 flex flex-col justify-center items-center">
			<img src={ErrorPageSvg} alt="Error Page" className="w-full max-w-xl" />
			<h2 className="text-xl md:text-2xl underline underline-offset-4 font-medium font-mono">
				Returning to Home in 
				<span className="font-sans mx-3">{time}</span>
				sec
			</h2>
		</div>
	);
};
export default ErrorPage;
