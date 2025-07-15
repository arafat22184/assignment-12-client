/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaTrash,
  FaUser,
  FaCalendarDay,
  FaClock,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toastMessage from "../../utils/toastMessage";
import Loading from "../../Shared/Loading";
import ConfirmationModal from "../../components/ConfirmationModal";
import useAuth from "../../Hooks/useAuth";

const ManageSlots = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Fetch trainer's booked slots
  const { data: trainerData = {}, isLoading } = useQuery({
    queryKey: ["trainer-slots"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/activity?email=${user.email}`);
      return res.data;
    },
  });

  // Delete slot mutation
  const { mutate: deleteSlot } = useMutation({
    mutationFn: async (slotId) => {
      await axiosSecure.delete(`/bookings/${slotId}`);
    },
    onSuccess: () => {
      toastMessage("Slot deleted successfully!", "success");
      queryClient.invalidateQueries(["trainer-slots"]);
    },
    onError: (error) => {
      toastMessage("Failed to delete slot: " + error.message, "error");
    },
  });

  const bookedSlots = trainerData?.activityLog?.bookedSlots || [];

  const handleDeleteClick = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSlot) {
      console.log(selectedSlot._id);
      deleteSlot(selectedSlot._id);
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
          Manage Training Slots
        </h1>
        <p className="text-gray-300 text-center max-w-3xl mx-auto">
          View and manage all your booked training sessions. Delete slots as
          needed.
        </p>
      </div>

      {bookedSlots.length === 0 ? (
        <div>No booked slots</div>
      ) : (
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="py-4 px-6 text-left text-xs font-medium text-lime-400 uppercase tracking-wider"
                  >
                    Client
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 text-left text-xs font-medium text-lime-400 uppercase tracking-wider"
                  >
                    Session Details
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 text-left text-xs font-medium text-lime-400 uppercase tracking-wider"
                  >
                    Package
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 text-left text-xs font-medium text-lime-400 uppercase tracking-wider"
                  >
                    Payment
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 text-left text-xs font-medium text-lime-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900/50 divide-y divide-gray-800">
                {bookedSlots.map((slot) => (
                  <motion.tr
                    key={slot._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ backgroundColor: "rgba(30, 41, 59, 0.5)" }}
                    className="text-gray-300"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-full border-2 border-lime-400/50 object-cover"
                            src={slot.userImage || "/default-avatar.jpg"}
                            alt={slot.userName}
                            onError={(e) => {
                              e.target.src = "/default-avatar.jpg";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-100">
                            {slot.userName}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center mt-1">
                            <FaUser className="mr-1 text-lime-400" />
                            {slot.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm">
                      <div className="flex items-center">
                        <FaCalendarDay className="mr-2 text-lime-400" />
                        <span className="font-medium">{slot.slot.day}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <FaClock className="mr-2 text-lime-400" />
                        <span>{slot.slot.time}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        Booked on: {new Date(slot.paidAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm">
                      <div className="font-medium">{slot.package}</div>
                      <div className="mt-1 text-xs bg-lime-400/10 text-lime-400 inline-block px-2 py-1 rounded-full">
                        {slot.classId ? "Group Class" : "Personal Training"}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm">
                      <div className="flex items-center">
                        <FaDollarSign className="mr-1 text-lime-400" />
                        <span className="font-medium">{slot.price}</span>
                      </div>
                      <div
                        className={`mt-1 inline-flex text-xs px-2 py-1 rounded-full ${
                          slot.paymentStatus === "paid"
                            ? "bg-emerald-400/10 text-emerald-400"
                            : "bg-amber-400/10 text-amber-400"
                        }`}
                      >
                        {slot.paymentStatus}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm">
                      <button
                        onClick={() => handleDeleteClick(slot)}
                        className="flex items-center text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FaTrash className="mr-1" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Training Slot"
        message={`Are you sure you want to delete the slot booked by ${selectedSlot?.userName} on ${selectedSlot?.day} at ${selectedSlot?.time}? This action cannot be undone.`}
        confirmText="Delete Slot"
        confirmColor="red"
      />
    </motion.div>
  );
};

export default ManageSlots;
