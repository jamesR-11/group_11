import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.email.trim(), formData.password);
      navigate('/attendance');
    } catch (err) {
      const msg =
        err?.message || err?.response?.data?.message || 'Login failed. Please try again.';
      setError(msg);
    }
  };

return (
    <main style={{
            minHeight: "100vh",
            width: "100%",
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="min-h-screen flex items-center justify-center bg-slate-900">
      <div style={{
            width: "974px",
            height: "593px",
            flexShrink: 0,
            borderRadius: "9px",
            background: "#FFF",
            boxShadow:
              "0 -5px 10px 3px rgba(154, 154, 154, 0.25), 0 5px 10px 3px rgba(154, 154, 154, 0.25), -5px 0 10px 3px rgba(154, 154, 154, 0.25), 5px 0 10px 3px rgba(154, 154, 154, 0.25)"
          }}
          className="grid grid-cols-[564px_410px] overflow-hidden"
        >
          {/* Left */}
          <section className="p-10">
            <h1 style ={{
                color: "#000",
                fontFamily: "Afacad, sans-serif",
                fontSize: "40px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal"
              }}>Sign in</h1>
            <p className="text-[32px] font-normal text-black font-[Afacad]">to access Dashboard</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-red-700">
                  {error}
                </div>
              )}

              <label className="block">
                <span style={{
                      color: "#000",
                      fontFamily: "Afacad, sans-serif",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal"
                    }}>Email Address</span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="e.g. abc@example.com"
                  style={{
                    width: "458px",
                    height: "60px",
                    flexShrink: 0,
                    borderRadius: "9px",
                    border: "1px solid #2E4A8A",
                    background: "#D9D9D9",
                    paddingLeft: "16px",
                    fontSize: "16px"
                  }}
                />
              </label>

              <label className="block">
                <span style={{
                      color: "#000",
                      fontFamily: "Afacad, sans-serif",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal"
                    }}>Password</span>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  style={{
                    width: "458px",
                    height: "60px",
                    flexShrink: 0,
                    borderRadius: "9px",
                    border: "1px solid #2E4A8A",
                    background: "#D9D9D9",
                    paddingLeft: "16px",
                    fontSize: "16px"
                  }}
                />
              </label>

              <button
                type="submit"
                style={{
                      width: "458px",
                      height: "60px",
                      flexshrink: 0,
                      borderRadius: "9px",
                      background: "#08F",
                      color: "#FFF",
                      fontFamily: "Afacad, sans-serif",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal"
                    }}
              >
                SIGN IN
              </button>

              <p style = {{
                color: "#9A8E8E",
                fontFamily: "Afacad, sans-serif",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal"}}>Don’t have an account?{" "}
                <Link to="/register" style = {{
                                      color: "#08F",
                                      fontFamily: "Afacad, sans-serif",
                                      fontSize: "24px",
                                      fontStyle: "normal",
                                      fontWeight: 700,
                                      lineHeight: "normal"}}>Sign up now
                </Link>
              </p>
            </form>
          </section>

          {/* Right */}
          <aside className="p-10 border-2 border-slate-200 flex flex-col items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/timetrackr11_main.svg" alt="TimeTrackr11" className="h-30" />
            </div>

            <div
              className="w-[356px] h-[280px] flex-shrink-0 rounded-[10px] border-2 border-black"
              style={{
                aspectRatio: "89 / 70",
                background: "rgba(116, 151, 175, 0.46)"
              }}
            >
              <ul className="grid grid-cols-2 gap-6 h-full items-center justify-items-center">
                <li><img src="/fingerprint.svg" className="h-20 w-20" /></li>
                <li><img src="/clock.svg" className="h-20 w-20" /></li>
                <li><img src="/face.svg" className="h-20 w-20" /></li>
                <li><img src="/trend.svg" className="h-20 w-20" /></li>
              </ul>
            </div>
          </aside>
        </div>
    </main>
  );
};

export default Login;
