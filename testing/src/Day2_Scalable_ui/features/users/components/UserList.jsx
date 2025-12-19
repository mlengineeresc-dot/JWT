import UserCard from "./UserCard";

function UserList({ users, selectedUserId, onSelectUser }) {
  return (
    <>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={user.id === selectedUserId}
          onSelect={onSelectUser}
        />
      ))}
    </>
  );
}

export default UserList;
