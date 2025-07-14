import { useState } from "react";
import axios from "axios";

export default function SearchBar(){
    const [ query, setQuery ] = useState("");
    const [ users, setUsers ] = useState([]);
    const [ loading , setLoading ] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!query.trim()) {
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/users/search?q=${query}`,{withCredentials: true});
            if(response.status === 200) {
                setUsers(response.data);
            } else {
                console.error("Error fetching users");
            }
        }
        catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleClear = () => {
        setQuery("");
        setUsers([]);
    };

    const sendRequest = async (userId) => {
        try {
            const response = await axios.post("http://localhost:3000/api/users/sendFriendRequest", { toUserId: userId }, { withCredentials: true });
            if (response.status === 200) {
                console.log("Friend request sent successfully");
            }else{
                console.log(response.data.message || "Error sending friend request");
            }
        } catch (error) {   
            console.error("Error sending friend request:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="search-bar">
                <input
                    type = "text"
                    placeholder = "Search for users..."
                    value = {query}
                    onChange = {(e) => setQuery(e.target.value)}
                />
                <button type="submit" disabled={loading}>Search</button>
                <button type="button" onClick={handleClear}>Clear</button>
            </form>
            <ul>
                {
                    users.map((user) => (
                        <li key={user._id} className="search-result">
                            <span>{user.username}</span>
                            <button onClick={() => sendRequest(user._id)}>Send Friend Request</button>
                        </li>
                    ))
                }
            </ul>
        </>
    )

}