// src/components/Auth/OAuth2Redirect.jsx
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import "./../../styles/OAuth2Redirect.css";
import cookie from "react-cookies";

const OAuth2Redirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const role = searchParams.get('role');

        if (token && role) {
            document.cookie = `accessToken=${token}; path=/; max-age=86400; Secure; SameSite=Strict`;
            
            cookie.save('token', token);

            login(token, role);

            navigate('/', { replace: true });
        } else {
            // Handle error case
            navigate('/login?error=oauth_failed', { replace: true });
        }
    }, [searchParams, navigate, login]); // Thêm login vào dependency array

    return (
        <div className="oauth2-redirect-container">
            <div className="oauth2-redirect-content">
                <div className="oauth2-spinner"></div>
                <p className="oauth2-loading-text">Đang xử lý đăng nhập...</p>
            </div>
        </div>
    );
};

export default OAuth2Redirect;