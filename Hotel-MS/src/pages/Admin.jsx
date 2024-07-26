// import  { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Admin = () => {
//   const initialFormData = {
//     imageUrl: "",
//     type: "",
//     capacity: "",
//     size: "",
//     breakfast: "",
//     pets: "",
//     pricePerDay: "",
//     description: ""
//   };

//   const initialResponseDataStructure = { type: "", message: "" };

//   const [response, setResponse] = useState(initialResponseDataStructure);
//   const [formData, setFormData] = useState(initialFormData);
//   const [rooms, setRooms] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingRoomId, setEditingRoomId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const fetchRooms = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/rooms/");
//       const data = await response.json();
//       setRooms(data);
//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const method = isEditing ? "PUT" : "POST";
//       const endpoint = isEditing
//         ? `http://127.0.0.1:8000/rooms/${editingRoomId}/`
//         : "http://127.0.0.1:8000/rooms/addroom/";

//       const response = await fetch(endpoint, {
//         method: method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setResponse({ type: "success", message: result.message });
//         setFormData(initialFormData);
//         setIsEditing(false);
//         fetchRooms();

//         setTimeout(() => {
//           setResponse(initialResponseDataStructure);
//           navigate("/");
//         }, 5000);
//       } else {
//         const errorData = await response.json();
//         setResponse({ type: "failure", message: errorData.message });
//       }
//     } catch (error) {
//       console.error(error.message, "catch error");
//       setResponse({ type: "failure", message: "Internal Server Error" });
//     }
//   };

//   const handleEdit = (room) => {
//     setFormData(room);
//     setIsEditing(true);
//     setEditingRoomId(room.id);
//   };

//   const handleDelete = async (roomId) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/rooms/${roomId}/`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         fetchRooms();
//       }
//     } catch (error) {
//       console.error("Error deleting room:", error);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-100">
//       <section className="container mx-auto my-8 p-4 bg-white shadow-md rounded-md">
//         <h1 className="text-3xl font-bold mb-6">Manage Rooms</h1>
//         {response.type && (
//           <div className={`${response.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} p-4 rounded-md mb-4`}>
//             {response.message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* Form fields */}
//           {/* ... (input fields for imageUrl, type, capacity, size, breakfast, pets, pricePerDay, description) ... */}

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//           >
//             {isEditing ? "Update Room" : "Add Room"}
//           </button>
//         </form>

//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Room List</h2>
//           {rooms.length > 0 ? (
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2">ID</th>
//                   <th className="px-4 py-2">Type</th>
//                   <th className="px-4 py-2">Capacity</th>
//                   <th className="px-4 py-2">Price</th>
//                   <th className="px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rooms.map((room) => (
//                   <tr key={room.id}>
//                     <td className="border px-4 py-2">{room.id}</td>
//                     <td className="border px-4 py-2">{room.type}</td>
//                     <td className="border px-4 py-2">{room.capacity}</td>
//                     <td className="border px-4 py-2">{room.pricePerDay}</td>
//                     <td className="border px-4 py-2 flex justify-around">
//                       <button
//                         onClick={() => handleEdit(room)}
//                         className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(room.id)}
//                         className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No rooms available.</p>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Admin;

import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const initialFormData = {
    imageUrl: "",
    type: "",
    capacity: "",
    size: "",
    breakfast: "",
    pets: "",
    pricePerDay: "",
    description: ""
  };

  const initialResponseDataStructure = { type: "", message: "" };
  const [response, setResponse] = useState(initialResponseDataStructure);
  const [formData, setFormData] = useState(initialFormData);
  const [rooms, setRooms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/rooms/");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing
        ? `http://127.0.0.1:8000/rooms/${editingRoomId}/`
        : "http://127.0.0.1:8000/rooms/addroom/";

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setResponse({ type: "success", message: result.message });
        setFormData(initialFormData);
        setIsEditing(false);
        fetchRooms();

        // Redirect after successful submission
        setTimeout(() => {
          setResponse(initialResponseDataStructure);
          navigate("/"); // Redirect to home or any other page
        }, 5000);
      } else {
        const errorData = await response.json();
        setResponse({ type: "failure", message: errorData.message });
      }
    } catch (error) {
      console.error(error.message, "catch error");
      setResponse({ type: "failure", message: "Internal Server Error" });
    }
  };

  const handleEdit = (room) => {
    setFormData(room);
    setIsEditing(true);
    setEditingRoomId(room.id);
  };

  const handleDelete = async (roomId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/rooms/${roomId}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchRooms();
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="container mx-auto my-8 p-4 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6">Manage Rooms</h1>
        {response.type === "success" ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
            {response.message}
          </div>
        ) : response.type === "failure" ? (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
            {response.message}
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="form-control border rounded-md p-2 w-full"
              placeholder="URL of the room image"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-semibold mb-2">
              Room Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="form-control border rounded-md p-2 w-full"
              placeholder="e.g., Deluxe Suite"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="capacity" className="block text-gray-700 font-semibold mb-2">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              className="form-control border rounded-md p-2 w-full"
              placeholder="Number of people"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="size" className="block text-gray-700 font-semibold mb-2">
              Size
            </label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              className="form-control border rounded-md p-2 w-full"
              placeholder="Room size in sq. ft."
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="breakfast" className="block text-gray-700 font-semibold mb-2">
              Breakfast Included
            </label>
            <input
              type="text"
              name="breakfast"
              value={formData.breakfast}
              onChange={handleInputChange}
              className="form-control border rounded-md p-2 w-full"
              placeholder="Yes/No"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pets" className="block text-gray-700 font-semibold mb-2">
              Pets Allowed
            </label>
            <input
              type="text"
              name="pets"
              value={formData.pets}
              onChange={handleInputChange}
              className="form-control border rounded-md p-2 w-full"
              placeholder="Yes/No"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pricePerDay" className="block text-gray-700 font-semibold mb-2">
              Price per Day
            </label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleInputChange}
              className="form-control border rounded-md p-2 w-full"
              placeholder="Price in USD"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control border rounded-md p-2 w-full"
              placeholder="Detailed room description"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {isEditing ? "Update Room" : "Add Room"}
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Room List</h2>
          {rooms.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Capacity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td className="border px-4 py-2">{room.id}</td>
                    <td className="border px-4 py-2">{room.type}</td>
                    <td className="border px-4 py-2">{room.capacity}</td>
                    <td className="border px-4 py-2">{room.pricePerDay}</td>
                    <td className="border px-4 py-                    2">
                      <button
                        onClick={() => handleEdit(room)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(room.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No rooms available.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Admin;
