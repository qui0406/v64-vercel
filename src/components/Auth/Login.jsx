import React, { useState, useContext } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { authApis, endpoints } from "./../../configs/APIs";
import Apis from "./../../configs/APIs";
import cookie from "react-cookies";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {MyDispatchContext } from "./../../configs/MyContexts";

export default function LoginForm() {
  const dispatch = useContext(MyDispatchContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [q] = useSearchParams();
  const setState = (value, field) => {
        setUser({ ...user, [field]: value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      let res = await Apis.post(endpoints['login'], { ...user });
      console.log("Login response:", res.data.result.token);
      cookie.save('token', res.data.result.token);
      let userInfo = await authApis().get(endpoints['my-profile']);
      dispatch({
          "type": "login",
          "payload": userInfo.data
      });
      let next = q.get('next');
      nav(next ? next : '/');
    } catch (e) {
        alert("Đăng nhập thất bại!");
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef3c7 0%, #ffffff 50%, #fed7aa 100%)',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ maxWidth: '700px', width: '100%' }}>
        

        {/* Login Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden'
        }}>
          {/* Title */}
          <div style={{
            background: 'linear-gradient(to right, #f59e0b, #f97316)',
            padding: '25px',
            textAlign: 'center'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              margin: 0
            }}>
              Đăng nhập
            </h2>
          </div>

          {/* Form */}
          <div style={{ padding: '40px' }}>
            {/* Email or Phone Input */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontSize: '0.95rem'
              }}>
                Số điện thoại hoặc Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} size={20} />
                <input
                  type="text"
                  name="identifier"
                  value={user.identifier}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại hoặc email"
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 45px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f59e0b';
                    e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontSize: '0.95rem'
              }}>
                Mật khẩu
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} size={20} />
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 45px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f59e0b';
                    e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(to right, #f59e0b, #f97316)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '20px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 25px rgba(245, 158, 11, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(245, 158, 11, 0.3)';
              }}
            >
              <LogIn size={20} />
              Đăng nhập
            </button>

            {/* Links */}
            <div style={{
              textAlign: 'center',
              marginBottom: '25px'
            }}>
              <a
                href="#"
                style={{
                  color: '#d97706',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Quên mật khẩu?
              </a>
              <span style={{ margin: '0 10px', color: '#9ca3af' }}>hoặc</span>
              <a
                href="/account/register"
                style={{
                  color: '#d97706',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Đăng ký
              </a>
            </div>

            {/* Social Login Buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px'
            }}>
              <button
                style={{
                  padding: '14px',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 10px rgba(220, 38, 38, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#b91c1c';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
                }}
                onClick={() => window.location.href = "http://localhost:8088/api/v1/oauth2/authorization/google"}
                onMouseLeave={(e) => {
                  e.target.style.background = '#dc2626';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 10px rgba(220, 38, 38, 0.2)';
                }}
              >
                <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>G+</span>
                Đăng nhập Google
              </button>

              <button
                style={{
                  padding: '14px',
                  background: '#1877f2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 10px rgba(24, 119, 242, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#1565c0';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(24, 119, 242, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#1877f2';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 10px rgba(24, 119, 242, 0.2)';
                }}
              >
                <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>f</span>
                Đăng nhập Facebook
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
        }}>
          <p style={{
            fontSize: '0.9rem',
            color: '#6b7280',
            margin: 0,
            fontWeight: '500'
          }}>
            Hãy là người đầu tiên nhận khuyến mãi lớn! 🎁
          </p>
        </div>
      </div>
    </div>
  );
}