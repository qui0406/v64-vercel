import React, { useState } from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'DANTON SHIRT',
      price: 964000,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop',
      inStock: true
    },
    {
      id: 2,
      name: 'CROP SHIRT',
      price: 864000,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop',
      inStock: true
    },
    {
      id: 3,
      name: 'RELAX JEANS',
      price: 964000,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop',
      inStock: false
    },
    {
      id: 4,
      name: 'RELAX JEANS',
      price: 964000,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop',
      inStock: true
    }
  ]);

  const removeItem = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="wishlist-container">
      

      <div className="breadcrumb">
        <span>Trang chủ</span>
        <span className="separator">/</span>
        <span>Wishlist</span>
      </div>

      <h1 className="page-title">WISHLIST</h1>

      <div className="wishlist-grid">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-card">
            <button 
              className="delete-btn"
              onClick={() => removeItem(item.id)}
              aria-label="Remove from wishlist"
            >
              <Trash2 size={20} />
            </button>
            
            <div className="product-image">
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className="product-info">
              <p className="product-price">{formatPrice(item.price)}</p>
              <h3 className="product-name">{item.name}</h3>
              <div className="stock-indicator">
                {item.inStock ? (
                  <span className="in-stock">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                      <circle cx="8" cy="8" r="3" fill="currentColor" />
                    </svg>
                  </span>
                ) : (
                  <span className="out-of-stock">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .wishlist-container {
          min-height: 100vh;
          background: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .promotion-banner {
          background: #f8f8f8;
          text-align: center;
          padding: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          border-bottom: 1px solid #e0e0e0;
        }

        .header {
          background: white;
          border-bottom: 1px solid #e0e0e0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 20px;
          font-weight: 700;
          color: #c9a76a;
          letter-spacing: 1px;
        }

        .navigation {
          display: flex;
          gap: 35px;
        }

        .nav-link {
          text-decoration: none;
          color: #333;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: #c9a76a;
        }

        .header-actions {
          display: flex;
          gap: 15px;
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
          padding: 8px;
          transition: color 0.3s;
        }

        .icon-btn:hover {
          color: #c9a76a;
        }

        .breadcrumb {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 40px 10px;
          font-size: 14px;
          color: #666;
        }

        .breadcrumb .separator {
          margin: 0 8px;
        }

        .page-title {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 40px;
          font-size: 32px;
          font-weight: 600;
          text-align: center;
          color: #1a3a52;
        }

        .wishlist-grid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }

        .wishlist-card {
          position: relative;
          background: #f5f5f5;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .wishlist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .delete-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .delete-btn:hover {
          background: #ff4444;
          color: white;
          transform: scale(1.1);
        }

        .product-image {
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #e8e8e8;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .wishlist-card:hover .product-image img {
          transform: scale(1.05);
        }

        .product-info {
          padding: 20px;
          background: white;
        }

        .product-price {
          color: #c9a76a;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .product-name {
          font-size: 15px;
          font-weight: 600;
          color: #1a3a52;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stock-indicator {
          display: flex;
          align-items: center;
        }

        .in-stock {
          color: #1a3a52;
          display: flex;
          align-items: center;
        }

        .out-of-stock {
          color: #999;
          display: flex;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .wishlist-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
            padding: 30px 20px;
          }
        }

        @media (max-width: 768px) {
          .header-content {
            padding: 15px 20px;
          }

          .navigation {
            display: none;
          }

          .wishlist-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 15px;
          }

          .page-title {
            font-size: 24px;
            padding: 15px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default WishlistPage;