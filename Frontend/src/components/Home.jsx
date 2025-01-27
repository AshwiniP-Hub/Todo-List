import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TodoList from "./TodoList";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("Users");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-500 via-pink-400 to-violet-500">
      <Navbar />
      <div className="flex-grow">
        {user ? (
          <>
            <h1 className="text-center text-xl md:text-4xl font-bold mb-8 text-indigo-950 uppercase">
              Todo List
            </h1>
            <TodoList />
          </>
        ) : (
          <>
            <div>
              <img src="/bg1.png" alt="background" className="size-112" />
            </div>
            <div className="flex items-center justify-center pb-32">
              <Link to="/Signup">
                <button className="px-4 py-2 bg-blue-700 rounded-sm text-xl font-semibold">
                  Get Started
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
      <footer className="bg-gray-800 text-white text-xl py-4">
        <div className="text-center text-sm">
          Goaltracker &copy; {currentYear}
        </div>
      </footer>
    </div>
  );
};

export default Home;

