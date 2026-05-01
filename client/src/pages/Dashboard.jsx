import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [search, setSearch] = useState("");

  // =========================
  // LOAD DATA
  // =========================
  const load = async () => {
    try {
      const t = await API.get("/tasks");
      const u = await API.get("/auth/users");

      setTasks(t.data);
      setUsers(u.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // =========================
  // CREATE TASK
  // =========================
  const createTask = async () => {
    if (!title) return alert("Enter task");

    try {
      await API.post("/tasks", {
        title,
        assignedTo,
      });

      setTitle("");
      setAssignedTo("");
      load();
    } catch (err) {
      alert("Create failed");
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    load();
  };

  // =========================
  // FILTERED TASKS
  // =========================
  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // STATS
  // =========================
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const pending = tasks.filter((t) => t.status !== "done").length;

  return (
    <div className="p-6 text-white w-full">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="flex gap-4 mb-6">
        <div className="bg-gray-800 px-4 py-2 rounded">Total: {total}</div>
        <div className="bg-green-600 px-4 py-2 rounded">Done: {done}</div>
        <div className="bg-yellow-500 px-4 py-2 rounded text-black">
          Pending: {pending}
        </div>
      </div>

      {/* ================= CREATE ================= */}
      <div className="flex gap-3 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded focus:outline-none"
        >
          <option className="bg-gray-900 text-white" value="">
            Assign user
          </option>

          {users.map((u) => (
            <option
              key={u._id}
              value={u._id}
              className="bg-gray-900 text-white"
            >
              {u.name}
            </option>
          ))}
        </select>

        <button
          onClick={createTask}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded"
      />

      {/* ================= TASK LIST ================= */}
      <div className="space-y-4">
        {filtered.map((t) => {
          const isOverdue =
            t.dueDate &&
            new Date(t.dueDate) < new Date() &&
            t.status !== "done";

          return (
            <div
              key={t._id}
              className={`p-4 rounded ${
                isOverdue ? "bg-red-600" : "bg-gray-800"
              }`}
            >
              <h2 className="text-lg font-semibold">{t.title}</h2>

              <p className="text-sm">
                Assigned: {t.assignedTo?.name || "None"}
              </p>

              <p className="text-sm">Status: {t.status}</p>

              {/* ACTION BUTTONS */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => updateStatus(t._id, "todo")}
                  className="bg-gray-600 px-3 py-1 rounded"
                >
                  Todo
                </button>

                <button
                  onClick={() => updateStatus(t._id, "progress")}
                  className="bg-yellow-500 px-3 py-1 rounded text-black"
                >
                  Progress
                </button>

                <button
                  onClick={() => updateStatus(t._id, "done")}
                  className="bg-green-600 px-3 py-1 rounded"
                >
                  Done
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}