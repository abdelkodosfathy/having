// import React, { useRef, useState,useEffect } from 'react'
// import '../../pages/Buy/Buy.css';
// import Card from '../Card/Card'
// import View from '../View/View'
// import axios from 'axios';
// const CardsViewer = ({action, onUpdate, token}) => {
//   const [selectedCard, setSelectedCard] = useState();
//   const [fetched, setFetched] = useState(false);
//   const viewRef = useRef(null);
  
//   const [cardsData, setCardsData] = useState([]);

//   useEffect(() => {
//     axios({
//       headers: {
//         'Authorization': `${token&& `Bearer ${token}`}`
//       },
//       method: "get",
//       baseURL: 'https://app.having.market/api/',
//       url: `${action}`,
//     }).then(e => {
//       setFetched(true);
//       setCardsData(e.data[0]);
//     }).catch((e)=>{
//       console.log(e);
//     });
//   }, [action, fetched]);
    
//   useEffect(()=>{
//     if(fetched && cardsData[0]){
//       handelCardSelection(cardsData[0]);
//     }
//   },[cardsData])  
  
//   function handelCardSelection(cardData){
//     setSelectedCard(cardData.id)
//     viewRef.current = cardData;
//   }
//   function handleUnLoveCard(e){
//     console.log(e);
//     axios({
//       headers: {
//         'Authorization': `Bearer ${token}`
//       },
//       method: 'GET'
//       ,
//       url: `https://app.having.market/api/delfav/${e.id}`,

//     }).then(e => {
//       console.log(e);
//       setFetched(false)
//       setCardsData([]);
//     }).catch((e)=>{
//       console.log(e);
//     });
//   }
//   function handleRemoveCard(e){
//     console.log(e);
//     axios(`https://app.having.market/api/tasks/${e.id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       },
//       method: 'delete',
//     }).then(e => {
//       console.log(e);
//       setFetched(false)
//       setCardsData([]);
//     }).catch(e => {
//       console.log(e);
//     })
//   }

//   function handleUpdate(e){
//     console.log("update: ", e);
//     onUpdate(e);
//   }
//   return (
//     <>
//       <div className='grid-container'>
//         {fetched ? 
//         cardsData.map((e, index)=>{
//           return <Card 
//           action={action}
//           data={e} 
//           key={index} 
//           onSelect={handelCardSelection} 
//           selectedIndex={selectedCard} 
//           onUpdate={() => handleUpdate(e)}
//           handleRemoveCard={() => handleRemoveCard(e)}
//           handleUnLoveCard={() => handleUnLoveCard(e)}/>;
//         })
//         : <div className="loader"></div>}
//       </div>
//       {selectedCard&&<View ref={viewRef}/>}
//     </>
//   )
// }

// export default CardsViewer



import React, { useRef, useState, useEffect } from 'react';
import Card from '../Card/Card';
import View from '../View/View';
import axios from 'axios';

const CardsViewer = ({ action, onUpdate, token, filterData}) => {
  const initialFilters = {
    city: null,
    type: null,
    // Add other filter properties here (e.g., price, category, etc.)
  };

  const [selectedCard, setSelectedCard] = useState();
  const [fetched, setFetched] = useState(false);
  const viewRef = useRef(null);
  const [cardsData, setCardsData] = useState([]);
  const [filters, setFilters] = useState(initialFilters); // Add this state variable

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
    // console.log(e);
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
    // console.log(e);
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
    console.log("update: ", e);
    onUpdate(e);
  }

  // Filter the cards based on the selected filter criteria
  const filteredCards = filterData ? cardsData.filter(card => {
    const cityMatch = !filterData.city || card.city === filterData.city;
    const typeMatch = !filterData.type || card.type === filterData.type;
    const priceMatch = (!filterData.minPrice || !filterData.maxPrice )|| (card.price >= filterData.minPrice && card.price <= filterData.maxPrice);
    let bedroomsMatch = !filterData.bedrooms || card.bedrooms === +filterData.bedrooms;
    if(filterData.bedrooms == "4+"){
      console.log('foura');
      bedroomsMatch = card.bedrooms >= 4
    }
    // Add other filter conditions here (e.g., price, category, etc.)
    return cityMatch && typeMatch && priceMatch && bedroomsMatch;
  }) : cardsData;

  return (
    <>
      {/* Add your filter UI components here */}
      {/* For example, dropdowns for city and type */}
      {/* ... */}

      <div className='grid-container'>
        {fetched ?
          filteredCards.map((e, index) => (
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
          ))
          : <div className="loader"></div>}
      </div>
      {selectedCard && <View ref={viewRef} />}
    </>
  );
};

export default CardsViewer;