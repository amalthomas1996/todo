import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add state for error handling
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state on submit
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      setError(
        "Login failed: " + (error.response?.data.message || "Unknown error")
      );
      console.error("Login failed", error.response?.data);
    }
  };

  const handleSignUp = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="text-red-500">{error}</div>}{" "}
        {/* Display error message */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleSignUp}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700 mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
