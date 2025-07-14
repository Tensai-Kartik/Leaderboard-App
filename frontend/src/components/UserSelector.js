import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function UserSelector({ onSelect }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option>Select User</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
