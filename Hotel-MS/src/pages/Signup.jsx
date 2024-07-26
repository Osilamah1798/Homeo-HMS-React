import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setCookie } from '../utils/functions'; // Adjust the path as needed

export default function Signup() {
  const initialFormData = { username: '', email: '', password: '', confirmPassword: '' };
  const [formData, setFormData] = useState(initialFormData);
  const [response, setResponse] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setResponse({ type: 'failure', message: 'Passwords do not match' });
      return;
    }

    setIsSubmitting(true);
    setResponse({ type: '', message: '' });
    try {
      const res = await fetch('https://yourapi.com/user/register/', { // Ensure API URL uses HTTPS
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const result = await res.json();
        setCookie(result.token); // Assumes setCookie is secure
        setResponse({ type: 'success', message: result.message });
        setFormData(initialFormData);
        setTimeout(() => {
          navigate('/dashboard'); // Redirect after successful registration
        }, 500);
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.message || 'An error occurred';

        // Specific error handling
        if (errorData.errors) {
          // Display specific field errors if available
          const fieldErrors = Object.values(errorData.errors).join(' ');
          setResponse({ type: 'failure', message: fieldErrors });
        } else {
          // Display general error message
          setResponse({ type: 'failure', message: errorMessage });
        }
      }
    } catch (error) {
      setResponse({ type: 'failure', message: error.message || 'An error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {response.message && (
          <div className={`p-4 mb-4 text-white ${response.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`}>
            {response.message}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 font-bold text-white rounded-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </main>
  );
}
