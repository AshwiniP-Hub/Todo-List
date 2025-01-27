import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  return (
    <>
    <Toaster />
     <Routes>
       <Route path="/" element={<Home/>} />
     <Route path="/Login" element={<Login/>} />
      <Route path="/Signup" element={<Signup/>} />
     </Routes>
    </> 
  );
};

export default App;