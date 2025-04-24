import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
	const user = useSelector((state) => state.auth.user);

	return user ? children : <Navigate to="/" />;
};
export default ProtectedRoutes;
