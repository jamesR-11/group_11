import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || 'Registration failed. Please try again.';
      setError(msg);
    }
  };
return (
  <main className="min-h-screen bg-white flex">
    {/* left */}
    <div className="w-[668px] h-screen flex items-center justify-center"
        style={{
      background: "url('/background.png') center/cover no-repeat"
    }}>
      <img src="/timetrackr11_page.svg" alt="TimeTrackr11 Logo" className="h-20" />
    </div>

    {/* right */}
    <div className="w-[772px] h-screen flex flex-col p-12">
      <div className="flex justify-end mb-8">
        <p className="text-black">
          Have a TimeTrackr11 account?{" "}
          <Link to="/login" className="text-red-600 font-bold">
            SIGN IN
          </Link>
        </p>
      </div>

      <div className="flex-1 flex items-start">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <label>
            <span className="block mb-1 font-medium">First Name <span className="text-red-600">*</span></span>
            <input
              type="text"
              value={formData.firstName || ""}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-[458px] h-[60px] rounded-[9px] border border-[#2E4A8A] bg-[#D9D9D9] px-4"
              required
            />
          </label>

          <label>
            <span className="block mb-1 font-medium">Last Name <span className="text-red-600">*</span></span>
            <input
              type="text"
              value={formData.lastName || ""}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-[458px] h-[60px] rounded-[9px] border border-[#2E4A8A] bg-[#D9D9D9] px-4"
              required
            />
          </label>

          <label>
            <span className="block mb-1 font-medium">Email Address <span className="text-red-600">*</span></span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-[458px] h-[60px] rounded-[9px] border border-[#2E4A8A] bg-[#D9D9D9] px-4"
              required
            />
          </label>

          <label>
            <span className="block mb-1 font-medium">Password <span className="text-red-600">*</span></span>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-[458px] h-[60px] rounded-[9px] border border-[#2E4A8A] bg-[#D9D9D9] px-4"
              required
            />
          </label>

          <button
            type="submit"
            className="mt-4 w-[458px] h-[48px] rounded-[9px] bg-[#FF1A1A] text-white font-bold hover:bg-red-700 transition"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  </main>
);


  // return (
  //   <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
  //     <form
  //       onSubmit={handleSubmit}
  //       className="w-full max-w-lg bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-8"
  //     >
  //       <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

  //       {error && (
  //         <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
  //           {error}
  //         </div>
  //       )}

  //       <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
  //       <input
  //         type="text"
  //         placeholder="Your name"
  //         value={formData.name}
  //         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  //         className="w-full h-12 mb-4 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
  //         required
  //       />

  //       <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
  //       <input
  //         type="email"
  //         placeholder="you@example.com"
  //         value={formData.email}
  //         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  //         className="w-full h-12 mb-4 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
  //         required
  //       />

  //       <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
  //       <input
  //         type="password"
  //         placeholder="Create a password"
  //         value={formData.password}
  //         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
  //         className="w-full h-12 mb-6 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
  //         required
  //       />

  //       <button
  //         type="submit"
  //         className="w-full h-12 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-700 active:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition"
  //       >
  //         Register
  //       </button>

  //       <p className="text-center text-xl text-gray-600 mt-4">
  //         Already have an account?{' '}
  //         <Link to="/login" className="text-emerald-600 hover:underline">
  //           Login
  //         </Link>
  //       </p>
  //     </form>
  //   </div>
  // );
};

export default Register;
