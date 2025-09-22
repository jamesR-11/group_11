import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import AttendanceLog from './components/AttendanceLog';
import AdminAttendance from './components/AdminAttendance';
import AdminUsers from './components/AdminUsers';
import ShiftManagement from './components/ShiftManagement';
import MyShifts from './components/MyShifts';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/attendance" element={<AttendanceLog />} />
        <Route path="/shifts" element={<MyShifts />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/shifts" element={<ShiftManagement />} />
      </Routes>
    </>
  );
}

export default App;
