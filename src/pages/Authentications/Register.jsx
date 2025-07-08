/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaGithub,
  FaUser,
  FaCamera,
  FaUserPlus,
} from "react-icons/fa";
import { Link } from "react-router";
import { useState, useRef } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 pt-20 lg:pt-0">
      {/* Floating background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-lime-400 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-emerald-500 blur-3xl"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 backdrop-blur-sm"
      >
        {/* Left Side - Branding */}
        <div className="bg-gradient-to-br from-lime-500 to-emerald-600 p-10 flex flex-col justify-center relative overflow-hidden">
          {/* Top right circle */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-18 -right-16 w-52 h-52 rounded-full bg-white/20"
          ></motion.div>

          {/* 3 circle top */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 right-8 md:right-32 lg:right-6 w-20 h-20 rounded-full bg-white/20"
          ></motion.div>

          {/* 3 circle left */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-15 right-8 md:right-32 lg:right-6 w-20 h-20 rounded-full bg-white/20"
          ></motion.div>

          {/* 3 circle bottom */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-10 right-16 md:right-40 lg:right-14 w-20 h-20 rounded-full bg-white/20"
          ></motion.div>

          {/* Bottom left Circle */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-white/20"
          ></motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Join FitForge!
            </h2>
            <p className="mb-8 text-gray-800 font-medium">
              Create your account and start your fitness journey
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="mb-4 text-sm text-black">
              Already have an{" "}
              <span className="font-semibold text-white">account?</span>
            </p>
            <Link
              to="/login"
              className="group relative z-10 bg-black hover:bg-black/85 text-white text-center py-3 px-6 rounded-lg font-semibold flex justify-center items-center gap-2 w-[186px]"
            >
              <FaUserPlus className="text-white text-lg group-hover:scale-110 transition-transform duration-200" />
              Login Now
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-gray-900/80 p-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-3xl font-semibold mb-8 text-white">Register</h3>

            <form className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus-within:border-lime-400 transition">
                  <FaUser className="mr-3 text-lime-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500"
                    required
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus-within:border-lime-400 transition">
                  <FaEnvelope className="mr-3 text-lime-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500"
                    required
                  />
                </div>
              </motion.div>

              {/* Photo Upload */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Profile Photo
                </label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePhotoClick}
                  className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 cursor-pointer hover:border-lime-400 transition"
                >
                  <FaCamera className="mr-3 text-lime-400" />
                  <span className="text-white">
                    {formData.photo ? formData.photo.name : "Upload your photo"}
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    name="photo"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                  />
                </motion.div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus-within:border-lime-400 transition">
                  <FaLock className="mr-3 text-lime-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500"
                    required
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center gap-3 w-full py-3.5 bg-gradient-to-r from-lime-500 to-emerald-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-lime-400/20 transition-all cursor-pointer"
              >
                <FaUserPlus />
                Create Account
              </motion.button>
            </form>

            {/* Social Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="my-8 flex items-center"
            >
              <div className="flex-grow border-t border-gray-700" />
              <span className="px-4 text-sm text-gray-400">
                Or sign up with
              </span>
              <div className="flex-grow border-t border-gray-700" />
            </motion.div>

            {/* Social Logins */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-700 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <FaGoogle className="text-red-400" />
                <span className="text-white">Google</span>
              </motion.button>

              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-700 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <FaGithub className="text-gray-200" />
                <span className="text-white">GitHub</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;
