import React, { useRef, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../Context';
import { useContext } from 'react';
import './PropertyForm.css';
import InputMap from '../InputMap/InputMap';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { forwardRef } from 'react';

// const Tab1 = ({ formData, handleChange, isUpdate, ref}) => {
//   console.log("tap1: ",formData);
//   return (
//   <div className='tab-1'>
//     <label>
//       Address:
//       <input
//         required
//         type="text"
//         name="address"
//         defaultValue={isUpdate ? isUpdate.address : formData.address}
//         onChange={handleChange}
//         disabled={isUpdate} // Disable input if isUpdate is provided
//       />
//     </label>
//     <label>
//       Location:
//       <input
//         required
//         type="text"
//         name="location"
//         placeholder='u can use map to choose the location'
//         defaultValue={isUpdate ? isUpdate.location : formData.location}
//         value={position}
//         onChange={handleChange}
//         disabled={isUpdate} // Disable input if isUpdate is provided
//       />
//     </label>
//     <label>
//       City:
//       <select
//         required
//         name="city"
//         defaultValue={isUpdate ? isUpdate.city : formData.city}
//         onChange={handleChange}
//         disabled={isUpdate} // Disable input if isUpdate is provided
//       >
//         <option value="Cairo">Cairo</option>
//         <option value="Alexandria">Alexandria</option>
//         <option value="Giza">Giza</option>
//         <option value="Luxor">Luxor</option>
//         <option value="Aswan">Aswan</option>
//       </select>
//     </label>
//   </div>)
// };
const Tab1 = ({ formData, handleChange, isUpdate, locationRef }) => {
  // console.log("tap1: ", formData);
  return (
    <div className='tab-1'>
      <label>
        Address:
        <input
          required
          type="text"
          name="address"
          defaultValue={isUpdate ? isUpdate.address : formData.address}
          onChange={handleChange}
          disabled={isUpdate} // Disable input if isUpdate is provided
        />
      </label>
      <label>
        Location:
        <input
          required
          type="text"
          name="location"
          placeholder='You can use the map to choose the location'
          defaultValue={isUpdate ? isUpdate.location : formData.location}
          ref={locationRef}
          onChange={handleChange}
          disabled={isUpdate} // Disable input if isUpdate is provided
        />
      </label>
      <label>
        City:
        <select
          required
          name="city"
          defaultValue={isUpdate ? isUpdate.city : formData.city}
          onChange={handleChange}
          disabled={isUpdate} // Disable input if isUpdate is provided
        >
          <option value="Cairo">Cairo</option>
          <option value="Alexandria">Alexandria</option>
          <option value="Giza">Giza</option>
          <option value="Luxor">Luxor</option>
          <option value="Aswan">Aswan</option>
        </select>
      </label>
    </div>
  );
};

const Tab2 = ({ formData, handleChange, isUpdate }) => {
  const bedRef = useRef(0);
  const bathRef = useRef(0);

  return(

  <div className='tab-2'>
    {/* <label> */}
      Type:
      {/* <select 
        required
        name="type" 
        defaultValue={isUpdate ? isUpdate.type : formData.type}
        onChange={handleChange}
        disabled={isUpdate} // Disable input if isUpdate is provided
      >
        <option value="villa">Villa</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
      </select> */}
      <div className='radio-row'>
        <div className="radio">
          <input type="radio" id="villa" name="type" value="villa" onChange={handleChange} checked={isUpdate ? isUpdate.type === 'villa' : formData.type === 'villa'} disabled={isUpdate} />
          <label htmlFor="villa" className='radio-button'>Villa</label>
        </div>

        <div className="radio">
          <input type="radio" id="appartment" name="type" value="appartment" onChange={handleChange} checked={isUpdate ? isUpdate.type === 'appartment' : formData.type === 'appartment'} disabled={isUpdate} />
          <label htmlFor="appartment" className='radio-button'>Appartment</label>
        </div>

        <div className="radio">
          <input type="radio" id="house" name="type" value="house" onChange={handleChange} checked={isUpdate ? isUpdate.type === 'house' : formData.type === 'house'} disabled={isUpdate} />
          <label htmlFor="house" className='radio-button'>House</label>
        </div>
    </div>
    {/* </label> */}
    <label>
      Size:
      <input 
        type="number" 
        required
        defaultValue={isUpdate ? isUpdate.size : formData.size}
        name="size" 
        onChange={handleChange}
        disabled={isUpdate} // Disable input if isUpdate is provided
      />
    </label>
    <div className='rooms'>
      Bedrooms:
      <input 
        ref={bedRef}
        type="number" 
        defaultValue={isUpdate ? isUpdate.bedrooms : formData.bedrooms}
        required
        name="bedrooms" 
        onChange={handleChange}
        disabled={isUpdate} // Disable input if isUpdate is provided
      />
      <div className="rooms-btns">
        <button className='rooms-btn' onClick={(e) => {
          e.preventDefault();
          bedRef.current.value = 1
          formData.bedrooms = 1
        }}>1</button>
        <button className='rooms-btn' onClick={(e) => {
          e.preventDefault();
          bedRef.current.value = 2
          formData.bedrooms = 2
          
        }}>2</button>
        <button className='rooms-btn' onClick={(e) => {
          e.preventDefault();
          bedRef.current.value = 3
          formData.bedrooms = 3
          }}>3</button>
      </div>

    </div>
    <div className='rooms'>
      Bathrooms:
      <input 
        ref={bathRef}
        type="number" 
        defaultValue={isUpdate ? isUpdate.bathrooms : formData.bathrooms}
        required
        name="bathrooms" 
        onChange={handleChange}
        disabled={isUpdate} // Disable input if isUpdate is provided
      />
      <div className="rooms-btns">
        <button className='rooms-btn' onClick={(e) => {
          e.preventDefault();
          bathRef.current.value = 1
          formData.bathrooms = 1
        }}>1</button>
        <button className='rooms-btn' onClick={(e) => {
          e.preventDefault();
          bathRef.current.value = 2
          formData.bathrooms = 2
          
        }}>2</button>
        <button className='rooms-btn' onClick={(e) => {
          e.preventDefault();
          bathRef.current.value = 3
          formData.bathrooms = 3
          }}>3</button>
      </div>

    </div>
  </div>
  );
};

const Tab3 = ({ formData, handleChange, handleImageChange, isUpdate }) => (
  <div className='tab-3'>
    <label>
      Description:
      <textarea
        name="description"
        defaultValue={isUpdate ? isUpdate.description : formData.description}
        onChange={handleChange}
        style={{ resize: 'vertical' }}
        // disabled={!isUpdate} // Disable input if isUpdate is provided
      />
    </label>
    <label>
      Images:
      <input type="file" 
        required
        name="images" 
        multiple 
        onChange={handleImageChange}
        disabled={isUpdate} // Disable input if isUpdate is provided
      />
    </label>
    <label>
      Price:
      <input type="number" 
        required
        defaultValue={isUpdate ? isUpdate.price : formData.price}
        name="price" 
        onChange={handleChange}
      />
    </label>
    <div className='radio-row'>
      <div className="radio">
        <input 
          type="radio" 
          id='rent'
          name="action" 
          value="1"
          onChange={handleChange}
          disabled={isUpdate} // Disable input if isUpdate is provided
          />
        <label className='radio-button' htmlFor="rent">Rent</label>
      </div>
      <div className="radio">
        <input 
          type="radio" 
          id='sale'
          name="action" 
          value="0" 
          // defaultChecked="checked"
          onChange={handleChange}
          disabled={isUpdate} // Disable input if isUpdate is provided
        />
        <label className='radio-button' htmlFor="sale">Sale</label>
      </div>
    </div>
  </div>
);
const Tab4 = ({ formData, handleChange, isUpdate }) => {

  const additionalFeaturesAr = [
    "ناصية",
    "دوبلكس",
    "إطلالة بحرية",
    "موقف سيارات خاص",
    "حديقة خاصة",
    "بلكونة أو تراس",
    "مخزن أو غرفة تخزين",
    "أمن وحراسة",
    "مصعد",
    "مسبح خاص",
    "صالة رياضية",
    "منطقة لعب للأطفال",
    "غرفة خدم أو غرفة غسيل"
  ];
  const additionalFeaturesEn = [
    "Corner Lot",
    "Duplex",
    "Sea View",
    "Private Parking",
    "Private Garden",
    "Balcony or Terrace",
    "Storage Room",
    "Security and Surveillance",
    "Elevator",
    "Private Pool",
    "Gym",
    "Children's Play Area",
    "Maid's Room or Laundry Room"
  ];
  return <div className="tab-4">
    {/* <h2 className='ar'>:مزايا اضافية</h2> */}
    <h2 className='en'>Additional  Features</h2>
    <ul>
      {additionalFeaturesEn.map((e, i)=> {
        return <li key={i}>
          <input type="checkbox" id={e} value={e}/>
          <label htmlFor={e}>{e}</label>
          </li>
      })}
    </ul>
    </div>
}

const PropertyForm  = ({ isUpdate, onAddProp}) => {
  const classes = ["one", "two", "three", "four"];
  const loginData = useContext(DataContext).loginState;
  const token = loginData.token;
  const locationRef = useRef();
  const [formData, setFormData] = useState({
    address: '',
    location: '',
    city: 'cairo',

    type: '',
    size: 0,
    bedrooms: 0,
    bathrooms: 0,

    description: '',
    image: [],
    price: 0,
    action: 0,
    
    feature1: 0,
    feature2: 0,
    feature3: 0,
    feature4: 0,
    feature5: 0,
    feature6: 0,
    feature7: 0,
    feature8: 1,
    feature9: 0,
    feature10: 1,
  });

  const [activeTab, setActiveTab] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const handleNext = (e) => {
  //   e.preventDefault();
  //   setActiveTab(activeTab + 1);
  // };

  const handleNext = (e) => {
    e.preventDefault();
    if (activeTab === 1) {
      if (!formData.address || !formData.location || !formData.city) {
        setValidationError('Please fill in all fields in Step 1.');
        return;
      }
    } else if (activeTab === 2) {
      if (!formData.type || !formData.size || !formData.bedrooms || !formData.bathrooms) {
        setValidationError('Please fill in all fields in Step 2.');
        return;
      }
    } else if (activeTab === 3) {
      if (!formData.description || !formData.price || formData.image.length === 0) {
        setValidationError('Please fill in all fields in Step 3.');
        return;
      }
    }
    setValidationError('');
    setActiveTab(activeTab + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setActiveTab(activeTab - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("form: ", formData);
    // console.log("token: ", token);
    // console.log();
    if(isUpdate){
      const updateData = {
        price: formData.price,
        description: formData.description
      }
      axios.patch('https://app.having.market/api/tasks/'+isUpdate.id, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      });
    } else {
      console.log("axios: ", formData);
      axios.post('https://app.having.market/api/tasks', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response);
        if(response.status === 200){
          console.log("added");
          onAddProp();
        }
      }).catch(error => {
        console.error(error);
      });
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      image: files
    });
  };

  function changeLocation(e){
    const mapLink = `https://www.google.com/maps?q=${e.lat},${e.lng}`;
    console.log(mapLink);
    setFormData({
      ...formData,
      location: mapLink,
    });
    if (locationRef.current) {
      locationRef.current.value = mapLink;
    }
  }

  function handleFindeLocation () {
    console.log("finde location");
  }
  return (
    <>
    <form className="property-form" onSubmit={handleSubmit}>
      <div className={`steps-row ${classes[activeTab - 1]}`}>
        <div id="progress" className={`${classes[activeTab - 1]}`}></div>
        <div className="col" style={activeTab >= 1 ? {color: "white"} : null}>step 1</div>
        <div className="col" style={activeTab >= 2 ? {color: "white"} : null}>step 2</div>
        <div className="col" style={activeTab >= 3 ? {color: "white"} : null}>step 3</div>
        <div className="col" style={activeTab >= 4 ? {color: "white"} : null}>step 4</div>
      </div>

      {
        isLoading ? <LoadingCircle/> :
      <>
      <div className={`form-tabs ${classes[activeTab - 1]}`}>
        <Tab1
          formData={formData}
          handleChange={handleChange}
          isUpdate={isUpdate}
          locationRef={locationRef}
         />
        <Tab2
         formData={formData}
         handleChange={handleChange}
         isUpdate={isUpdate} />
        <Tab3
         formData={formData}
         handleChange={handleChange}
         handleImageChange={handleImageChange}
         isUpdate={isUpdate} />
        <Tab4
         formData={formData}
         handleChange={handleChange}
         handleImageChange={handleImageChange}
         isUpdate={isUpdate} />
      </div>
      {validationError && <div className="error-message">{validationError}</div>}
      <div className="button-row">
        {activeTab > 1 && <button onClick={(e) => handlePrev(e)} id='prev'>Previous</button>}
        {activeTab < 4 && <button onClick={(e) => handleNext(e)} id='next'>Next</button>}
        {activeTab === 4 && <button type="submit">Submit</button>}
      </div>
      </>
      }
    </form>
      {
        activeTab === 1 && 
        <>
          {/* <div className="popup-bar">
            <button onClick={handleFindeLocation}>
              <i className="fa-solid fa-map-location-dot"></i>
            </button>
            <LoadingCircle></LoadingCircle>
          </div> */}

          <InputMap onLocationChange={changeLocation} />
        </>
      }
      </>
  );
}

export default PropertyForm;