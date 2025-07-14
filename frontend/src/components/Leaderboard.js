import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Leaderboard() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      api.get("/leaderboard").then((res) => setBoard(res.data));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Leaderboard 🥇</h2>
      <ul>
        {board.map((u) => (
          <li key={u.name}>
            {u.rank}. {u.name} - {u.totalPoints} pts
          </li>
        ))}
      </ul>
    </div>
  );
}
