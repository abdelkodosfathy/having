import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <>
      <h1>ystaa L link m4 tmam</h1>
      <button onClick={() => navigate("/")}>
        Go To Home?        
      </button>
      <div className="col-md-4 map-grid">
        {/* <iframe style={{width: "500px" , height:"500px"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.523464009333!2d31.22043931510788!3d30.044419781867564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458336e15a0d503%3A0xe71d4b67e20a6f97!2sCairo%2C%20Egypt!5e0!3m2!1sen!2sin!4v1646472740323"></iframe> */}
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55199.38449028535!2d31.668467172344442!3d30.152515843351456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1457f7bb78d0c3e7%3A0x55014f7ca63b2a7b!2z2YXYs9iq2LTZgdmJINix2YjZitin2YQg2KfZhNi02LHZiNmC!5e0!3m2!1sar!2seg!4v1715439179229!5m2!1sar!2seg" style={{width:"600px", height:"450px"}} loading="lazy" ></iframe> */}
        <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55199.38449028535!2d31.668467172344442!3d30.152515843351456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1457f7bb78d0c3e7%3A0x55014f7ca63b2a7b!2z2YXYs9iq2LTZgdmJINix2YjZitin2YQg2KfZhNi02LHZiNmC!5e0!3m2!1sar!2seg!4v1715439179229!5m2!1sar!2seg"
      style={{ 
        border: 0, 
        width: "600px",
        height:"450px"
       }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
      </div>
    </>
  )
}

export default NotFound