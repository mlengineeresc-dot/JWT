import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>My Profile</h1>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <br />
            <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
};

export default Profile;
