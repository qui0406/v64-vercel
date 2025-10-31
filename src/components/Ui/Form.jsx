import React, { useState } from 'react';

const FilterForm = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter(item => item !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected filters:', selectedFilters);
    // Add your submission logic here (e.g., API call or state update)
  };

  // Constant array of filter items
  const filterItems = [
    { id: 'data-brand-p1', vendor: 'crop-jacket', filter: 'crop-jacket', label: 'CROP JACKET', value: '(vendor:product =CROP JACKET)' },
    { id: 'data-brand-p2', vendor: 'crop-hoodie-jacket', filter: 'crop-hoodie-jacket', label: 'CROP HOODIE JACKET', value: '(vendor:product =CROP HOODIE JACKET)' },
    { id: 'data-brand-p3', vendor: 'wide-leg-jeans', filter: 'wide-leg-jeans', label: 'WIDE LEG JEANS', value: '(vendor:product =WIDE LEG JEANS)' },
    { id: 'data-brand-p4', vendor: 'boot-cut-jeans', filter: 'boot-cut-jeans', label: 'BOOT CUT JEANS', value: '(vendor:product =BOOT CUT JEANS)' },
    { id: 'data-brand-p5', vendor: 'straight-shorts', filter: 'straight-shorts', label: 'STRAIGHT SHORTS', value: '(vendor:product =STRAIGHT SHORTS)' },
    { id: 'data-brand-p6', vendor: 'kaki-mini-skirt', filter: 'kaki-mini-skirt', label: 'KAKI MINI SKIRT', value: '(vendor:product =KAKI MINI SKIRT)' },
    { id: 'data-brand-p7', vendor: 'mini-skirt', filter: 'mini-skirt', label: 'MINI SKIRT', value: '(vendor:product =MINI SKIRT)' },
    { id: 'data-brand-p8', vendor: 'pleated-mini-skirt', filter: 'pleated-mini-skirt', label: 'PLEATED MINI SKIRT', value: '(vendor:product =PLEATED MINI SKIRT)' },
    { id: 'data-brand-p9', vendor: 'flared-jeans', filter: 'flared-jeans', label: 'FLARED JEANS', value: '(vendor:product =FLARED JEANS)' },
    { id: 'data-brand-p10', vendor: 'gilet-jacket', filter: 'gilet-jacket', label: 'GILET JACKET', value: '(vendor:product =GILET JACKET)' },
    { id: 'data-brand-p11', vendor: 'shirt-dress', filter: 'shirt-dress', label: 'SHIRT DRESS', value: '(vendor:product =SHIRT DRESS)' },
    { id: 'data-brand-p12', vendor: 'shirt-dress-oversize', filter: 'shirt-dress-oversize', label: 'SHIRT DRESS OVERSIZE', value: '(vendor:product =SHIRT DRESS OVERSIZE)' },
    { id: 'data-brand-p13', vendor: 'polo-crop', filter: 'polo-crop', label: 'POLO CROP', value: '(vendor:product =POLO CROP)' },
    { id: 'data-brand-p14', vendor: 'crop-shirt', filter: 'crop-shirt', label: 'CROP SHIRT', value: '(vendor:product =CROP SHIRT)' },
    { id: 'data-brand-p15', vendor: 'maxi-dress', filter: 'maxi-dress', label: 'MAXI DRESS', value: '(vendor:product =MAXI DRESS)' },
    { id: 'data-brand-p16', vendor: 'baggy-jeans', filter: 'baggy-jeans', label: 'BAGGY JEANS', value: '(vendor:product =BAGGY JEANS)' },
    { id: 'data-brand-p17', vendor: 'long-skirt', filter: 'long-skirt', label: 'LONG SKIRT', value: '(vendor:product =LONG SKIRT)' },
    { id: 'data-brand-p18', vendor: 'laser-shorts', filter: 'laser-shorts', label: 'LASER SHORTS', value: '(vendor:product =LASER SHORTS)' },
    { id: 'data-brand-p19', vendor: 'midi-skirt', filter: 'midi-skirt', label: 'MIDI SKIRT', value: '(vendor:product =MIDI SKIRT)' },
    { id: 'data-brand-p20', vendor: 'croptop-blouse', filter: 'croptop-blouse', label: 'CROPTOP BLOUSE', value: '(vendor:product =CROPTOP BLOUSE)' },
    { id: 'data-brand-p21', vendor: 'slim-top-blouse', filter: 'slim-top-blouse', label: 'SLIM-TOP BLOUSE', value: '(vendor:product =SLIM-TOP BLOUSE)' },
    { id: 'data-brand-p22', vendor: 'oversize-jacket', filter: 'oversize-jacket', label: 'OVERSIZE JACKET', value: '(vendor:product =OVERSIZE JACKET)' },
    { id: 'data-brand-p23', vendor: 'slim-jacket', filter: 'slim-jacket', label: 'SLIM JACKET', value: '(vendor:product =SLIM JACKET)' },
    { id: 'data-brand-p24', vendor: 'regular-jacket', filter: 'regular-jacket', label: 'REGULAR JACKET', value: '(vendor:product =REGULAR JACKET)' },
    { id: 'data-brand-p25', vendor: 'oversize-shirt', filter: 'oversize-shirt', label: 'OVERSIZE SHIRT', value: '(vendor:product =OVERSIZE SHIRT)' },
    { id: 'data-brand-p26', vendor: 'oversize-blouse', filter: 'oversize-blouse', label: 'OVERSIZE BLOUSE', value: '(vendor:product =OVERSIZE BLOUSE)' },
    { id: 'data-brand-p27', vendor: 'slim-shirt', filter: 'slim-shirt', label: 'SLIM SHIRT', value: '(vendor:product =SLIM SHIRT)' },
    { id: 'data-brand-p28', vendor: 'regular-shirt', filter: 'regular-shirt', label: 'REGULAR SHIRT', value: '(vendor:product =REGULAR SHIRT)' },
    { id: 'data-brand-p29', vendor: 'pencel-skirt', filter: 'pencel-skirt', label: 'PENCEL SKIRT', value: '(vendor:product =PENCEL SKIRT)' },
    { id: 'data-brand-p30', vendor: 'slim-t-shirt', filter: 'slim-t-shirt', label: 'SLIM T-SHIRT', value: '(vendor:product =SLIM T-SHIRT)' },
    { id: 'data-brand-p31', vendor: 'a-line-skirt', filter: 'a-line-skirt', label: 'A-LINE SKIRT', value: '(vendor:product =A-LINE SKIRT)' },
    { id: 'data-brand-p32', vendor: 'flared-skirt', filter: 'flared-skirt', label: 'FLARED SKIRT', value: '(vendor:product =FLARED SKIRT)' },
    { id: 'data-brand-p33', vendor: 'regular-dress', filter: 'regular-dress', label: 'REGULAR DRESS', value: '(vendor:product =REGULAR DRESS)' },
    { id: 'data-brand-p34', vendor: 'culottes', filter: 'culottes', label: 'CULOTTES', value: '(vendor:product =CULOTTES)' },
    { id: 'data-brand-p35', vendor: 'mom-jeans', filter: 'mom-jeans', label: 'MOM JEANS', value: '(vendor:product =MOM JEANS)' },
    { id: 'data-brand-p36', vendor: 'skinny-jeans', filter: 'skinny-jeans', label: 'SKINNY JEANS', value: '(vendor:product =SKINNY JEANS)' },
    { id: 'data-brand-p37', vendor: 'straight-jeans', filter: 'straight-jeans', label: 'STRAIGHT JEANS', value: '(vendor:product =STRAIGHT JEANS)' },
    { id: 'data-brand-p38', vendor: 'slim-jeans', filter: 'slim-jeans', label: 'SLIM JEANS', value: '(vendor:product =SLIM JEANS)' },
    { id: 'data-brand-p39', vendor: 'wide-leg-jeans', filter: 'wide-leg-jeans', label: 'WIDE-LEG JEANS', value: '(vendor:product =WIDE-LEG JEANS)' },
    { id: 'data-brand-p40', vendor: 'relax-jeans', filter: 'relax-jeans', label: 'RELAX JEANS', value: '(vendor:product =RELAX JEANS)' },
    { id: 'data-brand-p41', vendor: 'boyfrend-jeans', filter: 'boyfrend-jeans', label: 'BOYFREND JEANS', value: '(vendor:product =BOYFREND JEANS)' },
    { id: 'data-brand-p42', vendor: 'shorts', filter: 'shorts', label: 'SHORTS', value: '(vendor:product =SHORTS)' },
    { id: 'data-brand-p43', vendor: 'capri-jeans', filter: 'capri-jeans', label: 'CAPRI JEANS', value: '(vendor:product =CAPRI JEANS)' },
    { id: 'data-brand-p44', vendor: 'a-line-shorts', filter: 'a-line-shorts', label: 'A-LINE SHORTS', value: '(vendor:product =A-LINE SHORTS)' },
    { id: 'data-brand-p45', vendor: 'boyfrend-crop-jeans', filter: 'boyfrend-crop-jeans', label: 'BOYFREND CROP JEANS', value: '(vendor:product =BOYFREND CROP JEANS)' },
    { id: 'data-brand-p46', vendor: 'flared-shorts', filter: 'flared-shorts', label: 'FLARED SHORTS', value: '(vendor:product =FLARED SHORTS)' },
    { id: 'data-brand-p47', vendor: 'flared-crop-jeans', filter: 'flared-crop-jeans', label: 'FLARED CROP JEANS', value: '(vendor:product =FLARED CROP JEANS)' },
    { id: 'data-brand-p48', vendor: 'jumper-dress', filter: 'jumper-dress', label: 'JUMPER DRESS', value: '(vendor:product =JUMPER DRESS)' },
    { id: 'data-brand-p49', vendor: 'overalls', filter: 'overalls', label: 'OVERALLS', value: '(vendor:product =OVERALLS)' },
    { id: 'data-brand-p50', vendor: 'short-overalls', filter: 'short-overalls', label: 'SHORT OVERALLS', value: '(vendor:product =SHORT OVERALLS)' },
    { id: 'data-brand-p51', vendor: 'maxi-skirt', filter: 'maxi-skirt', label: 'MAXI SKIRT', value: '(vendor:product =MAXI SKIRT)' },
    { id: 'data-brand-p52', vendor: 'fabric-shirt', filter: 'fabric-shirt', label: 'FABRIC SHIRT', value: '(vendor:product =FABRIC SHIRT)' },
    { id: 'data-brand-p53', vendor: 'body-dress', filter: 'body-dress', label: 'BODY DRESS', value: '(vendor:product =BODY DRESS)' },
    { id: 'data-brand-p54', vendor: 'mini-dress', filter: 'mini-dress', label: 'MINI DRESS', value: '(vendor:product =MINI DRESS)' },
    { id: 'data-brand-p55', vendor: 'workwear-shorts', filter: 'workwear-shorts', label: 'WORKWEAR SHORTS', value: '(vendor:product =WORKWEAR SHORTS)' },
    { id: 'data-brand-p56', vendor: 'bra-top', filter: 'bra-top', label: 'BRA TOP', value: '(vendor:product =BRA TOP)' },
    { id: 'data-brand-p57', vendor: 'mini-shorts', filter: 'mini-shorts', label: 'MINI SHORTS', value: '(vendor:product =MINI SHORTS)' },
    { id: 'data-brand-p58', vendor: 'pleated-shorts', filter: 'pleated-shorts', label: 'PLEATED SHORTS', value: '(vendor:product =PLEATED SHORTS)' },
    { id: 'data-brand-p59', vendor: 'corset-top', filter: 'corset-top', label: 'CORSET TOP', value: '(vendor:product =CORSET TOP)' },
    { id: 'data-brand-p60', vendor: 'danton-shirt', filter: 'danton-shirt', label: 'DANTON SHIRT', value: '(vendor:product =DANTON SHIRT)' },
    { id: 'data-brand-p61', vendor: 'pull-on-shorts', filter: 'pull-on-shorts', label: 'PULL-ON SHORTS', value: '(vendor:product =PULL-ON SHORTS)' },
    { id: 'data-brand-p62', vendor: 'flaired-jeans', filter: 'flaired-jeans', label: 'FLAIRED JEANS', value: '(vendor:product =FLAIRED JEANS)' },
  ];

  return (
    <div className="filter-form">
      <h2 className="form-title">Lọc Sản Phẩm</h2>
      <form onSubmit={handleSubmit}>
        <ul className="check-box-list scrollbar">
          {filterItems.map((item, index) => (
            <li key={item.id}>
              <label htmlFor={item.id} data-vendor={item.vendor} data-filter={item.filter} className={item.filter}>
                {item.label}
                <input
                  type="checkbox"
                  id={item.id}
                  name="brand-filter"
                  value={item.value}
                  onChange={handleCheckboxChange}
                />
                <span className="cust-check"></span>
              </label>
            </li>
          ))}
        </ul>
        <button type="submit" className="submit-button">Áp Dụng Lọc</button>
      </form>
    </div>
  );
};

export default FilterForm;