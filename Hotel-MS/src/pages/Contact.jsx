import  { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Import icons

export default function Contact() {
  const initialFormData = { name: '', email: '', subject: '', message: '' };
  const [formData, setFormData] = useState(initialFormData);
  const [response, setResponse] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponse({ type: '', message: '' });

    try {
      const res = await fetch('https://yourapi.com/contact/', { // Update with your API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const result = await res.json();
        setResponse({ type: 'success', message: result.message || 'Message sent successfully!' });
        setFormData(initialFormData);
      } else {
        const errorData = await res.json();
        setResponse({ type: 'failure', message: errorData.message || 'An error occurred' });
      }
    } catch (error) {
      setResponse({ type: 'failure', message: error.message || 'An error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20">
      {/* Added padding to the top of the main content */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        {/* Introductory Text */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">Get in Touch</h2>
          <p className="text-gray-700 text-center">
            We would love to hear from you! If you have any questions, concerns, or feedback, please reach out to us using the contact form below or through our contact details.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-8">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center text-gray-700 mb-2">
              <FaMapMarkerAlt className="text-xl mr-2" />
              <a href="https://maps.google.com/?q=1234+Hotel+Road,+City,+Country" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                1234 Hotel Road, City, Country
              </a>
            </div>
            <div className="flex items-center text-gray-700 mb-2">
              <FaPhoneAlt className="text-xl mr-2" />
              <a href="tel:+1234567890" className="text-blue-500 hover:underline">
                (+123) 456-7890
              </a>
            </div>
            <div className="flex items-center text-gray-700">
              <FaEnvelope className="text-xl mr-2" />
              <a href="mailto:contact@hotelname.com" className="text-blue-500 hover:underline">
                contact@hotelname.com
              </a>
            </div>
          </div>
        </section>

        {/* Form */}
        {response.message && (
          <div className={`p-4 mb-4 text-white ${response.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`}>
            {response.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 font-bold text-white rounded-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  );
}
