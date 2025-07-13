/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";
import {
  FaUserTie,
  FaDollarSign,
  FaChartLine,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import { MdFitnessCenter } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Link } from "react-router";
import StatCard from "../../components/StatCard";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all dashboard data in parallel
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const [subscribersRes, trainersRes, paymentsRes] = await Promise.all([
        axiosSecure.get("/newsletter"),
        axiosSecure.get("/users/trainers"),
        axiosSecure.get("/admin/payment-summary"),
      ]);

      return {
        subscribers: subscribersRes.data,
        trainers: trainersRes.data,
        payments: paymentsRes.data,
      };
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-red-500 text-center mt-8">
        Failed to load dashboard data
      </div>
    );

  // Prepare data for charts
  const activityData = [
    { name: "Subscribers", value: dashboardData.subscribers.length },
    { name: "Trainers", value: dashboardData.trainers.length },
  ];

  const recentTransactions =
    dashboardData.payments?.last6Transactions?.slice(0, 3) || [];

  return (
    <div className="p-4 sm:p-6 bg-gray-900 rounded-xl space-y-6">
      {/* Header (unchanged) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <MdFitnessCenter className="text-lime-400 text-3xl" />
            Fitness Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Overview of your fitness platform's performance
          </p>
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
          <FaCalendarAlt className="text-lime-400" />
          <span className="text-white">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Compact Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FaEnvelope className="text-lime-400 text-xl" />}
          title="Subscribers"
          value={dashboardData.subscribers.length}
          description="Fitness enthusiasts"
          color="lime"
        />
        <StatCard
          icon={<GiWeightLiftingUp className="text-blue-400 text-xl" />}
          title="Trainers"
          value={dashboardData.trainers.length}
          description="Certified professionals"
          color="blue"
        />
        <StatCard
          icon={<FaDollarSign className="text-amber-400 text-xl" />}
          title="Revenue"
          value={`$${dashboardData.payments?.totalPaid?.toLocaleString() || 0}`}
          description="All-time earnings"
          color="amber"
        />
        <StatCard
          icon={<FaUserTie className="text-purple-400 text-xl" />}
          title="Avg. Sessions"
          value={
            dashboardData.payments?.last6Transactions?.length > 0
              ? Math.round(
                  dashboardData.payments.last6Transactions.length /
                    dashboardData.trainers.length
                )
              : 0
          }
          description="Per trainer"
          color="purple"
        />
      </div>

      {/* Improved Compact Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Mini Activity Chart */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-medium text-white flex items-center gap-2">
              <FaChartLine className="text-lime-400" />
              Activity Overview
            </h3>
            <span className="text-xs text-gray-400">Last 30 days</span>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="#6b7280"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                    borderRadius: "0.375rem",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#a3e635"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compact Transactions */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-white flex items-center gap-2">
              <FaDollarSign className="text-blue-400" />
              Recent Transactions
            </h3>
            <Link
              to="/dashboard/balance"
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
            >
              View all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx) => (
                <div
                  key={tx._id}
                  className="flex items-center justify-between p-3 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-400/10 p-2 rounded-lg">
                      <FaDollarSign className="text-blue-400 text-sm" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {tx.userName}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {new Date(tx.paidAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium text-sm">
                      ${tx.price}
                    </p>
                    <p className="text-gray-400 text-xs">{tx.trainer}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-400">
                <p>No recent transactions</p>
              </div>
            )}
          </div>
        </div>

        {/* Trainer Performance */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-white flex items-center gap-2">
              <GiWeightLiftingUp className="text-purple-400" />
              Top Trainers
            </h3>
            <Link
              to="/dashboard/allTrainers"
              className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
            >
              View all trainers{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="space-y-3">
            {dashboardData.trainers.slice(0, 3).map((trainer) => (
              <div
                key={trainer._id}
                className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-400/10 p-2 rounded-lg">
                    <FaUserTie className="text-purple-400 text-sm" />
                  </div>
                  <p className="text-white text-sm">{trainer.name}</p>
                </div>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                  {trainer.specialization || "General"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Subscribers */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-white flex items-center gap-2">
              <FaEnvelope className="text-lime-400" />
              New Subscribers
            </h3>
            <Link
              to="/dashboard/subscribers"
              className="text-lime-400 hover:text-lime-300 text-sm flex items-center gap-1"
            >
              View all subscribers{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <h3 className="font-medium text-white flex items-center gap-2 mb-3"></h3>
          <div className="space-y-3">
            {dashboardData.subscribers.slice(0, 3).map((sub) => (
              <div
                key={sub._id}
                className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-lime-400/10 p-2 rounded-lg">
                    <FaEnvelope className="text-lime-400 text-sm" />
                  </div>
                  <p className="text-white text-sm">{sub.email}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
