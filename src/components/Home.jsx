import React, { useState, useContext } from 'react';
import { ShoppingBag, User, Heart, Search, Menu, X } from 'lucide-react';
import './../styles/Home.css';
import { MyUserContext, MyDispatchContext } from "./../configs/MyContexts";
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useContext(MyUserContext);

  const products = [
    {
      id: 1,
      name: 'Denim Cơ Bản',
      image: 'https://file.hstatic.net/1000210295/file/v64_home_cat01a.jpg'
    },
    {
      id: 2,
      name: 'Denim Cá Tính',
      image: 'https://file.hstatic.net/1000210295/file/v64_home_cat02.jpg'
    },
    {
      id: 3,
      name: 'Váy Denim Nữ',
      image: 'https://file.hstatic.net/1000210295/file/v64_home_cat03.jpg'
    },
    {
      id: 4,
      name: 'Denim Phối Mặc Đẹp',
      image: 'https://file.hstatic.net/1000210295/file/v64_home_cat04.jpg'
    }
  ];

  const isStaff = user?.roles?.some(role => role.name === "STAFF");



  return (
    <div className="website-container">
      {isStaff ? (
        <>
          <h1>Chào mừng nhân viên đến với trang quản lý!</h1>
        </>
      ) : (
        <>
      <section className="hero-section">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://file.hstatic.net/1000210295/file/video-homepage1.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">#V-SIXTYFOUR - SẢN PHẨM ĐẾN TỪ THIÊN NHIÊN</h1>
          <button className="hero-btn">Xem Thêm</button>
        </div>
      </section>

      {/* Campaign Section */}
      <section className="campaign-section">
        <div className="campaign-image">
            <img 
              src="https://file.hstatic.net/1000210295/file/cover_web_816e81f25d604e7fb5cbc24868ba28c6.jpg" 
              alt="Denim Fashion Collection"
            />
          </div>
      </section>

      {/* Fashion Categories Banner */}
      <section className="fashion-banner">
        <div className="fashion-banner-grid">
          {/* Thời trang nam */}
          <div className="banner-item">
            <img
              src="https://file.hstatic.net/1000210295/file/home_banner-01.jpg"
              alt="Thời trang nam"
            />
            <h3 className="banner-label">Thời Trang Nam</h3>
          </div>

          {/* Thời trang nữ */}
          <div className="banner-item">
            <img
              src="https://file.hstatic.net/1000210295/file/home_banner_02.jpg"
              alt="Thời trang nữ"
            />
            <h3 className="banner-label">Thời Trang Nữ</h3>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="products-section">
        <div className="products-container">
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="overlay"></div>
                </div>
                <h3 className="product-name">{product.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      </>
    )};
      
    </div>
  );
};

export default HomePage;