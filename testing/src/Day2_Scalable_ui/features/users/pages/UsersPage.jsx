import { useState } from "react";
import { getUsers, getUserById } from "../services/user.service";
import UserList from "../components/UserList";
import UserDetails from "../components/UserDetails";

function UsersPage() {
  const users = getUsers();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const selectedUser = getUserById(selectedUserId);

  return (
    <div>
      <h2>User Management</h2>

      <UserList
        users={users}
        selectedUserId={selectedUserId}
        onSelectUser={setSelectedUserId}
      />

      <UserDetails user={selectedUser} />
    </div>
  );
}

export default UsersPage;
