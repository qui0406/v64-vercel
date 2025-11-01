
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
          <a href="#">Thời Trang Denim/Jeans Nam</a>
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
              : "/placeholder.jpg"
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
          {product.price ? product.price.toLocaleString('vi-VN') + '₫' : 'Liên hệ'}
        </p>
        <h3 className="product-name">{product.name || 'Tên sản phẩm'}</h3>

        {product.colors && Array.isArray(product.colors) && product.colors.length > 0 && (
          <div className="product-colors">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className="color-swatch"
                style={{ 
                  backgroundColor: color.value || '#cccccc',
                  border: color.value === '#ffffff' ? '1px solid #e5e5e5' : 'none'
                }}
                aria-label={color.name || `Màu ${index + 1}`}
                title={color.name || `Màu ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </div>
  ))
) : (
  <div className="no-products">
    <p>Không có sản phẩm nào</p>
  </div>
)}
    </div>

  
        </div>

      </div>

      {filterSidebarOpen && (
        <>
          <div className="filter-overlay" onClick={() => setFilterSidebarOpen(false)}></div>
          <div className="filter-sidebar">
            <div className="filter-sidebar-header">
              <h3>Bộ lọc</h3>
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
                        <span>{filter.name}</span>
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

        <div className="modal-details-section">
          <h2 className="modal-title">
            {quickViewProduct.name}
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

          {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
            <div className="modal-color-section">
              <p className="modal-label">
                Màu sắc: {quickViewProduct.colors[0]?.name || "Không rõ"}
              </p>
              <div className="modal-color-options">
                {quickViewProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`modal-color-swatch ${
                      index === 0 ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color.value || '#cccccc' }}
                  ></button>
                ))}
              </div>
            </div>
          )}

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
       
        
        
      `}</style>
    </div>
  );
};

export default ProductListingPage;