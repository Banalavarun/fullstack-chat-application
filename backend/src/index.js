import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";


const app = express();


dotenv.config({ quiet: true });

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/messages",messageRoutes);

const server = http.createServer(app);

const io = new Server(server,{
    cors : {
        origin : process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials : true,
    },
})

const onlineUsers = new Map();

io.on("connection",(socket)=>{

    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });


    socket.on("send-msg",(data)=>{
    const sendToSocketId = onlineUsers.get(data.to);

    if(sendToSocketId){
        io.to(sendToSocketId).emit("msg-receive",{
            _id: Date.now().toString(),
            from: data.from,
            content: data.content,
            createdAt: new Date().toISOString()
        });
    }
});


    socket.on("disconnect",()=>{
        for(const [key,value] of onlineUsers.entries()){
            if(value===socket.id){
                onlineUsers.delete(key);
                break;
            }
        }
    });

})

server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
    connectDB();
});