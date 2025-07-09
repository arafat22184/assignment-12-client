import React from "react";

const GoogleLoginBtn = () => {
  return (
    <>
      <motion.button
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-700 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
      >
        <FaGoogle className="text-red-400" />
        <span className="text-white">Google</span>
      </motion.button>
    </>
  );
};

export default GoogleLoginBtn;
