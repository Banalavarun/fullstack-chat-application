import bcrypt from "bcrypt";
import { isValidEmail } from "../lib/utils.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signup = async (req,res) =>{
    const { username, password, email } = req.body;
    if(!username || !password || !email) {
        return res.status(400).send("All fields are required");
    }
    if(!isValidEmail(email)) {
        return res.status(400).send("Invalid email format");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findOne({ email });
    if(user) {
        return res.status(400).send("User already exists");
    };
    const newUser = new User({
        username,
        password: hashedPassword,
        email
    });

    try {
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        console.log("User created successfully");
        res.status(201).send({
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            }   
        });
    } catch (error) {
        res.status(500).send("Server error");
    }
}
export const login = async (req,res) =>{
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).send("All fields are required");
    }
    try{
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).send("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).send("Invalid credentials");
        }   
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        res.status(200).send({
            message: "Login successful",
            user
        });
    }
    catch(error) {
        res.status(500).send("Server error");
    }
}
export const logout = async (req,res) => {
    res.clearCookie("token");
    res.status(200).send("Logout successful");
}

export const userDetails = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        res.status(200).json({user});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}
