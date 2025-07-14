import useAuthStore from "../store/useAuthStore.js";

export default function UserProfile() {
    const { user } = useAuthStore();

    return(
        <div className="user-profile">
            <h2>Welcome, {user.username}!</h2>
        </div>
    );
}