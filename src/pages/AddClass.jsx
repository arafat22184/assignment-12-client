import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaChalkboardTeacher, FaImage } from "react-icons/fa";
import { MdFitnessCenter, MdOutlineDescription } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toastMessage from "../utils/toastMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const daysOfWeek = [
    { id: "mon", label: "Mon" },
    { id: "tue", label: "Tue" },
    { id: "wed", label: "Wed" },
    { id: "thu", label: "Thu" },
    { id: "fri", label: "Fri" },
    { id: "sat", label: "Sat" },
    { id: "sun", label: "Sun" },
  ];

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const toggleDaySelection = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const { mutate: addClass } = useMutation({
    mutationFn: async (classData) => {
      setIsUploading(true);

      // Format schedule data
      const scheduleData = {
        days: selectedDays,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        startTime: startTime.toTimeString().substring(0, 5),
        endTime: endTime.toTimeString().substring(0, 5),
      };

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("schedule", JSON.stringify(scheduleData));

      Object.keys(classData).forEach((key) => {
        if (key !== "schedule") {
          formData.append(key, classData[key]);
        }
      });

      formData.append("createdBy", user.email);
      formData.append("createdByName", user.displayName);

      const res = await axiosSecure.post("/classes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      reset();
      setImageFile(null);
      setSelectedDays([]);
      setIsUploading(false);
      queryClient.invalidateQueries(["classes"]);
      Swal.fire({
        title: "Class Added!",
        text: "The new class has been successfully added to the system.",
        icon: "success",
        confirmButtonColor: "#a3e635",
        background: "#1f2937",
        color: "#f3f4f6",
      });
    },
    onError: (error) => {
      setIsUploading(false);
      toastMessage(
        error.response?.data?.message || "Failed to add class",
        "error"
      );
    },
  });

  const onSubmit = (data) => {
    if (!imageFile) {
      toastMessage("Please select a class image", "error");
      return;
    }
    if (selectedDays.length === 0) {
      toastMessage("Please select at least one day", "error");
      return;
    }
    addClass(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toastMessage("Image size should be less than 2MB", "error");
        return;
      }
      setImageFile(file);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-lg max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <GiWeightLiftingUp className="text-3xl text-lime-400" />
          <div>
            <h2 className="text-2xl font-bold text-lime-400">
              Add New Fitness Class
            </h2>
            <p className="text-gray-400 mt-1">
              Fill out the form below to create a new class for your fitness
              program
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Class Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Class Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdFitnessCenter className="text-gray-400" />
            </div>
            <input
              type="text"
              {...register("className", {
                required: "Class name is required",
                maxLength: {
                  value: 60,
                  message: "Class name should not exceed 60 characters",
                },
              })}
              className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-gray-300"
              placeholder="e.g. Power Yoga, HIIT, CrossFit"
            />
          </div>
          {errors.className && (
            <p className="text-red-400 text-sm mt-1">
              {errors.className.message}
            </p>
          )}
        </div>

        {/* Class Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Class Image <span className="text-red-400">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 flex items-center justify-between">
                <span>{imageFile ? imageFile.name : "Select an image"}</span>
                <FaImage className="text-gray-400" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required
              />
            </label>
            {imageFile && (
              <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-lime-400">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          {!imageFile && (
            <p className="text-red-400 text-sm mt-1">
              Please select an image (max 2MB)
            </p>
          )}
        </div>

        {/* Instructor Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Instructor Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaChalkboardTeacher className="text-gray-400" />
            </div>
            <input
              type="text"
              {...register("instructorName", {
                required: "Instructor name is required",
              })}
              className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-gray-300"
              placeholder="Enter instructor's name"
            />
          </div>
          {errors.instructorName && (
            <p className="text-red-400 text-sm mt-1">
              {errors.instructorName.message}
            </p>
          )}
        </div>

        {/* Schedule */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Schedule <span className="text-red-400">*</span>
          </label>

          {/* Days Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Days of Week *
            </label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => toggleDaySelection(day.id)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedDays.includes(day.id)
                      ? "bg-lime-400 text-gray-900"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
            {selectedDays.length === 0 && (
              <p className="text-red-400 text-sm mt-1">
                Please select at least one day
              </p>
            )}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Start Date *
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                End Date *
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-gray-300"
              />
            </div>
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Start Time *
              </label>
              <DatePicker
                selected={startTime}
                onChange={(time) => setStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                End Time *
              </label>
              <DatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Class Description <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
              <MdOutlineDescription className="text-gray-400" />
            </div>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 30,
                  message: "Description should be at least 30 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Description should not exceed 500 characters",
                },
              })}
              rows="4"
              className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-gray-300"
              placeholder="Describe the class, benefits, intensity level, target audience, etc."
            ></textarea>
          </div>
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Difficulty Level <span className="text-red-400">*</span>
          </label>
          <select
            {...register("difficultyLevel", {
              required: "Difficulty level is required",
            })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-gray-300"
          >
            <option value="">Select difficulty level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="All Levels">All Levels</option>
          </select>
          {errors.difficultyLevel && (
            <p className="text-red-400 text-sm mt-1">
              {errors.difficultyLevel.message}
            </p>
          )}
        </div>

        {/* Equipment Needed */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Equipment Needed
          </label>
          <input
            type="text"
            {...register("equipmentNeeded")}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-gray-300"
            placeholder="e.g. Yoga mat, Dumbbells, Resistance bands (optional)"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full ${
              isUploading
                ? "bg-lime-600 cursor-not-allowed"
                : "bg-lime-400 hover:bg-lime-500 cursor-pointer"
            } text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2`}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding Class...
              </>
            ) : (
              <>
                <MdFitnessCenter className="text-lg" />
                <span>Add Class</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
