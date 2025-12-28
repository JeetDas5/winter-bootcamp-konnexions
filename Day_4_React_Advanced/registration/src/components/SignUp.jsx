import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus, Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    setLoading(true);

    // Simulate API call with localStorage
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find((u) => u.email === formData.email)) {
          toast.error("User already exists with this email!");
          setLoading(false);
          return;
        }

        const newUser = {
          id: Date.now(),
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

        localStorage.setItem("users", JSON.stringify([...users, newUser]));

        setLoading(false);
        toast.success("Account created successfully!");
        navigate("/sign-in");
      } catch (error) {
        toast.error("An error occurred during registration.");
        console.log(error);
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>

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

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="input-field pr-12"
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex items-start text-sm">
        <label className="flex items-center text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 mr-2 rounded border-white/10 bg-white/5"
            required
          />
          <span>
            I agree to the{" "}
            <Link to="#" className="text-indigo-400 hover:text-indigo-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-indigo-400 hover:text-indigo-300">
              Privacy Policy
            </Link>
          </span>
        </label>
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
            <span>Create Account</span>
            <UserPlus className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="text-center text-gray-400 text-sm">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
