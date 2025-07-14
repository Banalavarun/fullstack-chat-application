import {create} from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  loading : true,
  friends: [],
  friendRequests: [],
  messages : {},

  fetchUser: async () =>{
    try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {withCredentials: true});
        set({user: response.data.user, loading: false});
    }catch(error){
        console.error("Error fetching user:", error);
        set({loading: false});
    }
  },

  setUser: (user) => set({ user }),

  logout: async()=>{
    try {
        await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
        set({ user: null, friends: [], friendRequests: [] ,messages: []});
    } catch (error) {
        console.error("Error logging out:", error);
    }
  },

  fetchFriends : async () => {
    try{
        const response = await axios.get("http://localhost:3000/api/users/getFriends", { withCredentials: true });
        set({ friends: response.data });
    } catch (error) {
        console.error("Error fetching friends:", error);
    }
  },

  setFriends : (friends) => set({ friends }),

  addFriend: (friend)=>{
    set((state) => ({
        friends: [...state.friends, friend]
    }));
  },

    fetchFriendRequests: async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/users/getFriendRequests", { withCredentials: true });
            set({ friendRequests: response.data });
        } catch (error) {
            console.error("Error fetching friend requests:", error);
        }
    },

    setFriendRequests: (friendRequests) => set({ friendRequests }),

    fetchMessages : async(toUserId) => {
        try{
            const response = await axios.get(`http://localhost:3000/api/messages/getMessages/${toUserId}`, { withCredentials: true });
            set((state) => ({
                messages: {
                    ...state.messages,
                    [toUserId]: response.data.messages,
                },
            }));
        }
        catch (error) {
            console.error("Error fetching messages:", error);
        }
    },

      addMessage : (msg) =>{
            set((state)=>({
                messages : {
                    ...state.messages,
                    [msg.from]:[...(state.messages[msg.from] || []),msg]
                },
            }));
        },


    sendMessage: async (toUserId, content) =>{
        try{
            const response = await axios.post("http://localhost:3000/api/messages/sendMessage", { toUserId, content }, { withCredentials: true });
            set((state)=>({
                messages: {
                    ...state.messages,
                    [toUserId]: [...(state.messages[toUserId] || []),response.data.newMessage],
                }
            }))
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

}));

export default useAuthStore;