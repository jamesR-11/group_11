import axiosInstance from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ADMIN_EMAIL } from '../config/admin';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (user?.token) {
        await axiosInstance.post('/api/auth/logout', {}, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
    } catch (e) {
      // ignore
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to={user ? "/attendance" : "/"} className="text-2xl font-bold">Attendance Tracking System</Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <Link to="/attendance" className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-700 mr-2">
              My Attendance
            </Link>

            {/* Admin link visible only for the hard-coded admin email */}
            {user && user.email === ADMIN_EMAIL && (
  <>
    <Link to="/admin/attendance" className="bg-indigo-500 px-3 py-2 rounded mr-2 hover:bg-indigo-600">
       Attendance Record
    </Link>
    <Link to="/admin/users" className="bg-teal-500 px-3 py-2 rounded mr-2 hover:bg-teal-600">
      Manage Users
    </Link>
  </>
)}
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
              Logout
            </button>
          </>
        ) : (
          <>
           
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
