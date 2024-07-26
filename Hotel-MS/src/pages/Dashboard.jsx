import { useState, useEffect } from 'react';
import RoomCard from '../components/RoomCard'; // Import RoomCard component

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch room data from JSON file or API
    fetch('http://127.0.0.1:8000/rooms/getrooms/') // Update with your API endpoint
      .then(response => response.json())
      .then(data => {
        console.log('Fetched rooms:', data); // Log the response data
        setRooms(data.data); // Adjust according to the actual structure
      })
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Section 1: Hero Banner */}
      <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: 'url("https://via.placeholder.com/1500x600")' }}>
        <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Dashboard</h1>
          <p className="text-lg mb-6 text-center">
            Manage your rooms, view bookings, and update your hotel details with ease.
          </p>
        </div>
      </div>

      {/* Section 2: Room Cards */}
      <div id="book-room" className="p-8 bg-gray-100">
        <div className="flex flex-wrap gap-4">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomCard
                key={room.id}
                imageURL={room.image_url} // Adjusted to use image_url
                name={room.type} // Assuming 'type' refers to the room name/type
                details={room.description} // Assuming 'description' provides room details
                price={room.price_per_day} // Adjusted to price_per_day
                roomType={room.type}
                availability={room.availability}
              />
            ))
          ) : (
            <p>No rooms available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
