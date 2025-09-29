import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

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
        padding: "20px 20px 20px 20px"
      }}
      className="flex items-center justify-center"
    >
        {/* header */}
        <div
            style={{
            width: "100%",
            height: "60px",
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

        </div>

        {/* record */}
        <div
            style={{
            width: "100%",
            height: "60px",
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

        </div>
    </main>
)