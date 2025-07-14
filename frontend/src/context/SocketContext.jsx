import { createContext, useContext } from "react";
import socket from "../socket.js";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

export const SocketProvider = ({ children }) =>(
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = ()=> useContext(SocketContext);