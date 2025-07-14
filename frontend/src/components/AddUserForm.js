import React, { useState } from "react";
import { api } from "../api";

export default function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await api.post("/add", { name });
      alert(`✅ User "${res.data.name}" added!`);
      setName("");
      onUserAdded(); // to refresh user dropdown
    } catch (err) {
      alert("Something went wrong while adding user.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        required
      />
      <button type="submit" style={{ marginLeft: "10px" }}>
        Add User
      </button>
    </form>
  );
}
