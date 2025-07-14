import React from "react";
import { api } from "../api";

export default function ClaimButton({ userId, onClaim }) {
  const handleClick = async () => {
    const res = await api.post("/claim", { userId });
    alert(`🎉 You earned ${res.data.points} points!`);
    onClaim(res.data);
  };

  return <button onClick={handleClick}>Claim Points</button>;
}
