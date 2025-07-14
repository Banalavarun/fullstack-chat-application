import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";
import axios from "axios";

export default function FriendRequestList() {
    const { friendRequests, fetchFriendRequests , setFriendRequests, addFriend } = useAuthStore();
    useEffect(() => {
        fetchFriendRequests();
    }, []);

    const handleAccept = async(id)=>{
        try{
            const response = await axios.post("http://localhost:3000/api/users/acceptFriendRequest", { fromUserId : id }, { withCredentials: true });
            setFriendRequests(friendRequests.filter(request => request._id !== id));
            if(response.data.friend) {
                addFriend(response.data.friend);
            }
        }catch(error){
                console.error("Error accepting friend request:", error);
            }
    }

    const handleReject = async(id)=>{
        try{
            await axios.post("http://localhost:3000/api/users/rejectFriendRequest", { fromUserId : id }, { withCredentials: true });
            setFriendRequests(friendRequests.filter(request => request._id !== id));
        }catch(error){
            console.error("Error rejecting friend request:",error);
        }
    }
    
    return(
        <div className="friend-request-list">
            <h2>Friend Requests</h2>
            {friendRequests.length > 0 ? (
                <ul>
                    {friendRequests.map((request) => (
                        <li key={request._id}>
                            <span>{request.username}</span>
                            <button onClick={()=>{handleAccept(request._id)}}>Accept</button>
                            <button onClick={()=>{handleReject(request._id)}}>Reject</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No friend requests found.</p>
            )}
        </div>
    )
}