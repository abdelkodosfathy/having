import React, { useContext, useRef, useState } from 'react'
import ReactSlider from "react-slider";
import './SideBar.css';
import Combobox from '../Combobox/Combobox';
import Button from './Button';
import { DataContext } from '../Context';
const SideBar = ({state,onClose, onFilterChange, maxPrice = 1000, minPrice = 0, media="big"}) => {

  const comboRef = useRef(null);
  const minRef = useRef(null);
  const maxRef = useRef(null);
  
  const darkMode = useContext(DataContext).darkMode;
  const [property,setProperty] = useState(null);
  const [rooms,setRooms] = useState(null);

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
  function handleFilters(
    city = null,
    type = null,
    bedrooms = null,
    bathrooms = null,
    minPrice = null,
    maxPrice = null
  ){
    if(city !== null){
      if(!(city.trim() === "")){
        city = city.toLowerCase();
      }
    }
    
    if(bedrooms === "4+"){
      bedrooms = 4;
    }
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
    <div  className={`bluering ${state && "show"}`}>
    <div className={`side-bar ${darkMode? 'dark' : ''} ${media}`}>
      <button className='sidebard-close' onClick={onClose}>x</button>
      <div className="head">        
        {
          media === "big" && <h1>Filters</h1>
        }
        {/* <p>Reset</p> */}
      </div>
      <div className="property-type">
        {
          media === "big" && <h3>Proprety type</h3>
        }
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
        <Combobox ref={comboRef}/>
      </div>
      <div className="Price-range">
        <h3>Price Range</h3>
        <div className="priceSlider">
          <div className="price-box">
              <div className="price">
                <p>min</p>
                <p ref={minRef}>{minPrice}</p>
                </div>
              <div className="price">
                <p>max</p>
                <p ref={maxRef}>{maxPrice}</p>
                </div>
            </div>
          <ReactSlider
            key={"aa"}
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[minPrice, maxPrice]}
            // value={5}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => <div {...props}></div>}
            pearling
            minDistance={5}
            onChange={(value, index) => handlePriceChange(value, index)}/>

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
      {/*the comment*/}
      <div className="apply-filters">
      <button onClick={() =>{
          handleFilters(null, null, null, null, null, null)
          onClose();
        }}>
          Reset
        </button>
        <button onClick={() =>{
          console.log(comboRef.current.value);
          handleFilters(comboRef.current.value, property, rooms, null, null, null)
          onClose();
        }}>
          Apply
        </button>

      </div>
    </div>
    </div>
  )
}

export default SideBar
{/* <div className="rooms-features">
  <ul>
    <li>
      <label>
        <input type="checkbox" /> feature
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" /> feature
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" /> feature
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" /> feature
      </label>
    </li>
  </ul>
</div> */}