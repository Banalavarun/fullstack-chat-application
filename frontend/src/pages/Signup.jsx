import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

export default function Signup(){
    const navigate = useNavigate();
    const { setUser } = useAuthStore();
    const [formData, setFormData] = useState({
        username: "",
        email: "",  
        password: "",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", formData, {
                withCredentials: true,
            });
            setUser(response.data.user); // Assuming the response contains user data
            console.log(response.data);
            navigate("/home");
        } catch (error) {
            console.error("Signup error:", error.response ? error.response.data : error.message);
        }
    }        
    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input type="text" placeholder="Username" name="username"  onChange={handleChange}/>
            <br></br>
            <br></br>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <br></br>
            <br></br>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <br></br>
            <br></br>
            <button type="submit">Signup</button>   
        </form>
    )
}