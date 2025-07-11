import { Link } from "react-router";
import { useState } from "react";

const ClassCard = ({ classItem }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [trainers] = useState([]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <img
        src={classItem.imageUrl}
        alt={classItem.className}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-lime-400">
            {classItem.className}
          </h2>
          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
            {classItem.difficultyLevel}
          </span>
        </div>

        <div className="mb-2 flex-grow">
          <p
            className={`text-gray-300 ${
              showFullDescription ? "" : "line-clamp-3"
            }`}
          >
            {classItem.description}
          </p>
          {classItem.description.length > 150 && (
            <button
              onClick={toggleDescription}
              className="text-lime-400 hover:text-lime-300 text-sm mt-1 focus:outline-none"
            >
              {showFullDescription ? "Show Less" : "Read More"}
            </button>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-400">
            <span className="font-semibold">Equipment:</span>{" "}
            {classItem.equipmentNeeded || "None required"}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-300 mb-2">Skills Focus:</h3>
          <div className="flex flex-wrap gap-2">
            {classItem.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-lime-500 text-gray-900 px-2 py-1 rounded text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <h3 className="font-semibold text-gray-300 mb-3">Trainers:</h3>
          <div className="flex flex-wrap gap-3">
            {trainers.slice(0, 5).map((trainer) => (
              <Link
                to={`/trainers/${trainer.id}`}
                key={trainer.id}
                className="group relative"
              >
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-600 group-hover:border-lime-400 transition-colors"
                />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {trainer.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
