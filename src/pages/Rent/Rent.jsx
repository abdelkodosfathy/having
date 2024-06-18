import React, { useState } from 'react'
import './Rent.css'
import SideBar from '../../components/SideBar/SideBar'
import CardsViewer from '../../components/CardsViewer/CardsViewer'
const Rent = () => {  
  const [sidebarState, setSidebarState] = useState(false);
  const [filterData, setFilterData] = useState({
  city: null,
  type: null,
  bedrooms: null,
  bathrooms: null,
  minPrice: null,
  maxPrice: null
  });

  // Function to handle data changes from the SideBar
  const handleFilterChange = (newData) => {
    setFilterData(newData);
  };

  function handleSidebar() {
    setSidebarState(prev => !prev);
  }
return (
  <div className='buy'>
  <SideBar state={sidebarState} onClose={handleSidebar} onFilterChange={handleFilterChange}/>
  <CardsViewer onSidebarStateClicked={handleSidebar} action={"rent"} filterData={filterData}/>
  </div>
)
}

export default Rent