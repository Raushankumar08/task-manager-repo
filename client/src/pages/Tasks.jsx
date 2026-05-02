import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [mode, setMode] = useState("my");

  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ======================
  // LOAD DATA
  // ======================
  const load = async () => {
    try {
      const t = await API.get(`/tasks?mode=${mode}`);
      setTasks(t.data);

      const u = await API.get("/auth/users");
      setUsers(u.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, [mode]);

  // ======================
  // ADD TASK
  // ======================
  const addTask = async () => {
    if (!title) return alert("Enter task title");

    try {
      await API.post("/tasks", {
        title,
        assignedTo,
        priority,
        dueDate,
      });

      setTitle("");
      setAssignedTo("");
      setPriority("low");
      setDueDate("");

      load();
    } catch (err) {
      alert("Error creating task");
    }
  };

  // ======================
  // UPDATE STATUS
  // ======================
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      load();
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // DELETE
  // ======================
  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  // ======================
  // SEARCH FILTER
  // ======================
  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // ======================
  // OVERDUE CHECK
  // ======================
  const isOverdue = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-4">📋 Tasks</h1>

      {/* MODE TOGGLE */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setMode("my")}
          className={`px-4 py-2 rounded ${
            mode === "my" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          My Tasks
        </button>

        {user?.role === "admin" && (
          <button
            onClick={() => setMode("all")}
            className={`px-4 py-2 rounded ${
              mode === "all" ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            All Tasks
          </button>
        )}
      </div>

      {/* CREATE TASK */}
      <div className="bg-gray-800 p-4 rounded mb-6 flex flex-wrap gap-3">

        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 bg-gray-700 rounded w-48"
        />

        {/* ADMIN ONLY */}
        {user?.role === "admin" && (
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="p-2 bg-gray-700 rounded"
          >
            <option value="">Assign User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        )}

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 bg-gray-700 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 bg-gray-700 rounded"
        />

        <button
          onClick={addTask}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 mb-4 w-full bg-gray-700 rounded"
      />

      {/* TASK LIST */}
      <div className="space-y-4">
        {filtered.map((t) => (
          <div
            key={t._id}
            className={`p-4 rounded bg-gray-800 ${
              isOverdue(t.dueDate) ? "border border-red-500" : ""
            }`}
          >
            <h2 className="text-lg font-bold">{t.title}</h2>

            <p className="text-sm text-gray-300">
              Assigned: {t.assignedTo?.name || "Unassigned"}
            </p>

            <p>Status: {t.status}</p>

            <p>Priority: {t.priority}</p>

            {t.dueDate && (
              <p className="text-sm">
                Due: {new Date(t.dueDate).toLocaleDateString()}
              </p>
            )}

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(t._id, "todo")}
                className="bg-gray-600 px-3 py-1 rounded"
              >
                Todo
              </button>

              <button
                onClick={() => updateStatus(t._id, "progress")}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Progress
              </button>

              <button
                onClick={() => updateStatus(t._id, "done")}
                className="bg-green-600 px-3 py-1 rounded"
              >
                Done
              </button>

              {(user.role === "admin" ||
                t.createdBy?._id === user.id) && (
                <button
                  onClick={() => deleteTask(t._id)}
                  className="bg-red-600 px-3 py-1 rounded ml-auto"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}