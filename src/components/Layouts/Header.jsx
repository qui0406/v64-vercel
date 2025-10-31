import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faUser, faHeart, faCartShopping, faTimes } from '@fortawesome/free-solid-svg-icons';
import './../../styles/Header.css';
import { MyUserContext, MyDispatchContext } from "./../../configs/MyContexts";


const Header = () => {
  const [dropdowns, setDropdowns] = useState({
    nu: false,
    nam: false,
    phukien: false,
    bosuutap: false,
    cuahang: false,
    bosuutapSub: null,
  });

  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const nav = useNavigate();
  const location = useLocation();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
      const savedCart = getCookie('cart');
      if (savedCart) {
        setCart(savedCart);
      }
    }, []);


  
  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        try {
          return JSON.parse(c.substring(nameEQ.length, c.length));
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  };
  

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdowns({
          nu: false,
          nam: false,
          phukien: false,
          bosuutap: false,
          cuahang: false,
          bosuutapSub: null,
        });
        if (!event.target.closest('.far-bar-icon')) {
          setMobileMenuOpen(false);
        }
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (item) => {
    setDropdowns((prev) => ({
      ...prev,
      nu: item === 'nu' ? true : false,
      nam: item === 'nam' ? true : false,
      phukien: item === 'phukien' ? true : false,
      bosuutap: item === 'bosuutap' ? true : prev.bosuutap,
      cuahang: item === 'cuahang' ? true : false,
    }));
  };

  const handleMouseLeave = () => {
    setDropdowns((prev) => ({
      ...prev,
      nu: false,
      nam: false,
      phukien: false,
      cuahang: false,
      bosuutap: prev.bosuutapSub !== null,
    }));
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleDropdown = (item) => {
    setDropdowns((prev) => ({
      ...prev,
      [item]: !prev[item],
      bosuutapSub: item === 'bosuutap' ? null : prev.bosuutapSub,
    }));
  };
  const toggleSubmenu = (subItem) => {
    setDropdowns((prev) => ({
      ...prev,
      bosuutapSub: prev.bosuutapSub === subItem ? null : subItem,
    }));
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
    nav("/login");
  };

  const isStaff = user?.roles?.some(role => role.name === "STAFF");



  return (
    <header className="header">
      <Link to="/" className="logo">
        V-SIXTYFOUR
      </Link>

      {isStaff ? (
        <>
          <Link to="/product/manage" className="staff-link"> Quản lý sản phẩm</Link>
          <Link to="/product/orders" className="staff-link"> Quản lý đơn hàng</Link>
          <Link to="/product/statistics" className="staff-link"> Thống kê đơn hàng</Link>

          {user === null ? (
              <>
                <NavLink to="/login" className="btn btn-outline-light">
                  Đăng nhập
                </NavLink>
                <NavLink to="/register" className="btn btn-light text-dark fw-semibold">
                  Đăng ký
                </NavLink>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <Link to="/profile" className="nav-link text-info d-flex align-items-center">
                  
                  <span className="ms-2">{user.username}</span>
                </Link>
                <button className="btn btn-danger ms-3" onClick={logout}>
                  Đăng xuất
                </button>
              </div>
            )}
        </>
      ) : (
        <>

      <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} ref={dropdownRef}>
        
        {/* Thêm nút exit cho mobile menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-header">
            <button className="mobile-menu-exit" onClick={toggleMobileMenu} aria-label="Close menu">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}
        <ul>
          <li
            className={`dropdown ${dropdowns.nu ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('nu')}
            onMouseLeave={handleMouseLeave}
            onClick={() => toggleDropdown('nu')}
          >
            <Link to="#nu">NỮ</Link>
            {dropdowns.nu && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/tat-ca-san-pham-nu">Tất cả sản phẩm</Link>
                </li>
                <li
                  className={`dropdown-submenu ${dropdowns.bosuutapSub === 'aonu' ? 'active' : ''}`}
                  onMouseEnter={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: 'aonu' }))}
                  onMouseLeave={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: null }))}
                  onClick={() => toggleSubmenu('aonu')}
                >
                  <Link to="#nusub2">Áo</Link>
                  {dropdowns.bosuutapSub === 'aonu' && (
                    <ul className="dropdown-menu-2">
                      <li>
                        <Link to="#bosuutap-sub2">Áo khoác</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub3">Áo sơ mi</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub2">Áo kiểu</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub3">Áo thun</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  className={`dropdown-submenu ${dropdowns.bosuutapSub === 'quannu' ? 'active' : ''}`}
                  onMouseEnter={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: 'quannu' }))}
                  onMouseLeave={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: null }))}
                  onClick={() => toggleSubmenu('quannu')}
                >
                  <Link to="#nusub3">Quần</Link>
                  {dropdowns.bosuutapSub === 'quannu' && (
                    <ul className="dropdown-menu-2">
                      <li>
                        <Link to="#bosuutap-sub2">Quần dài</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub3">Quần lửng</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub2">Quần ngắn</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  className={`dropdown-submenu ${dropdowns.bosuutapSub === 'vaynu' ? 'active' : ''}`}
                  onMouseEnter={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: 'vaynu' }))}
                  onMouseLeave={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: null }))}
                  onClick={() => toggleSubmenu('vaynu')}
                >
                  <Link to="#nu-sub4">Váy</Link>
                  {dropdowns.bosuutapSub === 'vaynu' && (
                    <ul className="dropdown-menu-2">
                      <li>
                        <Link to="#bosuutap-sub2">Váy dài</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub3">Váy ngắn</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub2">Váy liền</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link to="#nu-sub5">Đầm</Link>
                </li>
                <li>
                  <Link to="#nu-sub6">Yếm</Link>
                </li>
              </ul>
            )}
          </li>

          <li
            className={`dropdown ${dropdowns.nam ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('nam')}
            onMouseLeave={handleMouseLeave}
            onClick={() => toggleDropdown('nam')}
          >
            <Link to="#nam">NAM</Link>
            {dropdowns.nam && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/tat-ca-san-pham-nam">Tất cả sản phẩm</Link>
                </li>
                <li
                  className={`dropdown-submenu ${dropdowns.bosuutapSub === 'aonam' ? 'active' : ''}`}
                  onMouseEnter={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: 'aonam' }))}
                  onMouseLeave={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: null }))}
                  onClick={() => toggleSubmenu('aonam')}
                >
                  <Link to="#nam-sub2">Áo</Link>
                  {dropdowns.bosuutapSub === 'aonam' && (
                    <ul className="dropdown-menu-2">
                      <li>
                        <Link to="#bosuutap-sub2">Áo khoác</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub3">Áo sơ mi</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub2">Áo thun</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  className={`dropdown-submenu ${dropdowns.bosuutapSub === 'quannam' ? 'active' : ''}`}
                  onMouseEnter={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: 'quannam' }))}
                  onMouseLeave={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: null }))}
                  onClick={() => toggleSubmenu('quannam')}
                >
                  <Link to="#nam-sub3">Quần</Link>
                  {dropdowns.bosuutapSub === 'quannam' && (
                    <ul className="dropdown-menu-2">
                      <li>
                        <Link to="#bosuutap-sub2">Quần dài</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub2">Quần ngắn</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          <li
            className={`dropdown ${dropdowns.phukien ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('phukien')}
            onMouseLeave={handleMouseLeave}
            onClick={() => toggleDropdown('phukien')}
          >
            <Link to="#phukien">PHỤ KIỆN</Link>
            {dropdowns.phukien && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/collections/non-jeans">Nón</Link>
                </li>
                <li>
                  <Link to="/collections/tui-denim">Túi</Link>
                </li>
                <li>
                  <Link to="/collections/khau-trang">Khẩu trang</Link>
                </li>
              </ul>
            )}
          </li>

          <li
            className={`dropdown ${dropdowns.bosuutap ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('bosuutap')}
            onMouseLeave={handleMouseLeave}
            onClick={() => toggleDropdown('bosuutap')}
          >
            <Link to="#bosuutap">BỘ SƯU TẬP</Link>
            {dropdowns.bosuutap && (
              <ul className="dropdown-menu">
                <li
                  className={`dropdown-submenu ${dropdowns.bosuutapSub === 'SS25' ? 'active' : ''}`}
                  onMouseEnter={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: 'SS25' }))}
                  onMouseLeave={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: null }))}
                  onClick={() => toggleSubmenu('SS25')}
                >
                  <Link to="#bosuutapsub1">SS25</Link>
                  {dropdowns.bosuutapSub === 'SS25' && (
                    <ul className="dropdown-menu-2">
                      <li>
                        <Link to="#bosuutap-sub2">Nam</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub3">Nữ</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  className={`dropdown-submenu ${dropdowns.bosuutapSub === 'SS24' ? 'active' : ''}`}
                  onMouseEnter={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: 'SS24' }))}
                  onMouseLeave={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: null }))}
                  onClick={() => toggleSubmenu('SS24')}
                >
                  <Link to="#bosuutap-sub3">SS24</Link>
                  {dropdowns.bosuutapSub === 'SS24' && (
                    <ul className="dropdown-menu-2">
                      <li>
                        <Link to="#bosuutap-sub2">Nam</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub3">Nữ</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  className={`dropdown-submenu ${dropdowns.bosuutapSub === 'FW24' ? 'active' : ''}`}
                  onMouseEnter={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: 'FW24' }))}
                  onMouseLeave={() => setDropdowns((prev) => ({ ...prev, bosuutapSub: null }))}
                  onClick={() => toggleSubmenu('FW24')}
                >
                  <Link to="#bosuutap-sub2">FW24</Link>
                  {dropdowns.bosuutapSub === 'FW24' && (
                    <ul className="dropdown-menu-2">
                      <li>
                        <Link to="#bosuutap-sub2">Nam</Link>
                      </li>
                      <li>
                        <Link to="#bosuutap-sub3">Nữ</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          <li
            className={`dropdown ${dropdowns.cuahang ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter('cuahang')}
            onMouseLeave={handleMouseLeave}
            onClick={() => toggleDropdown('cuahang')}
          >
            <Link to="/pages/he-thong-cua-hang-v-sixtyfour">CỬA HÀNG</Link>
          </li>
        </ul>
      </nav>

      <div className="icons" ref={searchRef}>
        <div className={`search-container ${showSearch ? 'active' : ''}`}>
          <button className="search-toggle" onClick={handleSearchToggle} aria-label="Toggle search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <div className="search-input-wrapper">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                id="search-input"
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-submit">
                Tìm
              </button>
           
            </form>
          </div>
        </div>
       
         {user == null ? (<Link to="/account/login" className="icon" aria-label="User account">
          <FontAwesomeIcon icon={faUser} />
        </Link>) : <Link to="/account" className="icon" aria-label="User account">
          <FontAwesomeIcon icon={faUser} />
        </Link> }

        <Link to="/wishlist" className="icon" aria-label="Wishlist">
          <FontAwesomeIcon icon={faHeart} />
          <span>0</span>
        </Link>
        <Link to="/cart" className="icon" aria-label="Cart">
          <FontAwesomeIcon icon={faCartShopping} />
          {getTotalCartItems() > 0 && (
            <span>{getTotalCartItems()} </span>
          )}
        </Link>
      </div>

      <button className="far-bar-icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
        <FontAwesomeIcon icon={faBars} />
      </button>

      </>
      )}
    </header>
  );
};

export default Header;