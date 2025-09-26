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
    <nav className="h-[104px] flex items-center justify-between px-10"
          style={{
            borderTop: "1px solid #9A8E8E",
            borderBottom: "1px solid #9A8E8E",
            background: "#FFF",
          }}>
      <Link to={user ? "/attendance" : "/"}><img src="/timetrackr11_page.svg" alt="TimeTrackr11 Logo" className="h-25 w-25" /></Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <Link to="/applyLeave" className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-700 mr-2">
              Leave Application
            </Link>
            <Link to="/attendance" className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-700 mr-2">
              My Attendance
            </Link>
            <Link to="/shifts" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 mr-2">
              My Shifts
            </Link>
            <Link to="/leaveTracker" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 mr-2">
              Leave Tracker
            </Link>

            {/* Admin link visible only for the hard-coded admin email */}
            {user && user.email === ADMIN_EMAIL && (
              <>
                <Link to="/admin/worklist" className="bg-indigo-500 px-3 py-2 rounded mr-2 hover:bg-indigo-600">
                  Worklist
                </Link>
                <Link to="/admin/shifts" className="bg-orange-500 px-3 py-2 rounded mr-2 hover:bg-orange-600">
                  Schedule Shift
                </Link>
                <Link to="/admin/attendance" className="bg-indigo-500 px-3 py-2 rounded mr-2 hover:bg-indigo-600">
                  Attendance Summary
                </Link>
                <Link to="/admin/users" className="bg-teal-500 px-3 py-2 rounded mr-2 hover:bg-teal-600">
                  Employee Summary
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
