import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useLocation } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaCalendarAlt,
  FaStar,
  FaDumbbell,
  FaCertificate,
  FaUserTie,
} from "react-icons/fa";
import Loading from "../../Shared/Loading";
import BecomeTrainerCTA from "../../components/BecomeTrainerCTA";

const TrainersDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const classId = new URLSearchParams(location.search).get("classId");
  const axiosSecure = useAxiosSecure();
  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["trainer-by-id", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainer/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className=" min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <BecomeTrainerCTA></BecomeTrainerCTA>
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Trainer Info Section */}
          <div
            className="max-h-fit
 bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-shrink-0">
                <img
                  src={trainer.photoURL || "/default-avatar.jpg"}
                  alt={trainer.name}
                  className="w-40 h-40 object-cover rounded-full border-4 border-lime-400/30 shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {trainer.name}
                </h1>
                <div className="flex items-center gap-2 text-lime-400 mb-4">
                  <FaStar className="text-amber-400" />
                  <span>
                    {trainer.trainerApplication?.experience} years experience
                  </span>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mb-6">
                  {trainer.trainerApplication?.facebook && (
                    <a
                      href={trainer.trainerApplication.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-400 hover:text-white text-xl"
                    >
                      <FaFacebook />
                    </a>
                  )}
                  {trainer.trainerApplication?.instagram && (
                    <a
                      href={trainer.trainerApplication.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-400 hover:text-white text-xl"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {trainer.trainerApplication?.linkedin && (
                    <a
                      href={trainer.trainerApplication.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-400 hover:text-white text-xl"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <FaUserTie className="text-lime-400" />
                    <span>Age: {trainer.trainerApplication?.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCertificate className="text-lime-400" />
                    <span>{trainer.trainerApplication?.certifications}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expertise Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-lime-400 mb-4 flex items-center gap-2">
                <FaDumbbell /> Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {trainer.trainerApplication?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm border border-lime-400/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div>
              <h2 className="text-xl font-bold text-lime-400 mb-4">About</h2>
              <p className="text-gray-400">
                Certified professional trainer with{" "}
                {trainer.trainerApplication?.experience} years of experience in
                fitness training. Specializing in{" "}
                {trainer.trainerApplication?.skills?.slice(0, 3).join(", ")} and
                dedicated to helping clients achieve their fitness goals through
                personalized training programs.
              </p>
            </div>
          </div>

          {/* Available Slots Section - Content Height Only */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-min sticky top-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-lime-400 flex items-center gap-2">
                <FaCalendarAlt /> Available Slots
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Click on any available time to book your training session
              </p>
            </div>

            <div className="space-y-4">
              {trainer.trainerApplication?.availableDays?.map((day, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {day}
                  </h3>
                  <div className="flex  gap-2">
                    {trainer.trainerApplication?.availableTimeSlots?.map(
                      (time, timeIndex) => (
                        <Link
                          key={timeIndex}
                          to={`/book-trainer/${trainer._id}?day=${day}&time=${time}&classId=${classId}`}
                          className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-medium py-2 px-4 rounded text-sm transition-colors whitespace-nowrap"
                        >
                          {time}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainersDetails;
