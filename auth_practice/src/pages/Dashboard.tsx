import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout()
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {user?.name}</h2>
      <Link to='/'>Back to Home</Link>
      <button onClick={handleLogout} >Logout</button>
    </div>

  )
}

export default Dashboard