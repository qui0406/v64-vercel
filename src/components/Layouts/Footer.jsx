import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ChevronUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <>
      <style>{`
        .footer {
          background-color: #1e3a5f;
          color: white;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .footer-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 24px;
        }

        .company-info p {
          font-size: 14px;
          margin-bottom: 16px;
          line-height: 1.8;
        }

        .address-list {
          font-size: 14px;
        }

        .address-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 12px;
        }

        .address-item svg {
          width: 16px;
          height: 16px;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .address-indent {
          padding-left: 24px;
          margin-bottom: 12px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
        }

        .contact-item svg {
          width: 16px;
          height: 16px;
        }

        .contact-item a {
          color: white;
          text-decoration: none;
          transition: color 0.3s;
        }

        .contact-item a:hover {
          color: #fbbf24;
        }

        .dmca-badge {
          margin-top: 24px;
        }

        .dmca-badge img {
          width: 128px;
        }

        .links-list {
          list-style: none;
          padding: 0;
        }

        .links-list li {
          margin-bottom: 12px;
        }

        .links-list a {
          color: white;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s;
        }

        .links-list a:hover {
          color: #fbbf24;
        }

        .links-list a.active {
          color: #fbbf24;
        }

        .newsletter-text {
          font-size: 14px;
          margin-bottom: 16px;
        }

        .newsletter-form {
          display: flex;
          margin-bottom: 24px;
        }

        .newsletter-input {
          flex: 1;
          padding: 12px 16px;
          border: none;
          outline: none;
          color: #1f2937;
        }

        .newsletter-button {
          background-color: #d4a574;
          color: white;
          padding: 12px 24px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .newsletter-button:hover {
          background-color: #c49563;
        }

        .social-icons {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: opacity 0.3s;
        }

        .social-icon:hover {
          opacity: 0.8;
        }

        .social-icon.zalo {
          background-color: #00a8e8;
        }

        .social-icon.tiktok {
          background-color: #000;
        }

        .social-icon.youtube {
          background-color: #ff0000;
        }

        .social-icon.instagram {
          background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af);
        }

        .social-icon.facebook {
          background-color: #1877f2;
        }

        .zalo-inner {
          width: 24px;
          height: 24px;
          background-color: white;
          border-radius: 50%;
        }

        .tiktok-inner {
          width: 20px;
          height: 20px;
          border: 2px solid white;
          border-radius: 4px;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .footer-bottom-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
          font-style: normal;
        }

        @media (min-width: 768px) {
          .footer-bottom-container {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .scroll-top-button {
          width: 40px;
          height: 40px;
          background-color: #d4a574;
          border: none;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 16px;
        }

        @media (min-width: 768px) {
          .scroll-top-button {
            margin-top: 0;
          }
        }

        .scroll-top-button:hover {
          background-color: #c49563;
        }

        .scroll-top-button svg {
          width: 20px;
          height: 20px;
          color: white;
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="company-info">
              <h3 className="footer-title">V-SIXTYFOUR</h3>
              <p>MSDN: 0314840916 do Sở Kế Hoạch và Đầu Tư TPHCM</p>
              
              <div className="address-list">
                <MapPin />
                <div className="address-item">
                  
                  <p>Văn Phòng: 6 Thái Văn Lung, Phường Sài Gòn, Tp. HCM</p>
                </div>
                
                <p className="">
                  <strong>Q7 - Tp.HCM:</strong> Tầng Trệt - TTTM Lotte Mart Q7
                </p>
                
                <p className="">
                  <strong>Q10 - Tp.HCM:</strong> Tầng 3 - TTTM Vạn Hạnh Mall
                </p>
                
                <p>
                  <strong>Cần Thơ:</strong> Tầng 1 - TTTM Sense
                </p>
                
                <p>
                  <strong>Phan Thiết:</strong> Tầng 2 - TTTM Lotte Mart Phan Thiết
                </p>
                
                <p>
                  <strong>Hải Phòng:</strong> Tầng 1 - TTTM Aeon Mall Hải Phòng
                </p>
                
                <div className="contact-item">
                  <Phone />
                  <a href="tel:0907026564">0907 026 564</a>
                </div>
                
                <div className="contact-item">
                  <Mail />
                  <a href="mailto:cskh@v64.vn">cskh@v64.vn</a>
                </div>
              </div>

              <div className="dmca-badge">
                <img 
                  src="@/assets/images/dathongbao.png" 
                  alt="DMCA Protected"
                />
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="section-title">LIÊN KẾT</h3>
              <ul className="links-list">
                <li><a href="#">Giới thiệu</a></li>
                <li><a href="#">Nhà sáng lập</a></li>
                <li><a href="#">Công ty VITAJEANS</a></li>
                <li><a href="#">Xu hướng - Phong cách</a></li>
                <li><a href="#">Bản Tin V-SIXTYFOUR</a></li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="section-title">CHÍNH SÁCH</h3>
              <ul className="links-list">
                <li><a href="#">Hướng dẫn mua hàng</a></li>
                <li><a href="#">Phương thức thanh toán</a></li>
                <li><a href="#">Chính sách giao hàng</a></li>
                <li><a href="#">Chính sách kiểm và đổi hàng</a></li>
                <li><a href="#">Hướng dẫn đổi trả sản phẩm</a></li>
                <li><a href="#">Hướng dẫn bảo quản sản phẩm</a></li>
                <li><a href="#" className="active">Chính sách bảo vệ thông tin khách hàng</a></li>
                <li><a href="#">Chính Sách Thành Viên</a></li>
                <li><a href="#">Những câu hỏi thường gặp</a></li>
                <li><a href="#">Tuyển dụng</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="section-title">ĐĂNG KÝ NHẬN KHUYẾN MÃI</h3>
              <p className="newsletter-text">
                Hãy là người đầu tiên nhận khuyến mãi lớn!
              </p>
              
              <div className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="newsletter-input"
                />
                <button onClick={handleSubmit} className="newsletter-button">
                  ĐĂNG KÝ
                </button>
              </div>

              <div className="social-icons">
                <a href="#" className="social-icon zalo" aria-label="Zalo">
                  <div className="zalo-inner"></div>
                </a>
                <a href="#" className="social-icon tiktok" aria-label="TikTok">
                  <div className="tiktok-inner"></div>
                </a>
                <a href="#" className="social-icon youtube" aria-label="YouTube">
                  <Youtube />
                </a>
                <a href="#" className="social-icon instagram" aria-label="Instagram">
                  <Instagram />
                </a>
                <a href="#" className="social-icon facebook" aria-label="Facebook">
                  <Facebook />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <p>© 2025 V-SIXTYFOUR. Powered by VIET THANG JEAN Company Limited</p>
            
            <button
              onClick={scrollToTop}
              className="scroll-top-button"
              aria-label="Scroll to top"
            >
              <ChevronUp />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}