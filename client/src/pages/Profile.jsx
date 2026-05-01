export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-6">👤 Profile</h1>

      <div className="bg-gray-800 p-6 rounded-xl w-96 shadow">

        <p className="mb-2">
          <strong>Name:</strong> {user?.name}
        </p>

        <p className="mb-2">
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          <span className="text-blue-400 uppercase">
            {user?.role}
          </span>
        </p>

      </div>
    </div>
  );
}