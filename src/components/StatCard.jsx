const StatCard = ({ icon, title, value, description, color }) => {
  const colorClasses = {
    lime: "bg-lime-400/10 text-lime-400",
    blue: "bg-blue-400/10 text-blue-400",
    amber: "bg-amber-400/10 text-amber-400",
    purple: "bg-purple-400/10 text-purple-400",
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
      <div className="flex items-center gap-3">
        <div className={`${colorClasses[color]} p-2 rounded-lg`}>{icon}</div>
        <div>
          <h3 className="text-gray-400 text-xs font-medium">{title}</h3>
          <p className="text-lg font-bold text-white mt-1">{value}</p>
          <p className="text-gray-400 text-xs mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
