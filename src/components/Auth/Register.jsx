import React, { useState } from 'react';
import { Mail, Phone, Lock, User, Calendar } from 'lucide-react';
import { authApis, endpoints } from "./../../configs/APIs";
import Apis from "./../../configs/APIs";
import MySpinner from "./../Ui/MySpinner";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    dob: '',
    sex: true,
    phoneNumber: '',
    password: '',
    verifyEmail: false
  });

  const [activeTab, setActiveTab] = useState('email');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let response = await Apis.post(endpoints['register'], formData);
      if (response.status === 201) {
        alert("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Đăng ký không thành công. Vui lòng thử lại.");
    }
    setLoading(false);
    
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? checked
        : name === 'sex' 
          ? value === 'true'
          : value
    }));
  };


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef3c7 0%, #ffffff 50%, #fed7aa 100%)',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        
          <h1 style={{
            color: '#6b7280',
            marginTop: '15px'
          }}>
            Tạo tài khoản mới
          </h1>
        </div>


        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden'
        }}>
          {/* Tabs */}
          <div style={{
            background: 'linear-gradient(to right, #f59e0b, #f97316)',
            padding: '4px',
            display: 'flex',
            gap: '4px'
          }}>
            <button
              onClick={() => setActiveTab('email')}
              style={{
                flex: 1,
                padding: '18px 20px',
                border: 'none',
                background: activeTab === 'email' ? 'white' : 'transparent',
                color: activeTab === 'email' ? '#d97706' : 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: activeTab === 'email' ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <Mail size={20} />
              Đăng ký bằng email
            </button>
            <button
              onClick={() => setActiveTab('phone')}
              style={{
                flex: 1,
                padding: '18px 20px',
                border: 'none',
                background: activeTab === 'phone' ? 'white' : 'transparent',
                color: activeTab === 'phone' ? '#d97706' : 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: activeTab === 'phone' ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <Phone size={20} />
              Đăng ký bằng SĐT
            </button>
          </div>

          {/* Form */}
          <div style={{ padding: '40px' }}>
            <div style={{ marginBottom: '25px' }}>
              {/* Name Fields */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '25px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px',
                    fontSize: '0.95rem'
                  }}>
                    Họ <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af'
                    }} size={20} />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Nhập họ"
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
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px',
                    fontSize: '0.95rem'
                  }}>
                    Tên <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af'
                    }} size={20} />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Nhập tên"
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
              </div>

              {/* Email */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                  fontSize: '0.95rem'
                }}>
                  Email <span style={{ color: '#ef4444' }}>*</span>
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
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
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

              {/* Birth Date */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                  fontSize: '0.95rem'
                }}>
                  Ngày sinh <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Calendar style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} size={20} />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
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

              {/* Gender */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '12px',
                  fontSize: '0.95rem'
                }}>
                  Giới tính <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '30px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    <input
                      type="radio"
                      name="sex"
                      value={false}
                      checked={formData.sex === false}
                      onChange={handleChange}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '10px',
                        cursor: 'pointer',
                        accentColor: '#f59e0b'
                      }}
                    />
                    Nữ
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    <input
                      type="radio"
                      name="sex"
                      value={true}
                      checked={formData.sex === true}
                      onChange={handleChange}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '10px',
                        cursor: 'pointer',
                        accentColor: '#f59e0b'
                      }}
                    />
                    Nam
                  </label>
                </div>
              </div>

              {/* Phone */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                  fontSize: '0.95rem'
                }}>
                  Số điện thoại <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} size={20} />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="0123456789"
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

              {/* Password */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px',
                  fontSize: '0.95rem'
                }}>
                  Mật khẩu <span style={{ color: '#ef4444' }}>*</span>
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
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
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

              {/* Checkbox */}
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px' }}>
                <input
                  type="checkbox"
                  name="verifyEmail"
                  checked={formData.verifyEmail || false}
                  onChange={handleChange}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '12px',
                    marginTop: '2px',
                    cursor: 'pointer',
                    accentColor: '#f59e0b'
                  }}
                />
                <label style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  Tôi đồng ý nhận email từ V-SIXTYFOUR về các chương trình khuyến mãi và tin tức mới nhất
                </label>
              </div>

              {/* Submit Button */}
              {loading ? <MySpinner /> : <button
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
                  transition: 'all 0.3s ease'
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
                Đăng ký
              </button>}

              {/* Back Link */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <a
                  href="#"
                  style={{
                    color: '#d97706',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  ← Quay về
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}