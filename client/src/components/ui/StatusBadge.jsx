export default function StatusBadge({ status }) {
  const styles = {
    online: "bg-green-100 text-green-700",
    offline: "bg-gray-200 text-gray-600",
    warning: "bg-yellow-100 text-yellow-700",
    critical: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || styles.info}`}>
      {status}
    </span>
  );
}