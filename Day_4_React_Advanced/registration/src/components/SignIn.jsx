import React, { useState } from "react";
import { Mail, Lock, LogIn, Github, Chrome, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call with localStorage
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u) => u.email === formData.email);

        if (!user) {
          toast.error("User not found!");
          setLoading(false);
          return;
        }

        if (user.password !== formData.password) {
          toast.error("Invalid password!");
          setLoading(false);
          return;
        }

        setLoading(false);
        toast.success(`Welcome back, ${user.username || "User"}!`);

        // Store current user session in localStorage or state
        localStorage.setItem("currentUser", JSON.stringify(user));

        if (onLoginSuccess) {
          onLoginSuccess(user);
        }

        navigate("/");
      } catch (error) {
        toast.error("An error occurred during sign in.");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="email"
            placeholder="Email Address"
            className="input-field"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input-field pr-12"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            className="mr-2 rounded border-white/10 bg-white/5"
          />
          Keep me signed in
        </label>
        <Link
          to="#"
          className="text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary flex items-center justify-center gap-2 group"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span>Sign In</span>
            <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#1e1b4b] px-2 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Github className="w-5 h-5" />
          <span className="text-sm">Github</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Chrome className="w-5 h-5 text-red-400" />
          <span className="text-sm">Google</span>
        </button>
      </div>

      <p className="text-center text-gray-400 text-sm">
        Don't have an account?{" "}
        <Link
          to="/sign-up"
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          Create account
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
