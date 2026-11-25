const statusStyles = {
  Normal: "bg-green-100 text-green-700",
  Warning: "bg-yellow-100 text-yellow-700",
  Critical: "bg-red-100 text-red-700",
};

function LiveReadingCard({ sensor, value, status, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white rounded-xl shadow p-4 border-2 transition ${
        isSelected ? "border-blue-500" : "border-transparent hover:border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{sensor.name}</p>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-800">
        {value}
        <span className="text-base font-normal text-gray-500 ml-1">{sensor.unit}</span>
      </p>
    </button>
  );
}

export default LiveReadingCard;