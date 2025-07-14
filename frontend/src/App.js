import React, { useState } from "react";
import DeleteButton from "./components/DeleteButton";
import UserSelector from "./components/UserSelector";
import AddUserForm from "./components/AddUserForm";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";
import ResetButton from "./components/ResetButton";
import SeedButton from "./components/SeedButton";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false); // used to refresh dropdown when users are added/reset

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1>🏆 Leaderboard App</h1>

      {/* User Dropdown */}
      <UserSelector key={refresh} onSelect={setSelectedUser} />

      {/* Add User + Seed Users */}
      <AddUserForm onUserAdded={handleRefresh} />
      <SeedButton onSeeded={handleRefresh} />

      {/* Claim Button */}
      {selectedUser && (
        <>
          <br />
          <ClaimButton userId={selectedUser} onClaim={() => {}} />
        </>
      )}

      <br />
      {/* Leaderboard + Reset */}
      <Leaderboard />
      <ResetButton />
      <DeleteButton onDeleted={handleRefresh} />
    </div>
  );
}

export default App;
