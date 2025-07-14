import useAuthStore from "../store/useAuthStore";
import { useEffect, useState, useRef } from "react";
import { useSocket } from "../context/SocketContext";

export default function ChatWindow({ selectedFriend }) {
    const { messages, fetchMessages, sendMessage, user, addMessage } = useAuthStore();
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const socket = useSocket();


    useEffect(()=>{
        if(!user?._id || !socket) return;

        socket.emit("add-user",user._id);

        socket.on("msg-receive",(msg)=>{
            console.log(`I have recieved message from ${msg.from} content ${msg.content}`);
            addMessage(msg);
        })

        return ()=>{
            socket.off("msg-receive");
        }
    },[socket,user]);

    useEffect(() => {
        if (selectedFriend?._id) {
            fetchMessages(selectedFriend._id);
        }
    }, [selectedFriend]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() && selectedFriend?._id) {
            await sendMessage(selectedFriend._id, newMessage);
            
            socket.emit("send-msg",{
                to:selectedFriend._id,
                from:user._id,
                content:newMessage,
            });

            setNewMessage("");
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages[selectedFriend?._id]?.length]);

    if (!selectedFriend) return <div>Select a friend to start chatting.</div>;

    const chatMessages = messages[selectedFriend._id] || [];

    return (
        <div>
            <h3>Chat with {selectedFriend.username}</h3>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {chatMessages.map((msg) => (
                    <div key={msg._id}>
                        <span>
                            {msg.sender === user._id ? "You" : selectedFriend.username}: {msg.content}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
