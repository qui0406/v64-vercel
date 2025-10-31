import React, { useState } from 'react';
import Cookies from "js-cookie";

import './../styles/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'QUẦN DÀI NỮ DENIM MEDIUM BLUE FORM BOOTCUT LƯNG TRUNG',
      sku: '125WD2084B195027',
      code: '125WD2084B1',
      category: 'Dáng loe',
      color: 'MED BLUE',
      size: '27',
      price: 864000,
      quantity: 1,
      image: 'https://cdn.hstatic.net/products/1000210295/125wd2084b1_950_035c105e8bf3419680f16d2feda5f450_medium.jpg'
    },
    {
      id: 2,
      name: 'VÁY DENIM MIDI LIGHT BLUE FORM ĐUÔI CÁ',
      sku: '125WD1116F193026',
      code: '125WD1116F1',
      category: 'Dáng midi',
      color: 'LIGHT BLUE',
      size: '26',
      price: 964000,
      quantity: 1,
      image: 'https://cdn.hstatic.net/products/1000210295/125wd1116f1930__5__9725765ff8e34bff84ef6db43cef9edb_medium.jpg'
    }
  ]);

  const [note, setNote] = useState('');
  const [exportInvoice, setExportInvoice] = useState(false);


  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="breadcrumb">
          <span>Trang chủ</span>
          <span className="separator">/</span>
          <span>Giỏ hàng</span>
        </div>

        <div className="cart-header">
          <h1>Giỏ hàng:</h1>
          <span className="item-count">{cartItems.length} Sản phẩm</span>
        </div>

        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h3 className="item-name">{item.name} - {item.code}</h3>
                <p className="item-meta">{item.category} / {item.color} / {item.size}</p>
                <p className="item-sku">SKU: {item.sku}</p>
                <p className="item-price">{formatPrice(item.price)}</p>
              </div>
              <div className="item-actions">
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                  <input type="text" value={item.quantity} readOnly />
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>Xóa</button>
              </div>
              <div className="item-total">
                <span className="total-price">{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-sidebar">
        <div className="order-summary">
          <h2>Thông tin đơn hàng</h2>
          
          <div className="summary-row">
            <span>Tổng tiền:</span>
            <span className="total-amount">{formatPrice(getTotalPrice())}</span>
          </div>

          <div className="invoice-checkbox">
            <input
              type="checkbox"
              id="invoice"
              checked={exportInvoice}
              onChange={(e) => setExportInvoice(e.target.checked)}
            />
            <label htmlFor="invoice">Xuất hoá đơn</label>
          </div>

          <div className="order-note">
            <h3>Ghi chú đơn hàng</h3>
            <textarea
              placeholder="Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nhập mã khuyến mãi (nếu có)"
              className="promo-input"
            />
          </div>

          <button className="checkout-btn">THANH TOÁN NGAY</button>
          <button className="continue-shopping">← Tiếp tục mua hàng</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;