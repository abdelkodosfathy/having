import React, { useRef, useState } from 'react'
import './imageSlider.css'

function ImagesSlider({images}) {
  const imagesURL = 'https://app.having.market/public/images/'
  const [selectedImg,setSelectedImg] = useState(0);
  // console.log(images);
  const imgContainer = useRef();
  function sliding(){
    
  }
  function handelSelectingImage(imgIndex){
    setSelectedImg(imgIndex);
  }
  return (
    
    <div className="imgs-slider" >
      <div className="imgs-main" >
        <img src={`https://app.having.market/public/images/${images[selectedImg].img_name}`} alt="" width="100%" ref={imgContainer}/>
      </div>
      <div className="view-images">
        {images.map((e,i)=>{
          return <div key={i} className={`view-image ${selectedImg == i && 'selected'}`} onClick={() => handelSelectingImage(i)}>
            <img src={imagesURL + e.img_name} width='100%'/>
          </div>
        })}
      </div>
    </div>

  )
}

export default ImagesSlider