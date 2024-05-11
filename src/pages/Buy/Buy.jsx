import React, { useRef, useState,useEffect } from 'react'
import './Buy.css'
import Card from '../../components/Card/Card'
import SideBar from '../../components/SideBar/SideBar'
import View from '../../components/View/View'
import CardsViewer from '../../components/CardsViewer/CardsViewer'
const Buy = () => {
  // const [selectedCard, setSelectedCard] = useState();
  // const [fetched, setFetched] = useState(false);
  // const viewRef = useRef(null);

  // const [cardsData, setCardsData] = useState([]);
  // useEffect(() => {
  //   fetch('https://app.having.market/api/sell')
  //     .then(response => response.json())
  //     .then(sellData => {
  //       setFetched(true)
  //       setCardsData(sellData[0]);
  //     })
  //     .catch(error => console.error('Error fetching sell data:', error));
  //   }, []);

  //   useEffect(()=>{
  //   if(fetched){
  //   handelCardSelection(cardsData[0]);
  //     }
  //   },[cardsData])  
    
  //   function handelCardSelection(cardData){
  //     setSelectedCard(cardData.id)
  //     viewRef.current = cardData;
  //   }

    const [filterData, setFilterData] = useState({
      city: null,
      type: null,
    });

    // Function to handle data changes from the SideBar
    const handleFilterChange = (newData) => {
      setFilterData(newData);
    };


  return (
    <div className='buy'>
    <SideBar onFilterChange={handleFilterChange}/>
    <CardsViewer action={"sell"} filterData={filterData}/>
    </div>
  )
}

export default Buy