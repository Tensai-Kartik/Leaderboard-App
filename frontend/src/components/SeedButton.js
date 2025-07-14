import React from "react";
import { api } from "../api";

export default function SeedButton({ onSeeded }) {
  const handleSeed = async () => {
    try {
      const res = await api.post("/seed");
      alert(res.data.message || "Users seeded!");
      onSeeded(); // refresh dropdown
    } catch (err) {
      alert("Failed to seed users.");
    }
  };

  return (
    <button style={{ marginTop: "10px" }} onClick={handleSeed}>
      🧪 Seed Demo Users
    </button>
  );
}
