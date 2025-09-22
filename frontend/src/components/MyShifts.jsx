import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const MyShifts = () => {
  const { user } = useAuth();
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, assigned, confirmed, completed

  useEffect(() => {
    fetchMyShifts();
  }, [filter]);

  const fetchMyShifts = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        if (filter === 'upcoming') {
          params.append('upcoming', 'true');
        } else {
          params.append('status', filter);
        }
      }

      const response = await axiosInstance.get(`/api/shifts/my?${params}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setShifts(response.data);
    } catch (error) {
      console.error('Error fetching shifts:', error);
      alert('Failed to fetch shifts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (shiftId, newStatus) => {
    try {
      await axiosInstance.put(`/api/shifts/${shiftId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert('Shift status updated successfully');
      fetchMyShifts();
    } catch (error) {
      console.error('Error updating shift status:', error);
      alert(error.response?.data?.message || 'Failed to update shift status');
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShiftTypeColor = (type) => {
    switch (type) {
      case 'morning': return 'bg-orange-100 text-orange-800';
      case 'evening': return 'bg-purple-100 text-purple-800';
      case 'night': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusActions = (shiftId, status) => {
    switch (status) {
      case 'assigned':
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleStatusUpdate(shiftId, 'confirmed')}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Confirm
            </button>
            <button
              onClick={() => handleStatusUpdate(shiftId, 'cancelled')}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        );
      case 'confirmed':
        return (
          <button
            onClick={() => handleStatusUpdate(shiftId, 'completed')}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Mark Complete
          </button>
        );
      default:
        return <span className="text-gray-500 text-sm">No actions available</span>;
    }
  };

  if (loading) {
    return <div className="p-6">Loading your shifts...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Shifts</h2>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Shifts</option>
            <option value="upcoming">Upcoming</option>
            <option value="assigned">Assigned</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Shifts List */}
      <div className="space-y-4">
        {shifts.map((shift) => (
          <div key={shift._id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getShiftTypeColor(shift.shiftType)}`}>
                  {shift.shiftType.charAt(0).toUpperCase() + shift.shiftType.slice(1)} Shift
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shift.status)}`}>
                  {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Assigned by: {shift.assignedBy?.name || 'Unknown'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <h4 className="font-medium text-gray-700">Start Time</h4>
                <p className="text-gray-600">{formatDateTime(shift.startTime)}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">End Time</h4>
                <p className="text-gray-600">{formatDateTime(shift.endTime)}</p>
              </div>
            </div>

            {shift.notes && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-700">Notes</h4>
                <p className="text-gray-600">{shift.notes}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Created: {formatDateTime(shift.createdAt)}
              </div>
              <div className="flex gap-2">
                {getStatusActions(shift._id, shift.status)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {shifts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {filter === 'upcoming' 
            ? 'No upcoming shifts found.' 
            : 'No shifts found for the selected filter.'}
        </div>
      )}
    </div>
  );
};

export default MyShifts;
