import { Link } from 'react-router-dom';
import { naira_formater } from '../utils/functions';
import { FaArrowRight } from 'react-icons/fa';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const RoomCard = ({ imageURL, name, details, price, roomType, availability }) => {
  const isAvailable = availability === 'Available';

  return (
    <div className="relative w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
      {/* Image Section */}
      <img
        src={imageURL}
        alt={name}
        className="w-full h-40 object-cover"
      />
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{details}</p>
        <p className="text-lg font-bold mb-2">{naira_formater(price)}</p>
        <p className="text-sm text-gray-500 mb-2">{roomType}</p>
        <div className="flex items-center mb-4">
          {isAvailable ? (
            <AiOutlineCheck className="text-green-500 text-xl mr-2" />
          ) : (
            <AiOutlineClose className="text-red-500 text-xl mr-2" />
          )}
          <span className="text-sm text-gray-500">
            {isAvailable ? 'Available' : 'Not Available'}
          </span>
        </div>
        {/* Arrow Link */}
        <Link
          to="/rooms/:id"
          className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition-colors"
        >
          <FaArrowRight className="text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
