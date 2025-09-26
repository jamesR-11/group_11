import { useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const { user } = useAuth(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          university: response.data.university || '',
          address: response.data.address || '',
        });
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }
  
 return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "50px 20px 20px 20px"
      }}
      className="flex items-center justify-center"
    >
      <div
        style={{
          width: "900px",
          height: "650px",
          borderRadius: "9px",
          background: "#FFF",
          boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25)",
        }}
        className="overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-6 pb-3">
          <h1 style={{
                color: "#000",
                fontFamily: "Afacad, sans-serif",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "bold",
                lineHeight: "normal",
              }}>Employee Profile</h1>
          <div className="mt-3 h-[2px] w-full"
          style={{
            background: "#2E4A8A",
            boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 0.25)"
          }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pt-4 pb-6">
          <div className="grid grid-cols-[120px_auto] items-center gap-4 mb-10">
            {/* Employee ID (display only) */}
            <label style={{
                    color: "#9A8E8E",
                    fontFamily: "Afacad, sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    lineHeight: "normal",
                  }}
                  className="text-right">Employee ID</label>
            <input
              type="text"
              value={formData.employeeId}
              readOnly
              style={{
                  width: "350px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "9px",
                  border: "1px solid #9A8E8E",
                  background: "#D9D9D9",
                  padding: "12px",
                  fontSize: "16px",
                }}
            />

            {/* Last Name */}
            <label style={{
                    color: "#9A8E8E",
                    fontFamily: "Afacad, sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    lineHeight: "normal",
                  }}
                  className="text-right">Last Name</label>
            <input
              type="text"
              value={formData.lastName || ""}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              style={{
                  width: "350px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "9px",
                  border: "1px solid #9A8E8E",
                  background: "rgba(217, 217, 217, 0.00)",
                  padding: "12px",
                  fontSize: "16px",
                }}
              required
            />

            {/* First Name */}
            <label style={{
                    color: "#9A8E8E",
                    fontFamily: "Afacad, sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    lineHeight: "normal",
                  }}
                  className="text-right">First Name</label>
            <input
              type="text"
              value={formData.firstName || ""}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              style={{
                  width: "350px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "9px",
                  border: "1px solid #9A8E8E",
                  background: "rgba(217, 217, 217, 0.00)",
                  padding: "12px",
                  fontSize: "16px",
                }}
              required
            />

            {/* Password */}
            <label style={{
                    color: "#9A8E8E",
                    fontFamily: "Afacad, sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    lineHeight: "normal",
                  }}
                  className="text-right">Password</label>
            <input
              type="password"
              value={formData.password || ""}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                  width: "350px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "9px",
                  border: "1px solid #9A8E8E",
                  background: "rgba(217, 217, 217, 0.00)",
                  padding: "12px",
                  fontSize: "16px",
                }}
              required
            />
          </div>
          <div className="grid grid-cols-[300px_auto] items-center gap-4 mb-4">
            {/* Employment Effective From Date */}
            <label style={{
                    color: "#9A8E8E",
                    fontFamily: "Afacad, sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    lineHeight: "normal",
                  }}
                  className="text-right">Employment Effective From Date</label>
            <div className="relative w-[400px]">
              <input
                type="date"
                value={formData.startDate || ""}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                style={{
                  width: "450px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "9px",
                  border: "1px solid #9A8E8E",
                  background: "rgba(217, 217, 217, 0.00)",
                  padding: "12px",
                  fontSize: "16px",
                }}
                required
              />
              {/* <span className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">
                <img src="/calendar.svg" alt="calendar" className="h-10"
                onClick={() => document.querySelector("input[type=date]").showPicker?.()}/>
              </span> */}
            </div>

            {/* To Date */}
            <label style={{
                    color: "#9A8E8E",
                    fontFamily: "Afacad, sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    lineHeight: "normal",
                  }}
                  className="text-right">To Date</label>
            <input
              type="text"
              value={formData.endDate || ""}
              onChange={(e) => setFormData({ ...formData, endtDate: e.target.value })}
              readOnly
              style={{
                  width: "450px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "9px",
                  border: "1px solid #9A8E8E",
                  background: "#D9D9D9",
                  padding: "12px",
                  fontSize: "16px",
                }}
            />
            {/* Email */}
            <label style={{
                    color: "#9A8E8E",
                    fontFamily: "Afacad, sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    lineHeight: "normal",
                  }}
                  className="text-right">Email Address</label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                  width: "450px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "9px",
                  border: "1px solid #9A8E8E",
                  background: "rgba(217, 217, 217, 0.00)",
                  padding: "12px",
                  fontSize: "16px",
                }}
              required
            />

            {/* Phone Number */}
            <label style={{
                    color: "#9A8E8E",
                    fontFamily: "Afacad, sans-serif",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    lineHeight: "normal",
                  }}
                  className="text-right">Phone Number</label>
            <input
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                  width: "450px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "9px",
                  border: "1px solid #9A8E8E",
                  background: "rgba(217, 217, 217, 0.00)",
                  padding: "12px",
                  fontSize: "16px",
                }}
            />
          </div>
        </form>
      </div>

      {/* Bottom*/}
      <div
        style={{
          width: "100%",
          height: "70px",
          flexShrink: 0,
          borderRadius: "0 0 9px 9px",
          background: "#FFF",
          boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 40px",
          margin: "0 auto"
        }}
      >
        <button
          type="submit"
          style={{
            padding: "6px 24px",
            borderRadius: "9px",
            background: "#08F",
            color: "#FFF",
            fontSize: "18px",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            marginRight: "16px"
          }}
        >
          Update
        </button>
        <button
          type="button"
          style={{
            padding: "6px 24px",
            borderRadius: "9px",
            border: "1px solid #000",
            background: "#FFF",
            color: "#000",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    </main>
  );
};

export default Profile;
