import React, { useState } from 'react';
import { ShoppingBag, User, Heart, Search, Menu, X, Grid, List, ChevronRight, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';

const ProductListingPageMen = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
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
    setQuantity(1);
    setSelectedSize('S');
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const filters = [
    { id: 'ao-khoac', label: 'ÁO KHOÁC' },
    { id: 'kieu-nu', label: 'ÁO SƠ MI' },
    { id: 'so-mi', label: 'ÁO THUN' },
    { id: 'so-mi-vai', label: 'QUẦN DÀI' },
    { id: 'thun', label: 'QUẦN NGẮN' },
  ];

  const products = [
    {
      id: 1,
      name: 'Áo Nữ Denim Dáng Rộng Màu Xanh Đậm',
      englishName: 'Med Blue Denim Blouse For Her',
      sku: '222WD2016B1950S',
      price: '432,000₫',
      originalPrice: '864,000₫',
      discount: '-50%',
      stock: 950,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
      colors: [{ name: 'MED BLUE', value: 'blue' }],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'BOOT CUT JEANS',
      englishName: 'Boot Cut Jeans',
      sku: 'BCJ2024001',
      price: '664,000₫',
      originalPrice: '864,000₫',
      discount: '-25%',
      stock: 1200,
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&q=80',
      colors: [{ name: 'BLUE', value: 'blue' }],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 3,
      name: 'MAXI DRESS',
      englishName: 'Maxi Dress',
      sku: 'MD2024001',
      price: '1,164,000₫',
      originalPrice: '1,464,000₫',
      discount: '-20%',
      stock: 850,
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80',
      colors: [{ name: 'BLUE', value: 'blue' }],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 4,
      name: 'MINI SKIRT',
      englishName: 'Mini Skirt',
      sku: 'MS2024001',
      price: '664,000₫',
      originalPrice: '864,000₫',
      discount: '-25%',
      stock: 750,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80',
      colors: [{ name: 'NAVY', value: 'navy' }],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 5,
      name: 'PLEATED SHORTS',
      englishName: 'Pleated Shorts',
      sku: 'PS2024001',
      price: '664,000₫',
      originalPrice: '864,000₫',
      discount: '-25%',
      stock: 680,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80',
      colors: [{ name: 'NAVY', value: 'navy' }, { name: 'BROWN', value: 'brown' }],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 6,
      name: 'PLEATED SHORTS',
      englishName: 'Pleated Shorts',
      sku: 'PS2024002',
      price: '664,000₫',
      originalPrice: '864,000₫',
      discount: '-25%',
      stock: 920,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&q=80',
      colors: [{ name: 'BROWN', value: 'brown' }, { name: 'NAVY', value: 'navy' }],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 7,
      name: 'WORKWEAR SHORTS',
      englishName: 'Workwear Shorts',
      sku: 'WS2024001',
      price: '664,000₫',
      originalPrice: '864,000₫',
      discount: '-25%',
      stock: 1050,
      image: 'https://images.unsplash.com/photo-1591195842757-e21d73e8b3c6?w=600&q=80',
      colors: [{ name: 'NAVY', value: 'navy' }, { name: 'BLACK', value: 'black' }],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 8,
      name: 'WORKWEAR SHORTS',
      englishName: 'Workwear Shorts',
      sku: 'WS2024002',
      price: '664,000₫',
      originalPrice: '864,000₫',
      discount: '-25%',
      stock: 870,
      image: 'https://images.unsplash.com/photo-1591195851234-802ad6fa6845?w=600&q=80',
      colors: [{ name: 'BLACK', value: 'black' }, { name: 'NAVY', value: 'navy' }],
      sizes: ['S', 'M', 'L', 'XL']
    }
  ];

  return (
    <div className="page-container">
      
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <a href="/">Trang chủ</a>
          <span>/</span>
          <a href="#">Thời Trang Denim/Jeans Nam</a>
        </div>
      </div>

      {/* Page Title */}
      <div className="page-title">
        <div className="container">
          <h1>Thời Trang Denim/Jeans Nam</h1>
        </div>
      </div>

      {/* Filters */}
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
                  {filter.label}
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

      {/* Products Grid */}
      <div className="products-section">
        <div className="container">
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  {product.discount && (
                    <div className="discount-badge">{product.discount}</div>
                  )}
                  <img src={product.image} alt={product.name} className="product-image" />
                  
                  <button 
                    className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart size={20} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                  </button>

                  <div className="product-actions">
                    <button className="action-btn add-to-cart-btn">
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
                  <p className="product-price">{product.price}</p>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-colors">
                    {product.colors.map((color, index) => (
                      <button key={index} className={`color-swatch ${color.value}`} aria-label={color.name}></button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
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
              {/* Price Range Section */}
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

              {/* Size Section */}
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

              {/* Category Section */}
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

              {/* Color Section */}
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

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="modal-overlay" onClick={closeQuickView}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeQuickView}>
              <X size={24} />
            </button>
            
            <div className="modal-body">
              <div className="modal-image-section">
                {quickViewProduct.discount && (
                  <div className="discount-badge-modal">{quickViewProduct.discount}</div>
                )}
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="modal-image" />
                <button className="modal-nav-btn modal-nav-next">
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="modal-details-section">
                <h2 className="modal-title">{quickViewProduct.name}. {quickViewProduct.englishName} - {quickViewProduct.sku}</h2>
                
                <p className="modal-sku">SKU: {quickViewProduct.sku}</p>
                
                <div className="modal-price-section">
                  <span className="modal-price">{quickViewProduct.price}</span>
                  <span className="modal-original-price">{quickViewProduct.originalPrice}</span>
                </div>

                <div className="modal-stock">
                  <span>Cần bán: {quickViewProduct.stock}</span>
                </div>

                <div className="modal-size-selector">
                  <button className="size-selected-btn">
                    {quickViewProduct.stock}
                    <div className="size-checkmark"></div>
                  </button>
                </div>

                <div className="modal-color-section">
                  <p className="modal-label">Màu sắc: {quickViewProduct.colors[0].name}</p>
                  <div className="modal-color-options">
                    {quickViewProduct.colors.map((color, index) => (
                      <button key={index} className={`modal-color-swatch ${color.value} ${index === 0 ? 'selected' : ''}`}></button>
                    ))}
                  </div>
                </div>

                <div className="modal-size-section">
                  <p className="modal-label">Kích thước:</p>
                  <div className="modal-size-options">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        className={`modal-size-btn ${selectedSize === size ? 'selected' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                        {selectedSize === size && <div className="size-checkmark"></div>}
                      </button>
                    ))}
                  </div>
                </div>

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
                  <button className="modal-add-to-cart">
                    Thêm vào giỏ
                  </button>
                </div>

                <a href="#" className="modal-view-details">Xem chi tiết »</a>
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

        .discount-badge {
          position: absolute;
          top: 0;
          left: 0;
          background: #1a1a1a;
          color: white;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 600;
          z-index: 10;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 15% 50%);
          padding-left: 20px;
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

        /* Filter Sidebar */
        .filter-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9998;
          animation: fadeIn 0.3s ease;
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
          animation: slideInRight 0.3s ease;
        }

        @keyframes slideInRight {
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

        /* Modal Styles */
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
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
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

        .discount-badge-modal {
          position: absolute;
          top: 0;
          left: 0;
          background: #1a1a1a;
          color: white;
          padding: 10px 16px;
          font-size: 16px;
          font-weight: 700;
          z-index: 10;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 15% 50%);
          padding-left: 24px;
        }

        .modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .modal-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: none;
          padding: 12px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
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

        /* Responsive */
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

export default ProductListingPageMen;