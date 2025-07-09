/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const GithubLoginBtn = () => {
  return (
    <>
      <motion.button
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-700 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
      >
        <FaGithub className="text-gray-200" />
        <span className="text-white">GitHub</span>
      </motion.button>
    </>
  );
};

export default GithubLoginBtn;
