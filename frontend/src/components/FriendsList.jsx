import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

export default function FriendsList({onSelectFriend}) {
    const { friends, fetchFriends } = useAuthStore();

    useEffect(() => {
        fetchFriends();
    }, []);

    return (
        <div className="friends-list">
            <h2>Friends List</h2>
            {friends.length > 0 ? (
                <ul>
                    {friends.map((friend) => (
                        <li key={friend._id} onClick={() => onSelectFriend(friend)} style={{ cursor : 'pointer' }}>
                            <span>{friend.username}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No friends found.</p>
            )}
        </div>
    );
}