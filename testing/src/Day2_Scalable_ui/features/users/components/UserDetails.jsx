function UserDetails({ user }) {
  if (!user) {
    return <p>Select a user to see details</p>;
  }

  return (
    <div style={{ marginTop: "16px" }}>
      <h3>User Details</h3>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}

export default UserDetails;
