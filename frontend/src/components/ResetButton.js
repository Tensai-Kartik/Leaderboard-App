import React from "react";
import { api } from "../api";

export default function ResetButton() {
  const handleReset = async () => {
    const confirmed = window.confirm("Reset all points to 0?");
    if (!confirmed) return;

    try {
      await api.post("/reset");
      alert("Leaderboard has been reset.");
    } catch (err) {
      alert("Failed to reset leaderboard.");
    }
  };

  return (
    <button style={{ marginTop: "20px", background: "#eee" }} onClick={handleReset}>
      🔁 Reset Leaderboard
    </button>
  );
}
