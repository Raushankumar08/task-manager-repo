import { useEffect, useState } from "react";
import API from "../services/api";

export default function TaskModal({ open, onClose, onCreated, projects }) {
  const [form, setForm] = useState({
    title: "",
    projectId: "",
    assignedTo: "",
    dueDate: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (open) fetchUsers();
  }, [open]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch {
      console.log("Only admin can fetch users");
    }
  };

  const createTask = async () => {
    if (!form.title || !form.projectId) return;

    await API.post("/tasks", form);
    onCreated();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-xl w-96">

        <h2 className="text-lg font-bold mb-4">Create Task</h2>

        <input
          placeholder="Task title"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* PROJECT SELECT */}
        <select
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        >
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>

        {/* ASSIGN USER */}
        <select
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        >
          <option value="">Assign User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.role})
            </option>
          ))}
        </select>

        {/* DUE DATE */}
        <input
          type="date"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-400 rounded">
            Cancel
          </button>
          <button onClick={createTask} className="px-3 py-1 bg-blue-500 text-white rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}