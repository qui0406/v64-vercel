import React, { useState } from 'react';
import { useLocation, useParams } from "react-router-dom";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'QUẦN DÀI NỮ DENIM MEDIUM BLUE FORM BOOTCUT LƯNG TRUNG - 125WD2084B1',
      image: 'https://via.placeholder.com/80x100',
      size: 'Dáng loe / MED BLUE / 27',
      price: 1728000,
      quantity: 2
    }
  ]);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: 'Vietnam',
    address: '',
    city: '',
    shippingNote: ''
  });

  const [couponCode, setCouponCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const shippingFee = 0;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingFee;
  const vat = Math.round(total * 0.08);
  
  const { productId } = useParams();
  const location = useLocation();

  const product = location.state?.product;

  return (
    <div style={styles.container}>

      <div style={styles.content}>
        <div style={styles.leftSection}>
          <div style={styles.loginPrompt}>
            <span>Đăng nhập để mua hàng tiện lợi và nhận nhiều ưu đãi hơn nữa</span>
            <button style={styles.loginBtn}>Đăng nhập</button>
          </div>

          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Thông tin giao hàng</h2>
            
            <input
              type="text"
              name="fullName"
              placeholder="Nhập họ và tên"
              value={formData.fullName}
              onChange={handleInputChange}
              style={styles.input}
            />

            <div style={styles.phoneInputWrapper}>
              <input
                type="tel"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleInputChange}
                style={styles.input}
              />
              <span style={styles.flag}>🇻🇳</span>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Nhập email (không bắt buộc)"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
            />

            <div style={styles.selectWrapper}>
              <label style={styles.selectLabel}>Quốc gia</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="Vietnam">Vietnam</option>
                <option value="Thailand">Thailand</option>
                <option value="Singapore">Singapore</option>
              </select>
            </div>

            <input
              type="text"
              name="address"
              placeholder="Địa chỉ, tên đường"
              value={formData.address}
              onChange={handleInputChange}
              style={styles.input}
            />

            <input
              type="text"
              name="city"
              placeholder="Tỉnh/TP, Quận/Huyện, Phường/Xã"
              value={formData.city}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Phương thức giao hàng</h2>
            <input
              type="text"
              name="shippingNote"
              placeholder="Nhập địa chỉ để xem các phương thức giao hàng"
              value={formData.shippingNote}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.rightSection}>
          <div style={styles.cartCard}>
            <h2 style={styles.cartTitle}>Giỏ hàng</h2>

            {cartItems.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <div style={styles.itemHeader}>
                  <div style={styles.itemInfo}>
                    <div style={styles.imageWrapper}>
                      <img src={item.image} alt={item.name} style={styles.itemImage} />
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        style={styles.removeBtn}
                      >
                        ×
                      </button>
                    </div>
                    <div style={styles.itemDetails}>
                      <p style={styles.itemName}>{item.name}</p>
                      <p style={styles.itemSize}>{item.size} ›</p>
                    </div>
                  </div>
                </div>

                <div style={styles.itemFooter}>
                  <p style={styles.itemPrice}>
                    {new Intl.NumberFormat('vi-VN').format(item.price)}₫
                  </p>
                  <div style={styles.quantityControl}>
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      style={styles.qtyBtn}
                    >
                      −
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      style={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div style={styles.couponSection}>
              <h3 style={styles.couponTitle}>Mã khuyến mãi</h3>
              <button style={styles.couponSelectBtn}>
                <span>🎟️ Chọn mã</span>
                <span>›</span>
              </button>
              <div style={styles.couponInput}>
                <input
                  type="text"
                  placeholder="Nhập mã khuyến mãi"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={styles.couponField}
                />
                <button style={styles.applyBtn}>Áp dụng</button>
              </div>
            </div>

            <div style={styles.summarySection}>
              <h3 style={styles.summaryTitle}>Tóm tắt đơn hàng</h3>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Tổng tiền hàng</span>
                <span style={styles.summaryValue}>
                  {new Intl.NumberFormat('vi-VN').format(subtotal)}₫
                </span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Phí vận chuyển</span>
                <span style={styles.summaryValue}>-</span>
              </div>
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Tổng thanh toán</span>
                <span style={styles.totalValue}>
                  {new Intl.NumberFormat('vi-VN').format(total)}₫
                </span>
              </div>
              <p style={styles.vatNote}>
                Giá trên đã bao gồm VAT {new Intl.NumberFormat('vi-VN').format(vat)}₫
              </p>
            </div>

            <button style={styles.checkoutBtn}>Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    backgroundColor: 'white',
    padding: '20px',
    borderBottom: '1px solid #e5e5e5',
    textAlign: 'center'
  },
  logo: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 700,
    color: '#000'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
    display: 'grid',
    gridTemplateColumns: '1fr 450px',
    gap: '30px'
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  loginPrompt: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: '#333'
  },
  loginBtn: {
    padding: '8px 24px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s'
  },
  formSection: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px'
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    fontWeight: 600,
    color: '#000'
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  },
  phoneInputWrapper: {
    position: 'relative',
    marginBottom: '16px'
  },
  flag: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '20px',
    pointerEvents: 'none'
  },
  selectWrapper: {
    marginBottom: '16px'
  },
  selectLabel: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '13px',
    color: '#666'
  },
  select: {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  rightSection: {
    position: 'sticky',
    top: '20px',
    height: 'fit-content'
  },
  cartCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px'
  },
  cartTitle: {
    margin: '0 0 24px 0',
    fontSize: '20px',
    fontWeight: 600,
    color: '#000'
  },
  cartItem: {
    paddingBottom: '20px',
    marginBottom: '20px',
    borderBottom: '1px solid #f0f0f0'
  },
  itemHeader: {
    marginBottom: '16px'
  },
  itemInfo: {
    display: 'flex',
    gap: '12px'
  },
  imageWrapper: {
    position: 'relative',
    flexShrink: 0
  },
  itemImage: {
    width: '80px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '6px',
    border: '1px solid #f0f0f0'
  },
  removeBtn: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    lineHeight: 1
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    margin: '0 0 8px 0',
    fontSize: '13px',
    color: '#000',
    lineHeight: 1.4
  },
  itemSize: {
    margin: 0,
    fontSize: '13px',
    color: '#666'
  },
  itemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemPrice: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    color: '#000'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '4px'
  },
  qtyBtn: {
    width: '32px',
    height: '32px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333'
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 500
  },
  couponSection: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #f0f0f0'
  },
  couponTitle: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: 600,
    color: '#000'
  },
  couponSelectBtn: {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: '#333'
  },
  couponInput: {
    display: 'flex',
    gap: '8px'
  },
  couponField: {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px'
  },
  applyBtn: {
    padding: '12px 24px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500
  },
  summarySection: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #f0f0f0'
  },
  summaryTitle: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: 600,
    color: '#000'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '14px'
  },
  summaryLabel: {
    color: '#666'
  },
  summaryValue: {
    color: '#000',
    fontWeight: 500
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #f0f0f0'
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#000'
  },
  totalValue: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#000'
  },
  vatNote: {
    margin: '8px 0 0 0',
    fontSize: '12px',
    color: '#999',
    textAlign: 'right'
  },
  checkoutBtn: {
    width: '100%',
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  }
};

export default CheckoutPage;