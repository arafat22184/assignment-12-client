import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

const PaymentSuccess = ({ bookingDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="bg-gray-800 rounded-xl p-8 max-w-md text-center border border-lime-400/20">
        <FaCheckCircle className="text-lime-400 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-300 mb-6">
          Your booking with {bookingDetails.trainer} on {bookingDetails.day} at{" "}
          {bookingDetails.time} is confirmed.
        </p>

        <div className="space-y-4 mb-6 text-left bg-gray-700 p-4 rounded-lg">
          <p>
            <span className="text-gray-400">Transaction ID:</span>{" "}
            {bookingDetails.transactionId}
          </p>
          <p>
            <span className="text-gray-400">Package:</span>{" "}
            {bookingDetails.packageName}
          </p>
          <p>
            <span className="text-gray-400">Amount:</span>{" "}
            {bookingDetails.price}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard/payment-history"
            className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-medium py-2 px-4 rounded text-center"
          >
            View Payment History
          </Link>
          <Link
            to="/trainers"
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded text-center"
          >
            Book Another Session
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;
