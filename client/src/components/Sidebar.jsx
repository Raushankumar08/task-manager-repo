import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const nav = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-5 fixed left-0 top-0">

      <div>
        <h2 className="text-xl font-bold mb-8">🚀 Task Manager</h2>

        <nav className="flex flex-col gap-2">
          <button
            onClick={() => nav("/dashboard")}
            className={`text-left px-3 py-2 rounded ${isActive("/dashboard")}`}
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => nav("/tasks")}
            className={`text-left px-3 py-2 rounded ${isActive("/tasks")}`}
          >
            📋 Tasks
          </button>

          <button
            onClick={() => nav("/profile")}
            className={`text-left px-3 py-2 rounded ${isActive("/profile")}`}
          >
            👤 Profile
          </button>
        </nav>
      </div>

      <div>
        <div className="mb-4 border-t border-gray-700 pt-3">
          <p className="text-sm">{user?.name}</p>
          <p className="text-xs text-blue-400 uppercase">
            {user?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}