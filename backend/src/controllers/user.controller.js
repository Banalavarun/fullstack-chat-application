import User from "../models/user.model.js";

export const sendFriendRequest = async (req, res) => {
    const { toUserId } = req.body;
    const fromUserId = req.user._id;
    console.log(fromUserId);
    if(!toUserId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try{
        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if(toUser.friendRequests.includes(fromUserId)) {
            return res.status(400).json({ message: "Friend request already sent" });
        }
        if(toUser.friends.includes(fromUserId)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }
        toUser.friendRequests.push(fromUserId);
        await toUser.save();
        res.status(200).json({ message: "Friend request sent successfully" });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const acceptFriendRequest = async (req, res) => {
    const {fromUserId} = req.body;
    const toUserId = req.user._id;
    if(fromUserId === toUserId) {
        return res.status(400).json({ message: "You cannot accept your own friend request" });
    }
    try{
        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if(!toUser.friendRequests.includes(fromUserId)) {
            return res.status(400).json({ message: "No friend request from this user" });
        }
        toUser.friends.push(fromUserId);
        toUser.friendRequests = toUser.friendRequests.filter((id)=> id.toString() !== fromUserId.toString());
        const fromUser = await User.findById(fromUserId);
        if(!fromUser) {
            return res.status(404).json({ message: "Friend not found" });
        }
        fromUser.friends.push(toUserId);
        await fromUser.save();
        await toUser.save();
        res.status(200).json({ friend : fromUser, message: "Friend request accepted successfully" });
    }catch(err){
        console.error(err);
    }
}

export const rejectFriendRequest = async (req, res) => {
    const { fromUserId } = req.body;
    const toUserId = req.user._id;
    if(fromUserId === toUserId) {
        return res.status(400).json({ message: "You cannot reject your own friend request" });
    }
    try{
        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if(!toUser.friendRequests.includes(fromUserId)) {
            return res.status(400).json({ message: "No friend request from this user" });
        }
        toUser.friendRequests = toUser.friendRequests.filter((id)=> id.toString() !== fromUserId.toString());
        await toUser.save();
        res.status(200).json({ message: "Friend request rejected successfully" });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
export const getFriends = async (req, res) => {
    const userId = req.user._id;
    try{
        const user = await User.findById(userId).populate('friends', 'username profilePicture');
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.friends);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    };
};
export const getFriendRequests = async (req, res) => {
    const userId = req.user._id;
    try{
        const user = await User.findById(userId).populate('friendRequests', 'username profilePicture');
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.friendRequests);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    };
};

export const searchUsers = async (req,res) => {
    const  query  = req.query.q;
    const userId = req.user._id;
    if(!query) {
        return res.status(400).json({ message: "Search query is required" });
    }
    try{
        const users = await User.find({
            _id: { $ne: userId },
            username: { $regex: query, $options: 'i' }
        }).select('_id username profilePicture');

        res.status(200).json(users);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
