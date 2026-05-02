import { useEffect, useState } from "react";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const load = async () => {
    const t = await API.get("/tasks");
    const u = await API.get("/auth/users"); // required

    setTasks(t.data);
    setUsers(u.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addTask = async () => {
    if (!title) return alert("Enter task");

    await API.post("/tasks", {
      title,
      assignedTo,
    });

    setTitle("");
    setAssignedTo("");
    load();
  };

  const total = tasks.length;
  const done = tasks.filter(t => t.status === "done").length;
  const progress = tasks.filter(t => t.status === "progress").length;

  const data = [
    { name: "Done", value: done },
    { name: "Progress", value: progress },
    { name: "Todo", value: total - done - progress },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">🚀 Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-600 p-5 rounded text-white text-center">
          <p>Total Tasks</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-green-600 p-5 rounded text-white text-center">
          <p>Completed</p>
          <h2 className="text-2xl font-bold">{done}</h2>
        </div>

        <div className="bg-yellow-500 p-5 rounded text-white text-center">
          <p>In Progress</p>
          <h2 className="text-2xl font-bold">{progress}</h2>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-white mb-4">📊 Task Analytics</h2>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value">
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ADD TASK */}
      <div className="flex gap-3">
        <input
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white w-full"
        />

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="">Assign user</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          onClick={addTask}
          className="bg-blue-600 px-4 rounded text-white"
        >
          Add
        </button>
      </div>
    </div>
  );
}