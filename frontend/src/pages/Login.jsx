import {useState} from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import  useAuthStore  from "../store/useAuthStore";
import { Link } from "react-router-dom";


export default function Login(){
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const  { user, setUser } = useAuthStore();
    const [redirect , setRedirect] = useState(false);
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/api/auth/login",formData, {
                withCredentials: true,
            });
            console.log(response.data.user);
            setUser(response.data.user); 
            setRedirect(true);        
        }catch(error){
            console.error("Login error:", error.response ? error.response.data : error.message);
        }
    }
    if(user || redirect){ 
        return (<>
        <Navigate to="/home" />
        </>);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <br></br>
            <br></br>
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <br></br>
            <br></br>
            <button type="submit">Login</button>
            <br></br>
            <br></br>
            <p>
                Not a user yet? <Link to="/signup">Register here</Link>
            </p>
        </form>
    )
}