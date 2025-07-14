import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
    const { toUserId, content } = req.body;
    const fromUserId = req.user._id;
    if (!toUserId || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const newMessage = new Message({
            sender : fromUserId,
            receiver: toUserId,
            content
        })
        await newMessage.save();
        res.status(201).json({message: "Message sent successfully", newMessage});
    }catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const getMessages = async (req, res) => {
    const toUserId = req.params.toUserId;
    const fromUserId = req.user._id;
    if (!toUserId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try{
        const messages = await Message.find({
            $or: [
                { sender: fromUserId, receiver: toUserId },
                { sender: toUserId, receiver: fromUserId }
            ]
        }).sort({ createdAt: 1 });
        
        res.status(200).json({ messages });
    } catch(err) {
        console.error(err);     
        res.status(500).json({ message: "Server error" });
    }
}
