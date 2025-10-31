
import React from 'react';
import "./../styles/AboutShop.css";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AboutShop = () => {
  const stores = [
    {
      name: 'Hệ Cửa Hàng V-SIXTYFOUR TTTM Vincom Hành Mall',
      address: 'Tầng 3, TTTM Vincom Hành Mall, 11 Trường Chinh, Tân Bình, TP. Hồ Chí Minh',
      phone: '0867386564',
      hours: '09:30 - 22:00',
      position: [10.7941, 106.6632]
    },
    {
      name: 'Hệ Cửa Hàng V-SIXTYFOUR Lotte Mart Quận 7',
      address: 'Tầng Trệt, TTTM Lotte Mart 07, 469 Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, TP. Hồ Chí Minh',
      phone: '0336183679',
      hours: '09:30 - 22:00',
      position: [10.7367, 106.7090]
    },
    {
      name: 'Hệ Cửa Hàng V-SIXTYFOUR TTTM Sense City Cần Thơ',
      address: 'Tầng 1, TTTM Sense City Cần Thơ, Số 1 đường Hòa Bình, Tân An, Ninh Kiều, Cần Thơ',
      phone: '0907026564',
      hours: '09:30 - 22:00',
      position: [10.0352, 105.7865]
    }
  ];

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  return (
    <div className="store-page">
      <main className="main-content">
        <h1 className="title">HỆ THỐNG CỬA HÀNG V-SIXTYFOUR</h1>
        <div className="filters">
          <select className="filter-select">
            <option value="">Chọn tỉnh/thành phố</option>
            <option value="hanoi">Hà Nội</option>
            <option value="danang">Đà Nẵng</option>
            <option value="hcm">TP. Hồ Chí Minh</option>
          </select>
          <select className="filter-select">
            <option value="">Chọn quận/huyện</option>
            <option value="thuathienhue">Thừa Thiên Huế</option>
            <option value="sontra">Sơn Trà</option>
            <option value="thanhxuan">Thanh Xuân</option>
          </select>
        </div>
        <div className="store-list">
          {stores.map((store, index) => (
            <div key={index} className="store-item">
              <h3>{store.name}</h3>
              <p>{store.address}</p>
              <p><strong>Hotline:</strong> {store.phone}</p>
              <p><strong>Thời gian hoạt động:</strong> {store.hours}</p>
              <a href="#directions" className="directions-link">Xem chỉ đường</a>
            </div>
          ))}
        </div>
        {/* <div className="map-container">
          {typeof window !== 'undefined' && (
            <MapContainer center={[10.7769, 106.7009]} zoom={11} style={{ height: "400px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {stores && stores.map((store, index) => (
                <Marker key={index} position={store.position} icon={customIcon}>
                  <Popup>
                    <strong>{store.name}</strong><br />
                    {store.address}<br />
                    ☎ {store.phone}<br />
                    Thời gian: {store.hours}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div> */}
        <div className="">
          <h1>Ban do</h1>
        </div>
      </main>
    </div>
  );
};

export default AboutShop;