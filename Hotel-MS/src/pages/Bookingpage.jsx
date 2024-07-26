import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingPage = () => {
  const { roomId } = useParams(); // Get roomId from URL
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [numberOfPersons, setNumberOfPersons] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    // Fetch room details from JSON based on roomId
    fetch('/path/to/your/rooms.json')
      .then((response) => response.json())
      .then((data) => {
        const room = data.find((room) => room.id === roomId); // Find the room by ID
        setRoomDetails(room);
      })
      .catch((error) => console.error('Error fetching room details:', error));
  }, [roomId]);

  const handleConfirmBooking = () => {
    // Handle booking confirmation logic here
    alert('Booking Confirmed!');
  };

  if (!roomDetails) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto my-8 p-4 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6">Booking</h1>
        <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img src={roomDetails.imageUrl} alt="Selected Room" className="w-full h-64 object-cover rounded-md" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Room Details</h2>
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left p-2">Room Type</th>
                  <td className="p-2">{roomDetails.type}</td>
                </tr>
                <tr>
                  <th className="text-left p-2">Capacity</th>
                  <td className="p-2">{roomDetails.capacity}</td>
                </tr>
                <tr>
                  <th className="text-left p-2">Size</th>
                  <td className="p-2">{roomDetails.size}</td>
                </tr>
                <tr>
                  <th className="text-left p-2">Breakfast</th>
                  <td className="p-2">{roomDetails.breakfast}</td>
                </tr>
                <tr>
                  <th className="text-left p-2">Pets</th>
                  <td className="p-2">{roomDetails.pets}</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <label htmlFor="fromDate" className="block text-gray-700 font-semibold mb-2">From Date</label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                className="form-control border rounded-md p-2 w-full"
              />
            </div>
            <div className="md:w-1/2">
              <label htmlFor="toDate" className="block text-gray-700 font-semibold mb-2">To Date</label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                className="form-control border rounded-md p-2 w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <h6 className="font-semibold">Number of Days: {Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24))}</h6>
            <mark>Please make sure Check-in time is from 9 am to 12 pm</mark>
          </div>
          <div className="md:w-1/2">
            <h6 className="font-bold">Price per Day: <span className="text-gray-800">{roomDetails.pricePerDay}</span></h6>
            <h6 className="font-bold">Total Price: <span className="text-blue-500">{roomDetails.totalPrice}</span></h6>
          </div>
        </div>

        <form>
          <div className="mb-4">
            <label htmlFor="numberOfPersons" className="block text-gray-700 font-semibold mb-2">No. of Persons</label>
            <input
              type="number"
              id="numberOfPersons"
              value={numberOfPersons}
              onChange={(e) => setNumberOfPersons(e.target.value)}
              className="form-control border rounded-md p-2 w-full"
              placeholder="No. of persons"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control border rounded-md p-2 w-full"
              placeholder="Full name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control border rounded-md p-2 w-full"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control border rounded-md p-2 w-full"
              placeholder="Your address"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control border rounded-md p-2 w-full"
              placeholder="Enter email"
            />
            <small className="text-gray-500">Enter the same email through which you have logged in.</small>
          </div>

          <button
            type="button"
            onClick={handleConfirmBooking}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
