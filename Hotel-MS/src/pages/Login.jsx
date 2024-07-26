import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/functions";

export default function Login() {
  const initialFormData = { username: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [response, setResponse] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponse({ type: "", message: "" });
    try {
      const res = await fetch("https://yourapi.com/user/login/", { // Ensure API URL uses HTTPS
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const result = await res.json();
        setCookie(result.token); // Assumes setCookie is secure
        setResponse({ type: "success", message: result.message });
        setFormData(initialFormData);
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        const errorData = await res.json();
        setResponse({ type: "failure", message: errorData.message || "An error occurred" });
      }
    } catch (error) {
      setResponse({ type: "failure", message: error.message || "An error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {response.message && (
          <div className={`p-4 mb-4 text-white ${response.type === "success" ? "bg-green-500" : "bg-red-500"} rounded`}>
            {response.message}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 font-bold text-white rounded-md ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          If you have not created an account yet{" "}
          <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </main>
  );
}
