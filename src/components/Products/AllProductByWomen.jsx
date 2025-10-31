import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ShoppingBag, User, ChevronLeft, ChevronRight, Heart, Search, Menu, X, Grid, List, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { authApis, endpoints } from "./../../configs/APIs";
import Apis from "./../../configs/APIs";
import cookie from "react-cookies";
import { Link, useSearchParams } from "react-router-dom";
import {MyDispatchContext } from "./../../configs/MyContexts";


// Cookie helper functions
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${JSON.stringify(value)};expires=${expires.toUTCString()};path=/`;
};


const ProductListingPage = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [showCartNotification, setShowCartNotification] = useState(false);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filters , setTypeProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProduct = async () => {
    setLoading(true); 
    try {
      let res = await Apis.get(endpoints['products']); 

      if (res.status === 200 || res.status === 201) {
        const result = res.data?.result || [];
        setProducts(result); 
        console.log("Products fetched:", res.data.result);
      } else {
        console.error("Failed to fetch products:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTypeProducts = async () => {
    setLoading(true);
    try {
      let res = await Apis.get(endpoints['type-products']);
      if (res.status === 200 || res.status === 201) {
        const result = res.data?.result || [];
        setTypeProducts(result);
        console.log("Type products fetched:", res.data.result);
      } else {
        console.error("Failed to fetch type products:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching type products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchTypeProducts();
  }, []);


  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      setCookie('cart', cart);
      console.log('Cart saved to cookie:', cart);
    }
  }, [cart]);

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    size: true,
    category: true,
    color: true
  });

  const toggleFilter = (filterId) => {
    setSelectedFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);

    console.log('Quick view opened for product:', product);

    setQuantity(1);
    setSelectedSize('S');
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const addToCart = (product, size = 'S', qty = 1) => {
    const cartKey = `${product.id}-${size}`;
    
    setCart(prevCart => {
      const newCart = { ...prevCart };
      
      if (cartKey in newCart) {
        newCart[cartKey].quantity += qty;
      } else {
        newCart[cartKey] = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: size,
          quantity: qty,
          sku: product.sku
        };
      }
      
      return newCart;
    });

    setShowCartNotification(true);
    setTimeout(() => {
      setShowCartNotification(false);
    }, 2000);

    console.log('Cart updated:', cart);
  };

  const addToCartFromQuickView = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct, selectedSize, quantity);
      closeQuickView();
    }
  };

  const toProductDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div className="page-container">
      
      {showCartNotification && (
        <div className="cart-notification">
          ✓ Đã thêm vào giỏ hàng!
        </div>
      )}

      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span>/</span>
          <a href="#">Thời Trang Denim/Jeans Nữ</a>
        </div>
      </div>

      <div className="filters-section">
        <div className="container">
          <div className="filters-wrapper">
            <div className="filters-list">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`filter-btn ${selectedFilters.includes(filter.id) ? 'active' : ''}`}
                  onClick={() => toggleFilter(filter.id)}
                >
                  {filter.name}
                </button>
              ))}
            </div>
            <div className="view-controls">
              <button className="sort-btn" onClick={() => setFilterSidebarOpen(true)}>
                Bộ lọc
                <Grid size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="products-section">
        <div className="container">
        
          <div className="products-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img
                onClick={() => toProductDetails(product.id)}
                src={
                  product.images && product.images.length > 0
                    ? product.images[0].image
                    : "/placeholder.jpg" // ảnh mặc định nếu không có ảnh
                }
                alt={product.name}
                className="product-image"
              />

              <button
                className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart
                  size={20}
                  fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                />
              </button>

              <div className="product-actions">
                <button
                  className="action-btn add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Thêm vào giỏ
                </button>
                <button
                  className="action-btn quick-view-btn"
                  onClick={() => openQuickView(product)}
                >
                  Xem nhanh
                </button>
              </div>
            </div>

            <div className="product-info">
              <p className="product-price">
                {product.price?.toLocaleString('vi-VN')}₫
              </p>
              <h3 className="product-name">{product.name}</h3>

              <div className="product-colors">
                {(product.colors || []).map((color, index) => (
                  <button
                    key={index}
                    className={`color-swatch ${color.value || ''}`}
                    aria-label={color.name || 'Màu'}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Không có sản phẩm nào.</p>
      )}
    </div>

  
        </div>

      </div>

      {filterSidebarOpen && (
        <>
          <div className="filter-overlay" onClick={() => setFilterSidebarOpen(false)}></div>
          <div className="filter-sidebar">
            <div className="filter-sidebar-header">
              <h3>Form</h3>
              <button className="filter-close-btn" onClick={() => setFilterSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="filter-sidebar-body">
              <div className="filter-section">
                <button className="filter-section-header" onClick={() => toggleSection('price')}>
                  <span>Giá sản phẩm</span>
                  {expandedSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.price && (
                  <div className="filter-section-content">
                    <div className="price-inputs">
                      <input type="text" placeholder="0₫" className="price-input" />
                      <span>-</span>
                      <input type="text" placeholder="2,000,000₫" className="price-input" />
                    </div>
                  </div>
                )}
              </div>

              <div className="filter-section">
                <button className="filter-section-header" onClick={() => toggleSection('size')}>
                  <span>Size</span>
                  {expandedSections.size ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.size && (
                  <div className="filter-section-content">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <label key={size} className="filter-checkbox-label">
                        <input type="checkbox" className="filter-checkbox" />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="filter-section">
                <button className="filter-section-header" onClick={() => toggleSection('category')}>
                  <span>Chủng Loại</span>
                  {expandedSections.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.category && (
                  <div className="filter-section-content">
                    {filters.map(filter => (
                      <label key={filter.id} className="filter-checkbox-label">
                        <input type="checkbox" className="filter-checkbox" />
                        <span>{filter.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="filter-section">
                <button className="filter-section-header" onClick={() => toggleSection('color')}>
                  <span>Sắp xếp</span>
                  {expandedSections.color ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.color && (
                  <div className="filter-section-content">
                    <label className="filter-checkbox-label">
                      <input type="checkbox" className="filter-checkbox" />
                      <span>Giá: Thấp đến cao</span>
                    </label>
                    <label className="filter-checkbox-label">
                      <input type="checkbox" className="filter-checkbox" />
                      <span>Giá: Cao đến thấp</span>
                    </label>
                    <label className="filter-checkbox-label">
                      <input type="checkbox" className="filter-checkbox" />
                      <span>Mới nhất</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {quickViewProduct && (
  <div className="modal-overlay" onClick={closeQuickView}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={closeQuickView}>
        <X size={24} />
      </button>

      <div className="modal-body">
        {/* --- PHẦN HÌNH ẢNH CÓ NEXT/PREV --- */}
        <div className="modal-image-section">
          {(() => {
            const images =
              quickViewProduct.images && quickViewProduct.images.length > 0
                ? quickViewProduct.images
                : [{ image: "/placeholder.jpg" }];

            const handlePrev = () => {
              setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              );
            };

            const handleNext = () => {
              setCurrentImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              );
            };

            return (
              <div className="modal-image-wrapper relative">
                <img
                  src={images[currentImageIndex].image}
                  alt={`${quickViewProduct.name}-${currentImageIndex}`}
                  className="modal-image"
                />
                {images.length > 1 && (
                  <>
                    <button
                      className="modal-nav-btn modal-nav-prev"
                      onClick={handlePrev}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      className="modal-nav-btn modal-nav-next"
                      onClick={handleNext}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
                <div className="modal-image-dots">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`dot ${
                        idx === currentImageIndex ? "active" : ""
                      }`}
                    ></span>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* --- PHẦN CHI TIẾT SẢN PHẨM --- */}
        <div className="modal-details-section">
          <h2 className="modal-title">
            {quickViewProduct.name}{" "}
            - {quickViewProduct.id}
          </h2>

          <p className="modal-sku">SKU: {quickViewProduct.id}</p>

          <div className="modal-price-section">
            <span className="modal-price">
              {quickViewProduct.price?.toLocaleString("vi-VN")}₫
            </span>
            {quickViewProduct.originalPrice && (
              <span className="modal-original-price">
                {quickViewProduct.originalPrice?.toLocaleString("vi-VN")}₫
              </span>
            )}
          </div>

          <div className="modal-stock">
            <span>Còn: {quickViewProduct.stock || 0}</span>
          </div>

          {/* --- MÀU SẮC --- */}
          {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
            <div className="modal-color-section">
              <p className="modal-label">
                Màu sắc: {quickViewProduct.colors[0]?.name || "Không rõ"}
              </p>
              <div className="modal-color-options">
                {quickViewProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`modal-color-swatch ${color.value || ""} ${
                      index === 0 ? "selected" : ""
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* --- KÍCH THƯỚC --- */}
          {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
            <div className="modal-size-section">
              <p className="modal-label">Kích thước:</p>
              <div className="modal-size-options">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`modal-size-btn ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                    {selectedSize === size && (
                      <div className="size-checkmark"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- SỐ LƯỢNG + NÚT GIỎ HÀNG --- */}
          <div className="modal-actions">
            <div className="quantity-selector">
              <button
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={16} />
              </button>
              <input
                type="text"
                className="quantity-input"
                value={quantity}
                readOnly
              />
              <button
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              className="modal-add-to-cart"
              onClick={addToCartFromQuickView}
            >
              Thêm vào giỏ
            </button>
          </div>

          <button
            className="modal-view-details"
            onClick={() => {
              closeQuickView();
              navigate(`/product-details/${quickViewProduct.id}`);
            }}
          >
            Xem chi tiết »
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .page-container {
          font-family: 'Inter', sans-serif;
          background: #fff;
          color: #1f2937;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .cart-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10001;
          animation: slideIn 0.3s ease, fadeOut 0.3s ease 1.7s;
          font-weight: 500;
        }

        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .breadcrumb {
          background: #f9fafb;
          padding: 16px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .breadcrumb a {
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .breadcrumb a:hover {
          color: #1a1a1a;
        }

        .breadcrumb span {
          margin: 0 8px;
          color: #9ca3af;
        }

        .page-title {
          padding: 32px 0 24px;
        }

        .page-title h1 {
          font-size: 28px;
          font-weight: 600;
          color: #1f2937;
          letter-spacing: -0.5px;
        }

        .cart-count {
          margin-top: 8px;
          font-size: 14px;
          color: #10b981;
          font-weight: 500;
        }

        .filters-section {
          padding: 20px 0;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 40px;
        }

        .filters-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .filters-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          flex: 1;
        }

        .filter-btn {
          padding: 10px 20px;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          color: #4b5563;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
        }

        .filter-btn:hover {
          border-color: #1a1a1a;
          color: #1a1a1a;
        }

        .filter-btn.active {
          background: #1a1a1a;
          color: white;
          border-color: #1a1a1a;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .view-controls {
          display: flex;
          gap: 12px;
        }

        .sort-btn {
          padding: 10px 20px;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          color: #4b5563;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sort-btn:hover {
          border-color: #1a1a1a;
          color: #1a1a1a;
        }

        .products-section {
          padding-bottom: 80px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .product-card {
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
        }

        .product-image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #f3f4f6;
          aspect-ratio: 3/4;
          margin-bottom: 16px;
        }

        .modal-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.8);
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
        }

        .modal-nav-prev {
          left: 10px;
        }

        .modal-nav-next {
          right: 10px;
        }

        .modal-image-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 10px;
        }

        .modal-image-dots .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ccc;
          transition: 0.2s;
        }

        .modal-image-dots .dot.active {
          background: #000;
        }


        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.08);
        }

        .wishlist-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: white;
          border: none;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4b5563;
          z-index: 10;
        }

        .wishlist-btn:hover {
          background: #ef4444;
          color: white;
          transform: scale(1.1);
        }

        .wishlist-btn.active {
          background: #ef4444;
          color: white;
        }

        .product-actions {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          transform: translateY(100%);
          transition: transform 0.4s ease;
          z-index: 5;
        }

        .product-card:hover .product-actions {
          transform: translateY(0);
        }

        .action-btn {
          flex: 1;
          padding: 16px;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .add-to-cart-btn {
          background: rgba(218, 165, 32, 0.95);
          color: white;
          border-right: 1px solid rgba(255,255,255,0.2);
        }

        .add-to-cart-btn:hover {
          background: #b8860b;
        }

        .quick-view-btn {
          background: rgba(218, 165, 32, 0.95);
          color: white;
        }

        .quick-view-btn:hover {
          background: #b8860b;
        }

        .product-info {
          padding: 0 4px;
        }

        .product-price {
          color: #ef4444;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .product-name {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 10px;
          letter-spacing: 0.3px;
        }

        .product-colors {
          display: flex;
          gap: 8px;
        }

        .color-swatch {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .color-swatch:hover {
          border-color: #1a1a1a;
          transform: scale(1.1);
        }

        .color-swatch.blue {
          background: #3b82f6;
        }

        .color-swatch.navy {
          background: #1e3a8a;
        }

        .color-swatch.brown {
          background: #92400e;
        }

        .color-swatch.black {
          background: #1a1a1a;
        }

        .filter-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9998;
          animation: fadeIn2 0.3s ease;
        }

        @keyframes fadeIn2 {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .filter-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 400px;
          height: 100vh;
          background: white;
          z-index: 9999;
          box-shadow: -4px 0 16px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          animation: slideInRight2 0.3s ease;
        }

        @keyframes slideInRight2 {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .filter-sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .filter-sidebar-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
        }

        .filter-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: all 0.3s ease;
          border-radius: 6px;
        }

        .filter-close-btn:hover {
          background: #f3f4f6;
          color: #1a1a1a;
        }

        .filter-sidebar-body {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        .filter-section {
          border-bottom: 1px solid #e5e7eb;
        }

        .filter-section-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          transition: background 0.3s ease;
        }

        .filter-section-header:hover {
          background: #f9fafb;
        }

        .filter-section-content {
          padding: 0 24px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .filter-checkbox-label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 14px;
          color: #4b5563;
          padding: 8px 0;
        }

        .filter-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #1a1a1a;
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .price-input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .price-input:focus {
          border-color: #1a1a1a;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          animation: fadeIn3 0.3s ease;
        }

        @keyframes fadeIn3 {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 1100px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: white;
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: #f3f4f6;
          transform: rotate(90deg);
        }

        .modal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 40px;
        }

        .modal-image-section {
          position: relative;
          background: #f3f4f6;
          border-radius: 12px;
          overflow: hidden;
        }

        .modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

  
        .modal-nav-btn:hover {
          background: #f3f4f6;
        }

        .modal-nav-next {
          right: 20px;
        }

        .modal-details-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          line-height: 1.4;
        }

        .modal-sku {
          color: #6b7280;
          font-size: 14px;
        }

        .modal-price-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-price {
          color: #ef4444;
          font-size: 24px;
          font-weight: 700;
        }

        .modal-original-price {
          color: #9ca3af;
          font-size: 18px;
          text-decoration: line-through;
        }

        .modal-stock {
          font-size: 14px;
          color: #4b5563;
        }

        .modal-size-selector {
          display: flex;
          gap: 8px;
        }

        .size-selected-btn {
          padding: 10px 20px;
          background: white;
          border: 2px solid #ef4444;
          border-radius: 6px;
          color: #1f2937;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .size-checkmark {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 0;
          height: 0;
          border-left: 16px solid transparent;
          border-bottom: 16px solid #ef4444;
        }

        .size-checkmark::after {
          content: '✓';
          position: absolute;
          bottom: -14px;
          right: -14px;
          color: white;
          font-size: 10px;
          font-weight: bold;
        }

        .modal-label {
          font-size: 14px;
          color: #4b5563;
          margin-bottom: 8px;
        }

        .modal-color-section {
          display: flex;
          flex-direction: column;
        }

        .modal-color-options {
          display: flex;
          gap: 12px;
        }

        .modal-color-swatch {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 3px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .modal-color-swatch.selected {
          border-color: #ef4444;
          transform: scale(1.1);
        }

        .modal-size-section {
          display: flex;
          flex-direction: column;
        }

        .modal-size-options {
          display: flex;
          gap: 12px;
        }

        .modal-size-btn {
          padding: 12px 24px;
          background: white;
          border: 2px solid #d1d5db;
          border-radius: 6px;
          color: #4b5563;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .modal-size-btn:hover {
          border-color: #1a1a1a;
        }

        .modal-size-btn.selected {
          border-color: #ef4444;
          background: white;
        }

        .modal-size-btn .size-checkmark {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 0;
          height: 0;
          border-left: 16px solid transparent;
          border-bottom: 16px solid #ef4444;
        }

        .modal-size-btn .size-checkmark::after {
          content: '✓';
          position: absolute;
          bottom: -14px;
          right: -14px;
          color: white;
          font-size: 10px;
          font-weight: bold;
        }

        .modal-actions {
          display: flex;
          gap: 16px;
          margin-top: 10px;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          border: 2px solid #d1d5db;
          border-radius: 6px;
          overflow: hidden;
        }

        .quantity-btn {
          background: white;
          border: none;
          padding: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4b5563;
          transition: all 0.3s ease;
        }

        .quantity-btn:hover {
          background: #f3f4f6;
          color: #1a1a1a;
        }

        .quantity-input {
          border: none;
          width: 60px;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          outline: none;
          background: white;
          border-left: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
        }

        .modal-add-to-cart {
          flex: 1;
          background: #daa520;
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-add-to-cart:hover {
          background: #b8860b;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(218, 165, 32, 0.3);
        }

        .modal-view-details {
          color: #2563eb;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: inline-block;
          transition: color 0.3s ease;
        }

        .modal-view-details:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .modal-body {
            grid-template-columns: 1fr;
          }

          .filter-sidebar {
            width: 350px;
          }
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .filters-wrapper {
            flex-direction: column;
            align-items: stretch;
          }

          .filters-list {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 8px;
          }

          .filter-btn {
            white-space: nowrap;
          }

          .page-title h1 {
            font-size: 24px;
          }

          .modal-body {
            padding: 24px;
            gap: 24px;
          }

          .modal-title {
            font-size: 18px;
          }

          .modal-actions {
            flex-direction: column;
          }

          .quantity-selector {
            width: 100%;
          }

          .filter-sidebar {
            width: 90%;
            max-width: 400px;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }

          .container {
            padding: 0 16px;
          }

          .modal-body {
            padding: 20px;
          }

          .modal-size-options {
            flex-wrap: wrap;
          }

          .filter-sidebar {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductListingPage;