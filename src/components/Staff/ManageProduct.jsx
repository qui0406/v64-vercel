import React, { useState, useEffect } from 'react';
import { authApis, endpoints } from "./../../configs/APIs";
import Apis from "./../../configs/APIs";
import cookie from "react-cookies";
import { Link, useSearchParams } from "react-router-dom";
import { MyDispatchContext } from "./../../configs/MyContexts";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [typeProducts, setTypeProducts] = useState([]);
  const [colorProducts, setColorProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    sex: false,
    colorProductId: '',
    quantity: 0,
    typeProductId: '',
    productDetails: {
      description: '',
      material: '',
      design: '',
      standard: '',
      sizeStandard: '',
      eo: 0,
      mong: 0,
      lai: 0,
      suonTrong: 0,
      suonNgoai: 0
    },
    images: []
  });

  // Fetch products from API
  const fetchProduct = async () => {
    setLoading(true);
    try {
      let res = await Apis.get(endpoints['products']);
      if (res.status === 200 || res.status === 201) {
        const result = res.data?.result || [];
        setProducts(result);
        console.log("Products fetched:", result);
      } else {
        console.error("Failed to fetch products:", res.statusText);
        alert("Không thể tải danh sách sản phẩm!");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Lỗi khi tải danh sách sản phẩm: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch type products from API
  const fetchTypeProducts = async () => {
    try {
      let res = await Apis.get(endpoints['type-products']);
      if (res.status === 200 || res.status === 201) {
        const result = res.data?.result || [];
        setTypeProducts(result);
        console.log("Type products fetched:", result);
      }
    } catch (error) {
      console.error("Error fetching type products:", error);
    }
  };

  // Fetch color products from API
  const fetchColorProducts = async () => {
    try {
      let res = await Apis.get(endpoints['get-all-color']);
      if (res.status === 200 || res.status === 201) {
        const result = res.data?.result || [];
        setColorProducts(result);
        console.log("Color products fetched:", result);
      }
    } catch (error) {
      console.error("Error fetching color products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchTypeProducts();
    fetchColorProducts();
  }, []);

  const resetForm = () => {
    setCurrentProduct(null);
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      sex: false,
      colorProductId: '',
      quantity: 0,
      typeProductId: '',
      productDetails: {
        description: '',
        material: '',
        design: '',
        standard: '',
        sizeStandard: '',
        eo: 0,
        mong: 0,
        lai: 0,
        suonTrong: 0,
        suonNgoai: 0
      },
      images: []
    });
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        sex: product.sex,
        colorProductId: product.colorProduct?.id || '',
        quantity: product.quantity,
        typeProductId: product.typeProduct?.id || '',
        productDetails: product.productDetails ? {
          description: product.productDetails.description || '',
          material: product.productDetails.material || '',
          design: product.productDetails.design || '',
          standard: product.productDetails.standard || '',
          sizeStandard: product.productDetails.sizeStandard || '',
          eo: product.productDetails.eo || 0,
          mong: product.productDetails.mong || 0,
          lai: product.productDetails.lai || 0,
          suonTrong: product.productDetails.suonTrong || 0,
          suonNgoai: product.productDetails.suonNgoai || 0,
        } : {
          description: '',
          material: '',
          design: '',
          standard: '',
          sizeStandard: '',
          eo: 0,
          mong: 0,
          lai: 0,
          suonTrong: 0,
          suonNgoai: 0
        },
        images: product.images || []
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      productDetails: {
        ...prev.productDetails,
        [name]: value
      }
    }));
  };

  // Handle image file upload from computer
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, {
              id: Date.now().toString() + Math.random(),
              image: base64String,
              description: file.name
            }]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset input value để có thể chọn lại cùng file
    e.target.value = '';
  };

  const handleRemoveImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  // Handle submit - CREATE or UPDATE via API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        sex: formData.sex,
        colorProductId: formData.colorProductId,
        quantity: parseInt(formData.quantity),
        typeProductId: formData.typeProductId,
        productDetails: {
          description: formData.productDetails.description,
          material: formData.productDetails.material,
          design: formData.productDetails.design,
          standard: formData.productDetails.standard,
          sizeStandard: formData.productDetails.sizeStandard,
          eo: parseFloat(formData.productDetails.eo) || 0,
          mong: parseFloat(formData.productDetails.mong) || 0,
          lai: parseFloat(formData.productDetails.lai) || 0,
          suonTrong: parseFloat(formData.productDetails.suonTrong) || 0,
          suonNgoai: parseFloat(formData.productDetails.suonNgoai) || 0
        },
        images: formData.images.map(img => ({
          image: img.image,
          description: img.description || ''
        }))
      };

      let res;
      if (currentProduct) {
        // // UPDATE existing product
        // res = await authApis().put(
        //   `${endpoints['products']}/${currentProduct.id}`,
        //   productData
        // );

        // if (res.status === 200 || res.status === 201) {
        //   alert('Cập nhật sản phẩm thành công!');
        //   fetchProduct();
        // }

        alert('Chức năng cập nhật sản phẩm hiện chưa được hỗ trợ.');
      } else {
        // CREATE new product
        res = await authApis().post(endpoints['product/create'], productData);

        if (res.status === 200 || res.status === 201) {
          alert('Thêm sản phẩm mới thành công!');
          fetchProduct();
        }
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Lỗi khi lưu sản phẩm: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Handle delete via API
  const handleDelete = async (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setLoading(true);
      try {
        const res = await authApis().delete(endpoints['delete-product'](productId));

        if (res.status === 200 || res.status === 204) {
          alert('Xóa sản phẩm thành công!');
          fetchProduct();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Lỗi khi xóa sản phẩm: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewDetails = (product) => {
    setViewProduct(product);
    setShowDetailModal(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Quản Lý Sản Phẩm</h1>
          <button
            onClick={() => handleOpenModal()}
            style={{ ...styles.btn, ...styles.btnPrimary }}
            disabled={loading}
          >
            <span style={styles.icon}>+</span>
            Thêm Sản Phẩm
          </button>
        </div>

        {loading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.spinner}>Đang tải...</div>
          </div>
        )}

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Tên</th>
                <th style={styles.th}>Giá</th>
                <th style={styles.th}>Loại</th>
                <th style={styles.th}>Màu</th>
                <th style={styles.th}>Số lượng</th>
                <th style={styles.th}>Giới tính</th>
                <th style={{ ...styles.th, textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                    Không có sản phẩm nào
                  </td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} style={styles.tr}>
                    <td style={styles.td}>{product.id}</td>
                    <td style={{ ...styles.td, fontWeight: 600 }}>{product.name}</td>
                    <td style={styles.td}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                    </td>
                    <td style={styles.td}>{product.typeProduct?.name || 'N/A'}</td>
                    <td style={styles.td}>
                      <span style={styles.badgeColor}>{product.colorProduct?.name || 'N/A'}</span>
                    </td>
                    <td style={styles.td}>{product.quantity}</td>
                    <td style={styles.td}>
                      <span style={product.sex ? styles.badgeFemale : styles.badgeMale}>
                        {product.sex ? '👩 Nữ' : '👨 Nam'}
                      </span>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      <div style={styles.actions}>
                        <button onClick={() => handleViewDetails(product)} style={{ ...styles.btnIcon, color: '#2563eb' }} title="Xem chi tiết">👁</button>
                        <button onClick={() => handleOpenModal(product)} style={{ ...styles.btnIcon, color: '#eab308' }} title="Sửa">✏️</button>
                        <button onClick={() => handleDelete(product.id)} style={{ ...styles.btnIcon, color: '#dc2626' }} title="Xóa" disabled={loading}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {currentProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
              </h2>
              <button onClick={handleCloseModal} style={styles.closeBtn}>&times;</button>
            </div>

            <form onSubmit={handleSubmit} style={styles.modalBody}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Tên sản phẩm *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    style={styles.input}
                    placeholder="Nhập tên sản phẩm" 
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Giá *</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    required 
                    style={styles.input}
                    placeholder="Nhập giá sản phẩm"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Loại sản phẩm *</label>
                  <select 
                    name="typeProductId" 
                    value={formData.typeProductId} 
                    onChange={handleInputChange} 
                    required 
                    style={styles.select}
                  >
                    <option value="">-- Chọn loại sản phẩm --</option>
                    {typeProducts.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Màu sắc *</label>
                  <select 
                    name="colorProductId" 
                    value={formData.colorProductId} 
                    onChange={handleInputChange} 
                    required 
                    style={styles.select}
                  >
                    <option value="">-- Chọn màu sắc --</option>
                    {colorProducts.map(color => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Số lượng</label>
                  <input 
                    type="number" 
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={handleInputChange} 
                    style={styles.input}
                    placeholder="Nhập số lượng"
                  />
                </div>

                <div style={{ ...styles.formGroup }}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="sex"
                      value="true"
                      checked={formData.sex === true}
                      onChange={() => setFormData({ ...formData, sex: true })}
                      style={styles.checkbox}
                    />
                    <span>Dành cho nữ</span>
                  </label>

                  <label style={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="sex"
                      value="false"
                      checked={formData.sex === false}
                      onChange={() => setFormData({ ...formData, sex: false })}
                      style={styles.checkbox}
                    />
                    <span>Dành cho nam</span>
                  </label>
                </div>
                <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Mô tả</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows="3" 
                    style={styles.textarea}
                    placeholder="Nhập mô tả sản phẩm"
                  />
                </div>
              </div>

              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Chi Tiết Kỹ Thuật</h3>
                <div style={styles.formGrid3}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Chất liệu</label>
                    <input 
                      type="text" 
                      name="material" 
                      value={formData.productDetails.material} 
                      onChange={handleDetailsChange} 
                      style={styles.input}
                      placeholder="VD: Titanium" 
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Thiết kế</label>
                    <input 
                      type="text" 
                      name="design" 
                      value={formData.productDetails.design} 
                      onChange={handleDetailsChange} 
                      style={styles.input}
                      placeholder="VD: Oval" 
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Tiêu chuẩn</label>
                    <input 
                      type="text" 
                      name="standard" 
                      value={formData.productDetails.standard} 
                      onChange={handleDetailsChange} 
                      style={styles.input}
                      placeholder="VD: ISO 9001" 
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Size</label>
                    <input 
                      type="text" 
                      name="sizeStandard" 
                      value={formData.productDetails.sizeStandard} 
                      onChange={handleDetailsChange} 
                      style={styles.input}
                      placeholder="VD: M, L, XL" 
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Eo (mm)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      name="eo" 
                      value={formData.productDetails.eo} 
                      onChange={handleDetailsChange} 
                      style={styles.input}
                      placeholder="0.0" 
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Mông (mm)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      name="mong" 
                      value={formData.productDetails.mong} 
                      onChange={handleDetailsChange} 
                      style={styles.input}
                      placeholder="0.0" 
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Lái (mm)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      name="lai" 
                      value={formData.productDetails.lai} 
                      onChange={handleDetailsChange} 
                      style={styles.input}
                      placeholder="0.0" 
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Sườn trong (mm)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      name="suonTrong" 
                      value={formData.productDetails.suonTrong} 
                      onChange={handleDetailsChange} 
                      style={styles.input}
                      placeholder="0.0" 
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Sườn ngoài (mm)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      name="suonNgoai" 
                      value={formData.productDetails.suonNgoai} 
                      onChange={handleDetailsChange} 
                      style={styles.input}
                      placeholder="0.0" 
                    />
                  </div>
                </div>
              </div>

              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>Hình Ảnh Sản Phẩm</h3>
                  <label style={{ ...styles.btn, ...styles.btnSuccess, cursor: 'pointer' }}>
                    <span style={styles.icon}>📷</span>
                    Chọn ảnh từ máy tính
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                
                {formData.images.length > 0 ? (
                  <div style={styles.imagesGrid}>
                    {formData.images.map(img => (
                      <div key={img.id} style={styles.imageItem}>
                        <img src={img.image} alt={img.description} style={styles.imageImg} />
                        <button 
                          type="button" 
                          onClick={() => handleRemoveImage(img.id)} 
                          style={styles.removeBtn}
                          title="Xóa ảnh"
                        >
                          ×
                        </button>
                        {img.description && (
                          <p style={styles.imageDesc}>{img.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={styles.emptyImages}>
                    <p style={{ margin: 0, color: '#9ca3af' }}>
                      Chưa có hình ảnh nào. Nhấn nút "Chọn ảnh từ máy tính" để thêm.
                    </p>
                  </div>
                )}
              </div>

              <div style={styles.modalFooter}>
                <button 
                  type="button" 
                  onClick={handleCloseModal} 
                  style={{ ...styles.btn, ...styles.btnSecondary }}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  style={{ ...styles.btn, ...styles.btnPrimary }} 
                  disabled={loading}

                  onClick={handleSubmit}
                >
                  <span style={styles.icon}>💾</span>
                  {loading ? 'Đang xử lý...' : (currentProduct ? 'Cập nhật' : 'Thêm mới')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailModal && viewProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Chi Tiết Sản Phẩm</h2>
              <button onClick={() => setShowDetailModal(false)} style={styles.closeBtn}>&times;</button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.detailGrid}>
                <div style={styles.detailItem}>
                  <p style={styles.detailLabel}>Tên sản phẩm</p>
                  <p style={styles.detailValue}>{viewProduct.name}</p>
                </div>
                <div style={styles.detailItem}>
                  <p style={styles.detailLabel}>Giá</p>
                  <p style={{ ...styles.detailValue, color: '#16a34a' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(viewProduct.price)}
                  </p>
                </div>
                <div style={styles.detailItem}>
                  <p style={styles.detailLabel}>Loại sản phẩm</p>
                  <p style={styles.detailValue}>{viewProduct.typeProduct?.name || 'N/A'}</p>
                </div>
                <div style={styles.detailItem}>
                  <p style={styles.detailLabel}>Màu sắc</p>
                  <p style={styles.detailValue}>{viewProduct.colorProduct?.name || 'N/A'}</p>
                </div>
                <div style={styles.detailItem}>
                  <p style={styles.detailLabel}>Số lượng</p>
                  <p style={styles.detailValue}>{viewProduct.quantity}</p>
                </div>
                <div style={styles.detailItem}>
                  <p style={styles.detailLabel}>Giới tính</p>
                  <p style={styles.detailValue}>{viewProduct.sex ? '👩 Nữ' : '👨 Nam'}</p>
                </div>
                <div style={{ ...styles.detailItem, gridColumn: '1 / -1' }}>
                  <p style={styles.detailLabel}>Mô tả</p>
                  <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{viewProduct.description}</p>
                </div>
              </div>

              {viewProduct.productDetails && (
                <div style={styles.techSpecs}>
                  <h3 style={styles.sectionTitle}>Thông Số Kỹ Thuật</h3>
                  <div style={styles.techGrid}>
                    {viewProduct.productDetails.material && (
                      <div><span style={styles.techLabel}>Chất liệu:</span><span style={styles.techValue}>{viewProduct.productDetails.material}</span></div>
                    )}
                    {viewProduct.productDetails.design && (
                      <div><span style={styles.techLabel}>Thiết kế:</span><span style={styles.techValue}>{viewProduct.productDetails.design}</span></div>
                    )}
                    {viewProduct.productDetails.standard && (
                      <div><span style={styles.techLabel}>Tiêu chuẩn:</span><span style={styles.techValue}>{viewProduct.productDetails.standard}</span></div>
                    )}
                    {viewProduct.productDetails.sizeStandard && (
                      <div><span style={styles.techLabel}>Size:</span><span style={styles.techValue}>{viewProduct.productDetails.sizeStandard}</span></div>
                    )}
                    {viewProduct.productDetails.eo > 0 && (
                      <div><span style={styles.techLabel}>Eo:</span><span style={styles.techValue}>{viewProduct.productDetails.eo} mm</span></div>
                    )}
                    {viewProduct.productDetails.mong > 0 && (
                      <div><span style={styles.techLabel}>Mông:</span><span style={styles.techValue}>{viewProduct.productDetails.mong} mm</span></div>
                    )}
                    {viewProduct.productDetails.lai > 0 && (
                      <div><span style={styles.techLabel}>Lái:</span><span style={styles.techValue}>{viewProduct.productDetails.lai} mm</span></div>
                    )}
                    {viewProduct.productDetails.suonTrong > 0 && (
                      <div><span style={styles.techLabel}>Sườn trong:</span><span style={styles.techValue}>{viewProduct.productDetails.suonTrong} mm</span></div>
                    )}
                    {viewProduct.productDetails.suonNgoai > 0 && (
                      <div><span style={styles.techLabel}>Sườn ngoài:</span><span style={styles.techValue}>{viewProduct.productDetails.suonNgoai} mm</span></div>
                    )}
                  </div>
                </div>
              )}

              {viewProduct.images && viewProduct.images.length > 0 && (
                <div>
                  <h3 style={styles.sectionTitle}>Hình Ảnh Sản Phẩm</h3>
                  <div style={styles.detailImages}>
                    {viewProduct.images.map(img => (
                      <div key={img.id} style={styles.detailImageItem}>
                        <img src={img.image} alt={img.description} style={styles.detailImageImg} />
                        {img.description && <p style={styles.imageDesc}>{img.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '30px 20px'
  },
  card: {
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  header: {
    padding: '24px',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0
  },
  btn: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  },
  btnPrimary: {
    backgroundColor: '#2563eb',
    color: 'white'
  },
  btnSuccess: {
    backgroundColor: '#16a34a',
    color: 'white'
  },
  btnSecondary: {
    backgroundColor: '#6b7280',
    color: 'white'
  },
  icon: {
    fontSize: '18px'
  },
  loadingOverlay: {
    padding: '40px',
    textAlign: 'center'
  },
  spinner: {
    fontSize: '18px',
    color: '#2563eb',
    fontWeight: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  thead: {
    backgroundColor: '#f9fafb'
  },
  th: {
    padding: '16px 24px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  tr: {
    borderTop: '1px solid #e5e5e5',
    transition: 'background-color 0.2s'
  },
  td: {
    padding: '16px 24px',
    fontSize: '14px',
    color: '#374151'
  },
  actions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center'
  },
  btnIcon: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    fontSize: '18px',
    transition: 'all 0.2s'
  },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600
  },
  badgeColor: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '6px',
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    fontSize: '12px',
    fontWeight: 500
  },
  badgeFemale: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '6px',
    backgroundColor: '#fce7f3',
    color: '#9f1239',
    fontSize: '12px',
    fontWeight: 500
  },
  badgeMale: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '6px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontSize: '12px',
    fontWeight: 500
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    overflowY: 'auto'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column'
  },
  modalHeader: {
    padding: '24px',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '4px',
    lineHeight: 1
  },
  modalBody: {
    padding: '24px',
    overflowY: 'auto'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '24px'
  },
  formGrid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '8px'
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s',
    outline: 'none'
  },
  select: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  textarea: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '80px',
    fontFamily: 'inherit',
    outline: 'none'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    cursor: 'pointer',
    marginTop: '24px'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  section: {
    marginBottom: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #e5e5e5'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '16px',
    color: '#1a1a1a'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  imagesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '16px'
  },
  imageItem: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '2px solid #e5e5e5',
    backgroundColor: '#f9fafb'
  },
  imageImg: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    display: 'block'
  },
  removeBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'all 0.2s'
  },
  imageDesc: {
    padding: '8px',
    fontSize: '11px',
    color: '#6b7280',
    backgroundColor: '#f9fafb',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0,
    borderTop: '1px solid #e5e5e5'
  },
  emptyImages: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '2px dashed #d1d5db'
  },
  modalFooter: {
    padding: '20px 24px',
    borderTop: '1px solid #e5e5e5',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: '#f9fafb'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    marginBottom: '24px'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  detailLabel: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
    fontWeight: 500
  },
  detailValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: 0
  },
  techSpecs: {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '24px',
    border: '1px solid #e5e5e5'
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    fontSize: '14px'
  },
  techLabel: {
    color: '#6b7280',
    fontWeight: 500
  },
  techValue: {
    marginLeft: '8px',
    fontWeight: 600,
    color: '#1a1a1a'
  },
  detailImages: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px'
  },
  detailImageItem: {
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e5e5e5',
    backgroundColor: '#f9fafb'
  },
  detailImageImg: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    display: 'block'
  }
};

export default ManageProduct;