import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! You have full access.</p>

            <div style={{ marginTop: "20px" }}>
                <h3>Admin Actions</h3>
                <ul>
                    <li>Manage Users</li>
                    <li>View System Logs</li>
                    <li>Configure Settings</li>
                </ul>
            </div>

            <br />
            <Link to="/dashboard">Back to User Dashboard</Link>
        </div>
    );
};

export default Admin;
