import axiosInstance from '../axiosConfig';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ADMIN_EMAIL } from '../config/admin';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // hide navbar
  const HIDE_ON = ['/login', '/register'];
  if (HIDE_ON.includes(location.pathname)) return null;

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
    <nav className="h-[70px] flex items-center justify-between px-10"
          style={{
            borderTop: "1px solid #9A8E8E",
            borderBottom: "1px solid #9A8E8E",
            background: "#FFF"
          }}>
      {user ? (
        <>
        {/* link to Leave Tracker */}
        <Link to={user ? "/attendance" : "/"}><img src="/timetrackr11_page.svg" alt="TimeTrackr11 Logo" className="h-12" /></Link>
          <div style={{display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"}}>
              <Link to="/attendance" style={{
                textAlign: "center",
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                fontFamily: "Afacad, sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal"
              }}
              className="px-4 py-1 text-[#2E4A8A] rounded-[9px] hover:bg-[#2E4A8A] hover:text-white mr-2">
                My Attendance
              </Link>
              <Link to="/shifts" style={{
                textAlign: "center",
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                fontFamily: "Afacad, sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal"
              }}
              className="px-4 py-1 text-[#2E4A8A] rounded-[9px] hover:bg-[#2E4A8A] hover:text-white mr-2">
                My Shifts
              </Link>
              <Link to="/applyLeave" style={{
                textAlign: "center",
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                fontFamily: "Afacad, sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal"
              }}
              className="px-4 py-1 text-[#2E4A8A] rounded-[9px] hover:bg-[#2E4A8A] hover:text-white mr-2">
                Leave Application
              </Link>
              <Link to="/leaveTracker" style={{
                textAlign: "center",
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                fontFamily: "Afacad, sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal"
              }}
              className="px-4 py-1 text-[#2E4A8A] rounded-[9px] hover:bg-[#2E4A8A] hover:text-white mr-2">
                Leave Tracker
              </Link>
          </div>

        {/* Admin link visible only for the hard-coded admin email */}
        {user && user.email === ADMIN_EMAIL && (
            <>
            {/* link to attendance summary*/}
            <Link to={user ? "/attendance" : "/"}><img src="/timetrackr11_page.svg" alt="TimeTrackr11 Logo" className="h-12" /></Link>
          <div style={{display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"}}>
              <Link to="/admin/worklist" style={{
                textAlign: "center",
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                fontFamily: "Afacad, sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal"
              }}
              className="px-4 py-1 text-[#2E4A8A] rounded-[9px] hover:bg-[#2E4A8A] hover:text-white mr-2">
                Worklist
              </Link>
              <Link to="/admin/shifts" style={{
                textAlign: "center",
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                fontFamily: "Afacad, sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal"
              }}
              className="px-4 py-1 text-[#2E4A8A] rounded-[9px] hover:bg-[#2E4A8A] hover:text-white mr-2">
                Schedule Shift
              </Link>
              <Link to="/admin/attendance" style={{
                textAlign: "center",
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                fontFamily: "Afacad, sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal"
              }}
              className="px-4 py-1 text-[#2E4A8A] rounded-[9px] hover:bg-[#2E4A8A] hover:text-white mr-2">
                Attendance Summary
              </Link>
              <Link to="/admin/users" style={{
                textAlign: "center",
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                fontFamily: "Afacad, sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal"
              }}
              className="px-4 py-1 text-[#2E4A8A] rounded-[9px] hover:bg-[#2E4A8A] hover:text-white mr-2">
                Employee Summary
              </Link>
          </div>
          </>
        )}
          <button onClick={handleLogout} style={{
            textAlign: "center",
            textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            fontFamily: "Afacad, sans-serif",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal"
          }}
          className="px-4 py-1 text-[#2E4A8A] rounded-[9px] hover:bg-[#2E4A8A] hover:text-white mr-2">
            Logout
          </button>
          <span className="mr-4">Hello, </span>
          <Link to="/profile" className="px-4 py-1 group flex items-center justify-center">
            <img src="/profile.svg" alt="Profile Logo" className="h-12 block group-hover:hidden" />
            <img src="/profile_hover.svg" alt="Hover Profile Logo" className="h-12 hidden group-hover:block" />
          </Link>
        </>
      ) : null}
    </nav>
  );
};

export default Navbar;
