import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from "./pages/About";
import Feed from './pages/Feed'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Navbar from './component/Navbar'
import PrivateRoute from "./component/PrivateRoute";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
