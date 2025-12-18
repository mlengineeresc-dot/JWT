function UserCard({ user, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(user.id)}
      style={{
        border: isSelected ? "2px solid blue" : "1px solid gray",
        padding: "8px",
        marginBottom: "6px",
        cursor: "pointer",
      }}
    >
      <p>
        <strong>{user.name}</strong>
      </p>
      <p>{user.role}</p>
    </div>
  );
}

export default UserCard;
    