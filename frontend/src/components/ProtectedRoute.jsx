import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const {user,loading} = useAuthStore();

    if(loading) return <div>Loading...</div>;
    if(!user) return <Navigate to="/login" />;
    
    return children;
}