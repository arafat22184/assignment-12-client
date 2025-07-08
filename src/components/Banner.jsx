import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden text-white">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.pixabay.com/video/2023/01/27/148202-793717935_large.mp4" // Replace with your own video URL or local path
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/15  z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Train Harder, Live <span className="text-lime-400">Stronger</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Achieve your fitness goals with expert trainers, powerful tracking
          tools, and a vibrant community.
        </p>
        <Link
          to="/allClasses"
          className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-semibold px-6 py-3 rounded-lg transition"
        >
          Explore Classes <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default Banner;
