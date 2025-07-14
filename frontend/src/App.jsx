import {Routes, Route, Navigate} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore.js';
import ProtectedRoute from './components/ProtectedRoute';


export default function App() {
    const { user ,fetchUser, loading } = useAuthStore();
    useEffect(() => {
        fetchUser();
    },[]);
    if(loading) return <div>Loading...</div>;
    return (
      <Routes>
        <Route path='/' element={<Navigate to ={user ? "/home" : "/login"}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={user?<Navigate to="/home"/>:<Login/>} />
        <Route path='/home' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>} />
        <Route path='*' element={<Navigate to="/login" />} />
      </Routes>
    );
}
