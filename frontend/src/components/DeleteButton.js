import React from "react";
import { api } from "../api";

export default function DeleteButton({ onDeleted }) {
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete ALL users?");
    if (!confirmed) return;

    try {
      await api.delete("/deleteAll");
      alert("All users deleted.");
      onDeleted(); // refresh dropdown
    } catch (err) {
      alert("Failed to delete users.");
    }
  };

  return (
    <button style={{ marginTop: "10px", background: "#ffdddd" }} onClick={handleDelete}>
      🗑️ Delete All Users
    </button>
  );
}
