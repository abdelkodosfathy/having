import './View.css'
import profile from '../../assets/profile.jpg'

import ImagesSlider from './imagesSlider/ImagesSlider'
import { forwardRef, useContext, useState } from 'react'
import { DataContext } from '../Context'

const View = forwardRef(({...props}, ref) => {
  const darkMode = useContext(DataContext).darkMode;
  const data = ref.current;
  const [ showPhoneNumber, setShowPhoneNumber] = useState(false)
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Phone number copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };
  return (
    <div key="card-view" className={`my-view ${darkMode&& "dark"}`} onClick={()=>{
    }}>
      {data&&
      <>
      <div className="dep-images">
      {data.img[0] && <ImagesSlider images={data.img}/>}
      </div>
      <div className="dep-details">
      <div className="dep-heading">
        <h3> <i className="fa-solid fa-map-location-dot"></i> {data.address}</h3>
        <h5>{data.type}</h5>
      </div>
      <div className="prices">
        <h3>price: {data.price} L.E</h3>
      </div>
      <div className="features">
      {data.bedrooms? <span><i className="fa-solid fa-bed"></i> {data.bedrooms}</span> : null}
          {data.bathrooms? <span><i className="fa-solid fa-bath"></i> {data.bathrooms}</span> : null}
          {data.size? <span><i className="fa-solid fa-ruler-combined"></i> {data.size}</span> : null}
      </div>
      <div className="description">
        <h1>Properties details</h1>
      <p>
      {data.description}
      </p>
      </div>
      </div>
      <div className="user-info">
        <div className="user-img">
          <img src={profile} alt="" />
        </div>
        <div className="user-data">
          <h3 className='owner-name'>{data.user.name}</h3>
          <p>{data.user.email}</p>
        </div>
        <div className="user-contact-btn">
        <div className="card-btns">
            {/* <button className='card-phone-btn'>
              <i class="fa-brands fa-whatsapp"></i>
            </button> */}
            <a href={`https://wa.me/${data.user.phone}`} className='card-whatsapp-btn'>
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            {/* <a className='card-phone-btn' onClick={() => setShowPhoneNumber(prev => !prev)}>
              {showPhoneNumber?
              data.user.phone : <i className="fa-solid fa-phone"></i>}
            </a> */}
            <a className='card-phone-btn' onClick={() => {
              setShowPhoneNumber(prev => !prev);
              if (!showPhoneNumber) copyToClipboard(data.user.phone);
            }}>
              {showPhoneNumber ? data.user.phone : <i className="fa-solid fa-phone"></i>}
            </a>
            {/* <button className='card-mail-btn'> */}
            <a className='card-mail-btn' href={`mailto:${data.user.email}}`}>
              <i className="fa-solid fa-envelope"></i>
            </a>
            {/* </button> */}
          </div>
        </div>
      </div>
      </>
      }
    </div>
    )
})

export default View