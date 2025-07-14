import UserProfile from "../components/UserProfile";
import FriendRequestList from "../components/FriendRequestList";
import FriendsList from "../components/FriendsList";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import SearchBar from "../components/SearchBar";
import ChatWindow from "../components/ChatWindow"
import { useSocket } from "../context/SocketContext"


export default function Home() {
    const socket = useSocket();
    const { user, setUser } = useAuthStore();
    const [selectedFriend, setSelectedFriend ] = useState(null);

    useEffect(()=>{
        if(user?._id && !socket.connected){
            socket.connect();
            socket.emit("add-user",user._id);
        }
        return ()=>{
            socket.disconnect();
        };
    },[user, socket]);

    const handleSelectFriend = (friend) => {
        if(friend === selectedFriend) {
            setSelectedFriend(null);
        }
        else {
            setSelectedFriend(friend);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
            if( response.status === 200) {
                setUser(null);
            }
        }catch(error){
            console.error("Error logging out:", error);
        }
    }

    return(
        <div className="home">
            <div>
                <SearchBar />
                <UserProfile />
                <FriendRequestList />
            </div>
            <div>
                <FriendsList onSelectFriend={handleSelectFriend} />
            </div>
            <div>
                {selectedFriend ? (
                    <ChatWindow selectedFriend={selectedFriend}/>
                ) : (
                    <div>Select a friend to view messages</div>
                )}
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}