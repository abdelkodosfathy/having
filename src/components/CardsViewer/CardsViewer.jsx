import React, { useRef, useState, useEffect } from 'react';
import Card from '../Card/Card';
import View from '../View/View';
import axios from 'axios';
import './CardViewer.css';
import '../ShowSidebar/ShowSidebar.css'
const CardsViewer = ({ onSidebarStateClicked, action, onUpdate, token, filterData, children}) => {

  // const initialFilters = {
  //   city: null,
  //   type: null,
  //   // Add other filter properties here (e.g., price, category, etc.)
  // };
  // const [filters, setFilters] = useState(initialFilters); // Add this state variable
    
  const Prices = [];
  const [selectedCard, setSelectedCard] = useState();
  const [fetched, setFetched] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const viewRef = useRef(null);

  useEffect(() => {
    axios({
      headers: {
        'Authorization': `${token && `Bearer ${token}`}`
      },
      method: 'get',
      baseURL: 'https://app.having.market/api/',
      url: action,
    }).then(e => {
      console.log(e);
      setFetched(true);
      setCardsData(e.data[0]);
    }).catch((e) => {
      console.log(e);
    });
  }, [action, fetched]);

  useEffect(() => {
    if (fetched && cardsData[0]) {
      handelCardSelection(cardsData[0]);
    }
  }, [cardsData]);

  function handelCardSelection(cardData) {
    setSelectedCard(cardData.id);
    viewRef.current = cardData;
  }

  function handleUnLoveCard(e) {
    axios({
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'GET'
      ,
      url: `https://app.having.market/api/delfav/${e.id}`,

    }).then(e => {
      console.log(e);
      setFetched(false)
      setCardsData([]);
    }).catch((e)=>{
      console.log(e);
    });
  }

  function handleRemoveCard(e) {
    axios(`https://app.having.market/api/tasks/${e.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'delete',
    }).then(e => {
      console.log(e);
      setFetched(false)
      setCardsData([]);
    }).catch(e => {
      console.log(e);
    })
  }

  function handleUpdate(e) {
    onUpdate(e);
  }

  // Filter the cards based on the selected filter criteria
  const filteredCards = filterData ? cardsData.filter(card => {
    const cityMatch = !filterData.city || card.city === filterData.city;
    const typeMatch = !filterData.type || card.type === filterData.type;
    const priceMatch = (!filterData.minPrice || !filterData.maxPrice )|| (card.price >= filterData.minPrice && card.price <= filterData.maxPrice);
    let bedroomsMatch = !filterData.bedrooms || card.bedrooms === +filterData.bedrooms;
    if(filterData.bedrooms == "4+"){
      bedroomsMatch = card.bedrooms >= 4
    }
    return cityMatch && typeMatch && priceMatch && bedroomsMatch;
  }) : cardsData;
  return (
    <div className='card-viewer' >
      {
        action === "sell" || action === "rent" ? 
        <div className='show-sidebar' key="sidebar-btn">
          <button onClick={onSidebarStateClicked}>Show Filters</button>
        </div>
        : null
      }
      {children}
      <div className='grid-container'>
        {fetched && filteredCards[0] ?
          filteredCards.map((e, index) => {
            Prices.push(e.price);
            return(
              <Card
                action={action}
                data={e}
                key={index}
                onSelect={handelCardSelection}
                selectedIndex={selectedCard}
                onUpdate={() => handleUpdate(e)}
                handleRemoveCard={() => handleRemoveCard(e)}
                handleUnLoveCard={() => handleUnLoveCard(e)}
              />
            )
          }):
          !filteredCards[0] ? <p>there is no properties to show here</p> 
          : <div className="loader"></div>}
      </div>
      {selectedCard && filteredCards[0]? <View ref={viewRef} /> : null}
    </div>
  );
};

export default CardsViewer;