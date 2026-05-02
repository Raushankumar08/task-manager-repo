import { useState, useEffect } from "react";
import API from "../services/api";

export default function Profile() {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) {
      setUser(u);
      setName(u.name);
    }
  }, []);

  const update = async () => {
    try {
      const res = await API.put("/auth/update", { name });
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      alert("Updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>

      <div className="bg-gray-800 p-6 rounded-xl w-[400px] shadow-lg">
        <label className="block mb-2 text-gray-400">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />

        <p className="mb-2 text-gray-400">
          Email: <span className="text-white">{user.email}</span>
        </p>

        <p className="mb-4 text-gray-400">
          Role: <span className="text-blue-400">{user.role}</span>
        </p>

        <button
          onClick={update}
          className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}