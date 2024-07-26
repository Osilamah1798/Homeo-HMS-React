import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
  const { id } = useParams(); // Get the room ID from the URL
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Log the id to ensure it's being captured
    console.log('Room ID:', id);

    // Fetch room details by ID
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/rooms/${id}/`); // Ensure this endpoint is correct
        if (!response.ok) {
          throw new Error('Room not found');
        }
        const data = await response.json();
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      {room && (
        <div className="container mx-auto bg-white shadow-md rounded-md p-6">
          <h1 className="text-3xl font-bold mb-4">{room.type}</h1>
          <div className="flex flex-col lg:flex-row">
            {/* Single Image */}
            <div className="flex-1">
              <img 
                src={room.image_url} 
                alt={room.type} 
                className="w-full h-96 object-cover rounded-md mb-4 lg:mb-0" 
              />
            </div>
          </div>
          <div className="mt-6">
            <p><strong>Capacity:</strong> {room.capacity} people</p>
            <p><strong>Size:</strong> {room.size}</p>
            <p><strong>Breakfast Included:</strong> {room.breakfast ? 'Yes' : 'No'}</p>
            <p><strong>Pets Allowed:</strong> {room.pets ? 'Yes' : 'No'}</p>
            <p><strong>Price per Day:</strong> ${room.price_per_day}</p>
            <p><strong>Description:</strong> {room.description}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default RoomPage;
