import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { authApis, endpoints } from "./../../configs/APIs";
import Apis from "./../../configs/APIs";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    standards: false,
    policy: false,
    stores: true
  });
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Apis.get(endpoints['product-details'](id));
      setProduct(response.data.result);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (productId) => {
    navigate(`/checkouts/${productId}`, {state : {product}});
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const updateQuantity = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  if (loading) {
    return <div className="product-page">Đang tải...</div>;
  }

  if (!product) {
    return <div className="product-page">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="product-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="#">Trang chủ</a> <span>/</span>
        <a href="#">Áo</a> <span>/</span>
        <span>{product.productResponse.name}</span>
      </div>

      <div className="product-container">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={product.productResponse.images[selectedImage]?.image} 
              alt={product.productResponse.name} 
            />
          </div>
          <div className="thumbnail-list">
            {product.productResponse.images.map((img, idx) => (
              <div
                key={idx}
                className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={img.image} alt={`View ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-info">
          <h1 className="product-title">{product.productResponse.name}</h1>
          <div className="product-price">{formatPrice(product.productResponse.price)}</div>

          {/* Thông tin chi tiết */}
          <div className="product-meta">
            {product.productResponse.id && (
              <div className="meta-item">
                <span className="label">Mã sản phẩm:</span>
                <span className="value">{product.productResponse.id}</span>
              </div>
            )}
            {product.material && (
              <div className="meta-item">
                <span className="label">Chất liệu:</span>
                <span className="value">{product.material}</span>
              </div>
            )}
            {product.design && (
              <div className="meta-item">
                <span className="label">Thiết kế:</span>
                <span className="value">{product.design}</span>
              </div>
            )}
            {product.standard && (
              <div className="meta-item">
                <span className="label">Tiêu chuẩn:</span>
                <span className="value">{product.standard}</span>
              </div>
            )}
            {product.sizeStandard && (
              <div className="meta-item">
                <span className="label">Size chuẩn:</span>
                <span className="value">{product.sizeStandard}</span>
              </div>
            )}
            {product.productResponse.color && (
              <div className="meta-item">
                <span className="label">Màu sắc:</span>
                <span className="value">{product.productResponse.color}</span>
              </div>
            )}
            {product.productResponse.sex !== null && (
              <div className="meta-item">
                <span className="label">Giới tính:</span>
                <span className="value">{product.productResponse.sex ? 'Nam' : 'Nữ'}</span>
              </div>
            )}
            {product.productResponse.status && (
              <div className="meta-item">
                <span className="label">Trạng thái:</span>
                <span className="value status-available">{product.productResponse.status}</span>
              </div>
            )}
            {product.productResponse.typeProductResponse && (
              <div className="meta-item">
                <span className="label">Loại sản phẩm:</span>
                <span className="value">{product.productResponse.typeProductResponse}</span>
              </div>
            )}
          </div>

          {/* Mô tả sản phẩm */}
          {product.description && (
            <div className="product-description">
              <p className="desc-highlight">{product.description}</p>
            </div>
          )}

          {/* Thông số cơ thể (nếu có) */}
          {(product.eo || product.mong || product.lai || product.suonTrong || product.suonNgoai) && (
            <div className="body-measurements">
              <h3>Thông số cơ thể</h3>
              <div className="measurements-grid">
                {product.eo && <div><strong>Eo:</strong> {product.eo}</div>}
                {product.mong && <div><strong>Mông:</strong> {product.mong}</div>}
                {product.lai && <div><strong>Lai:</strong> {product.lai}</div>}
                {product.suonTrong && <div><strong>Sườn trong:</strong> {product.suonTrong}</div>}
                {product.suonNgoai && <div><strong>Sườn ngoài:</strong> {product.suonNgoai}</div>}
              </div>
            </div>
          )}

          {/* Nút hành động */}
          <div className="product-options">
            <div className="option-group">
              <div className="quantity-actions">
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(-1)}>-</button>
                  <input 
                    type="text" 
                    value={quantity} 
                    readOnly 
                  />
                  <button onClick={() => updateQuantity(1)}>+</button>
                </div>
                <button className="btn-add-cart">Thêm vào giỏ</button>
                <button className="btn-buy-now" onClick={() => handleBuyNow(product.id)} >Mua ngay</button>
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="accordion">
            {/* Tiêu chuẩn sản phẩm */}
            {(product.standard || product.sizeStandard) && (
              <div className="accordion-item">
                <button className="accordion-header" onClick={() => toggleSection('standards')}>
                  <span>Tiêu chuẩn sản phẩm</span>
                  {expandedSections.standards ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.standards && (
                  <div className="accordion-content">
                    {product.standard && <p>Tiêu chuẩn: {product.standard}</p>}
                    {product.sizeStandard && <p>Kích thước chuẩn: {product.sizeStandard}</p>}
                  </div>
                )}
              </div>
            )}

            {/* Chính sách đổi trả */}
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleSection('policy')}>
                <span>Chính sách đổi trả</span>
                {expandedSections.policy ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.policy && (
                <div className="accordion-content">
                  <p>Đổi trả trong vòng 7 ngày nếu sản phẩm lỗi kỹ thuật.</p>
                  <p>Liên hệ hotline: 1900 1234 để được hỗ trợ.</p>
                </div>
              )}
            </div>

            {/* Cửa hàng */}
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleSection('stores')}>
                <span>Có sẵn tại cửa hàng</span>
                {expandedSections.stores ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.stores && (
                <div className="accordion-content">
                  <p>Hiện tại sản phẩm đang có sẵn tại 7 cửa hàng gần bạn.</p>
                  <p>Vui lòng liên hệ để kiểm tra tồn kho chính xác.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .product-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 40px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .breadcrumb {
          font-size: 14px;
          color: #666;
          margin-bottom: 30px;
        }

        .breadcrumb a {
          color: #666;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          color: #c9a76a;
        }

        .breadcrumb span {
          margin: 0 8px;
        }

        .product-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .product-gallery {
          display: flex;
          gap: 15px;
        }

        .thumbnail-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .thumbnail {
          width: 80px;
          height: 100px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 4px;
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .thumbnail.active {
          border-color: #c9a76a;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .main-image {
          flex: 1;
          background: #f5f5f5;
          border-radius: 8px;
          overflow: hidden;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .product-title {
          font-size: 24px;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.4;
        }

        .product-price {
          font-size: 28px;
          font-weight: 700;
          color: #c9a76a;
        }

        .product-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .meta-item {
          display: flex;
          gap: 10px;
          font-size: 14px;
        }

        .meta-item .label {
          font-weight: 600;
          color: #333;
        }

        .meta-item .value {
          color: #666;
        }

        .status-available {
          color: #27ae60 !important;
        }

        .body-measurements {
          padding: 15px;
          background: #f9f9f9;
          border-radius: 6px;
          border-left: 3px solid #c9a76a;
        }

        .body-measurements h3 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
        }

        .measurements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
          font-size: 14px;
          color: #666;
        }

        .product-options {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .option-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .option-group label {
          font-size: 15px;
          font-weight: 600;
          color: #333;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .size-guide {
          font-size: 13px;
          color: #1a3a52;
          text-decoration: none;
          font-weight: normal;
        }

        .color-options {
          display: flex;
          gap: 12px;
        }

        .color-option {
          width: 70px;
          height: 90px;
          border: 2px solid #ddd;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
        }

        .color-option.selected {
          border-color: #c9a76a;
          box-shadow: 0 0 0 1px #c9a76a;
        }

        .color-option img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .size-options {
          display: flex;
          gap: 10px;
        }

        .size-btn {
          min-width: 60px;
          padding: 12px 20px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s;
        }

        .size-btn:hover {
          border-color: #c9a76a;
        }

        .size-btn.selected {
          background: #c9a76a;
          color: white;
          border-color: #c9a76a;
        }

        .quantity-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .quantity-control {
          display: flex;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }

        .quantity-control button {
          width: 40px;
          height: 48px;
          border: none;
          background: white;
          cursor: pointer;
          font-size: 18px;
          transition: background 0.3s;
        }

        .quantity-control button:hover {
          background: #f5f5f5;
        }

        .quantity-control input {
          width: 60px;
          height: 48px;
          border: none;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
          text-align: center;
          font-size: 15px;
        }

        .btn-add-cart {
          flex: 1;
          padding: 14px 24px;
          background: #c9a76a;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-add-cart:hover {
          background: #b89660;
        }

        .btn-buy-now {
          padding: 14px 32px;
          background: white;
          color: #333;
          border: 2px solid #c9a76a;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-buy-now:hover {
          background: #c9a76a;
          color: white;
        }

        .product-description {
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .desc-highlight {
          font-size: 15px;
          color: #666;
          font-style: italic;
          line-height: 1.6;
        }

        .desc-section h3 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .desc-section ul {
          list-style: none;
          padding: 0;
        }

        .desc-section li {
          font-size: 14px;
          color: #666;
          line-height: 1.8;
          margin-bottom: 5px;
        }

        .made-in {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          white-space: pre-line;
        }

        .accordion {
          margin-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .accordion-item {
          border-bottom: 1px solid #e0e0e0;
        }

        .accordion-header {
          width: 100%;
          padding: 18px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          color: #1a3a52;
          text-align: left;
        }

        .accordion-content {
          padding: 0 0 20px;
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        .stores-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .store-item {
          padding: 15px;
          background: #f9f9f9;
          border-radius: 6px;
          border-left: 3px solid #c9a76a;
        }

        .store-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #1a3a52;
        }

        .store-address {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }

        .store-hours {
          font-size: 13px;
          color: #999;
        }

        @media (max-width: 1024px) {
          .product-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .product-gallery {
            flex-direction: column-reverse;
          }

          .thumbnail-list {
            flex-direction: row;
          }
        }

        @media (max-width: 768px) {
          .product-page {
            padding: 15px 20px;
          }

          .quantity-actions {
            flex-wrap: wrap;
          }

          .btn-buy-now {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;