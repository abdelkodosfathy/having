import React, { useContext, useRef, useState } from 'react'
import ReactSlider from "react-slider";
import './SideBar.css';
import Combobox from '../Combobox/Combobox';
import Button from './Button';
import { DataContext } from '../Context';
const SideBar = ({onFilterChange }) => {

  const minRef = useRef(null);
  const maxRef = useRef(null);
  
  const darkMode = useContext(DataContext).darkMode;
  const [property,setProperty] = useState('house');
  const [rooms,setRooms] = useState('1');

  function propertyType(prop){
    setProperty(prop);
  }

  function handlePriceChange(value, index){
    // console.log(`onChange: ${JSON.stringify({ value, index })}`);
    const priceData = {
      value,
      index
    }
    minRef.current.innerText = priceData.value[0];
    maxRef.current.innerText = priceData.value[1];
  }
  function handleFilters(city = null,
    type = null,
    bedrooms = 0,
    bathrooms = 0,
    minPrice = 0,
    maxPrice = 0
  ){
    const filters = {
      city: city,
      type: type,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      minPrice: minPrice,
      maxPrice: maxPrice
    };
    console.log(filters);
    onFilterChange(filters)
  }
  return (
    <div className={`side-bar ${darkMode? 'dark' : ''}`}>
      <div className="head">
        <h1>Filters</h1>
        <p>Reset</p>
      </div>
      <div className="property-type">
        <h3>Proprety type</h3>
        <div className="property-type-btns">
          <Button onClicked={() => propertyType("house")} proprety="house" isActivated={property}>
            <i className="fa-solid fa-house"></i>
          </Button>
          <Button onClicked={() => propertyType("appartment")} proprety="appartment" isActivated={property}>
            <i className="fa-solid fa-building"></i>
          </Button>
          <Button onClicked={() => propertyType("villa")} proprety="villa" isActivated={property}>
            <i className="fa-solid fa-briefcase"></i>
          </Button>
          <Button onClicked={() => propertyType("land plat")} proprety="land plat" isActivated={property}>
            <i className="fa-solid fa-calendar-week"></i>
          </Button>
        </div>
      </div>
      <div className="location">
        <h3>Location</h3>
        <Combobox/>
      </div>
      <div className="Price-range">
        <h3>Price Range</h3>
        {/* <input type="range" name="" id="" /> */}
        <div className="priceSlider">

          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[0, 100]}
            // value={5}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => <div {...props}></div>}
            pearling
            minDistance={5}
            onChange={(value, index) => handlePriceChange(value, index)}/>
        </div>
        <div className="price-box">
          <div className="price">
            <p>min</p>
            <p ref={minRef}>0</p>
            {/* <input ref={minRef} defaultValue={0} type='number' min={5}/> */}
            </div>
          <div className="price">
            <p>max</p>
            <p ref={maxRef}>100</p>
            {/* <input ref={maxRef} defaultValue={100} type='number' max={100}/> */}
            </div>
        </div>
      </div>
      <div className="side-bar-rooms">
      <h3>Rooms</h3>
      <div className="rooms-btns">
      <Button proprety="1" onClicked={() => setRooms("1")} isActivated={rooms}></Button>
      <Button proprety="2" onClicked={() => setRooms("2")} isActivated={rooms}></Button>
      <Button proprety="3" onClicked={() => setRooms("3")} isActivated={rooms}></Button>
      <Button proprety="4+" onClicked={() => setRooms("4+")} isActivated={rooms}></Button>
      </div>
      </div>
      <div className="rooms-features">
        <ul>
          <li>
            <input type="checkbox" /> feature
          </li>
          <li>
            <input type="checkbox" /> feature
          </li>
          <li>
            <input type="checkbox" /> feature
          </li>
          <li>
            <input type="checkbox" /> feature
          </li>
        </ul>
      </div>
      <div className="apply-filters">
        <button onClick={() => handleFilters(null, null, rooms, null, 100000, 3000000)}>
          Apply
        </button>
      </div>
    </div>
  )
}

export default SideBar