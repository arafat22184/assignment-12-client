import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import {
  FaHome,
  FaDumbbell,
  FaUsers,
  FaComments,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AiFillDashboard } from "react-icons/ai";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const publicLinks = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={handleMobileLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "bg-lime-400/20 text-lime-400 font-medium"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <FaHome className="text-lg" />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allTrainers"
          onClick={handleMobileLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "bg-lime-400/20 text-lime-400 font-medium"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <FaUsers className="text-lg" />
          Trainers
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allClasses"
          onClick={handleMobileLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "bg-lime-400/20 text-lime-400 font-medium"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <FaDumbbell className="text-lg" />
          Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allClasses"
          onClick={handleMobileLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "bg-lime-400/20 text-lime-400 font-medium"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <AiFillDashboard className="text-lg" />
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/community"
          onClick={handleMobileLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? "bg-lime-400/20 text-lime-400 font-medium"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <FaComments className="text-lg" />
          Community
        </NavLink>
      </li>
    </>
  );

  const authLinks = (
    <div className="flex gap-2">
      <NavLink
        to="/login"
        onClick={handleMobileLinkClick}
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isActive
              ? "bg-lime-400 text-black font-medium"
              : "border border-lime-400 text-lime-400 hover:bg-lime-400/10"
          }`
        }
      >
        <FaSignInAlt />
        Login
      </NavLink>
      <NavLink
        to="/register"
        onClick={handleMobileLinkClick}
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isActive
              ? "bg-lime-400 text-black font-medium"
              : "bg-lime-400/10 text-lime-400 hover:bg-lime-400/20"
          }`
        }
      >
        <FaUserPlus />
        Register
      </NavLink>
    </div>
  );

  return (
    <nav className="fixed lg:top-4 left-0 right-0 z-50">
      <div className=" lg:mx-auto max-w-screen-xl px-4 py-3 bg-white/10 backdrop-blur-sm lg:rounded-2xl shadow-md">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              className="w-32"
              src="https://i.ibb.co/qS1WNFv/Fit-Forge-Logo.png"
              alt="FitForge Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-2">{publicLinks}</ul>

          <div className="hidden lg:flex">{authLinks}</div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-lime-400 p-2"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <ul className="flex flex-col gap-2 mb-4">{publicLinks}</ul>
            {authLinks}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
