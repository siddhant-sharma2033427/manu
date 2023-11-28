import './App.css';
import Home from './components/Homepage/Home';
import ActivityDrower from './components/UserDashboard/ActivityDrower'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserSignup from './components/Login/UserSignup'
import UserLogin from './components/Login/UserLogin'
import Temp from './components/Login/temp'

function App() {
  const clientId = '983827726636-p8nvbc141c7qltht1gq9gnpjjhf38ik4.apps.googleusercontent.com';
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<ActivityDrower />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/temp" element={<Temp />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
