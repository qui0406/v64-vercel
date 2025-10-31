import "./../../styles/Profile.css";
import { MyUserContext, MyDispatchContext } from "../../configs/MyContexts";
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { authApis, endpoints } from "./../../configs/APIs";
import Apis from "./../../configs/APIs";

const ProfileSection = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const nav = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const loadProfile = async () => {
    try {
      const response = await authApis().get(endpoints['my-profile']);
      setProfile(response.data.result);
      console.log(response.data.result);
    } catch (error) {
        setMsg("Không thể tải thông tin cá nhân.");
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
      loadProfile();

  }, []);

  const logout = () => {
    dispatch({ type: "logout" });
    nav("/login");
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="user-info">
          <div className="avatar">QT</div>
          <div>
            <p className="user-name">{profile?.lastName} {profile?.firstName}</p>
            <p className="user-email">{profile?.email}</p>
          </div>
        </div>
        <div className="menu">
          <a href="#" className="menu-item">Đăng tin</a>
          <a href="#" className="menu-item">Đánh giá đơn hàng</a>
          <a href="#" className="menu-item">Địa chỉ</a>
          <a href="#" className="menu-item">Sản phẩm yêu thích</a>
          <Link to="/" onClick={logout} className="menu-item">Đăng xuất</Link>
        </div>
      </div>
      <div className="content">
        <h2 className="section-title">Thông tin tài khoản</h2>
        <div className="info-section">
          <div className="info-item">
            <label className="info-label">Họ tên:</label>
            <p>{profile?.lastName} {profile?.firstName}</p>
          </div>
          <div className="info-item">
            <label className="info-label">Email:</label>
            <p>{profile?.email}</p>
          </div>
          <div className="info-item">
            <label className="info-label">Số điện thoại:</label>
            <p>{profile?.phoneNumber || "Không"}</p>
          </div>
          <div className="info-item">
            <label className="info-label">Địa chỉ:</label>
            <p>{profile?.address || "Không"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;