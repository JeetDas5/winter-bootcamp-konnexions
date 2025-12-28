import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./components/AuthLayout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { LogOut, User as UserIcon } from "lucide-react";

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen animate-gradient flex items-center justify-center p-4">
      <div className="auth-card max-w-lg w-full p-8 text-center">
        <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
          <UserIcon className="w-12 h-12 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome Home!</h1>
        <p className="text-gray-400 mb-8">
          You have successfully logged into your account.
        </p>

        <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10 text-left">
          <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">
            Your Profile Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Full Name</span>
              <span className="font-medium">{user.username}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Email Address</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-sm text-gray-400">{user.id}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Dashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/sign-in"
          element={
            !currentUser ? (
              <AuthLayout
                title="Welcome Back"
                subtitle="Please enter your details to sign in"
              >
                <SignIn onLoginSuccess={setCurrentUser} />
              </AuthLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            !currentUser ? (
              <AuthLayout
                title="Create Account"
                subtitle="Join us today and start your journey"
              >
                <SignUp />
              </AuthLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
