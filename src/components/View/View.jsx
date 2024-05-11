import './View.css'
import profile from '../../assets/profile.jpg'

import ImagesSlider from './imagesSlider/ImagesSlider'
import { forwardRef, useContext } from 'react'
import { DataContext } from '../Context'

const View = forwardRef(({...props}, ref) => {
  const darkMode = useContext(DataContext).darkMode;
  const data = ref.current;
  return (
    <div className={`my-view ${darkMode&& "dark"}`} onClick={()=>{
    }}>
      {data&&
      <>
      <div className="dep-images">
      {data.img[0] && <ImagesSlider images={data.img}/>}
      </div>
      <div className="dep-heading">
        <h3> <i className="fa-solid fa-map-location-dot"></i> {data.address}</h3>
        <h5>{data.type}</h5>
      </div>
      <div className="prices">
        <p><span>$3200</span>/month</p>
      </div>
      <div className="features">
      {data.bedrooms? <span><i className="fa-solid fa-bed"></i> {data.bedrooms}</span> : null}
          {data.bathrooms? <span><i className="fa-solid fa-bath"></i> {data.bathrooms}</span> : null}
          {data.size? <span><i className="fa-solid fa-ruler-combined"></i> {data.size}</span> : null}
      </div>
      <div className="description">
        <h1>Properties details</h1>
      </div>
      <p>
      {data.description}
      </p>
      <div className="user-info">
        <div className="user-img">
          <img src={profile} alt="" />
        </div>
        <div className="user-data">
          <h3 className='owner-name'>{data.user.name}</h3>
          <p>{data.user.email}</p>
        </div>
        <div className="user-contact-btn">
          <button>Contact</button>
        </div>
      </div>
      </>
      }
    </div>
    )
})

export default View