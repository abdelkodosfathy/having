import React, { useRef, useState,useEffect } from 'react'
import '../../pages/Buy/Buy.css';
import Card from '../Card/Card'
import View from '../View/View'
import axios from 'axios';
const CardsViewer = ({action, onUpdate, token}) => {
  const [selectedCard, setSelectedCard] = useState();
  const [fetched, setFetched] = useState(false);
  const viewRef = useRef(null);
  
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    axios({
      headers: {
        'Authorization': `${token&& `Bearer ${token}`}`
      },
      method: "get",
      baseURL: 'https://app.having.market/api/',
      url: `${action}`,
    }).then(e => {
      setFetched(true);
      setCardsData(e.data[0]);
    }).catch((e)=>{
      console.log(e);
    });
  }, [action, fetched]);
    
  useEffect(()=>{
    if(fetched && cardsData[0]){
      handelCardSelection(cardsData[0]);
    }
  },[cardsData])  
  
  function handelCardSelection(cardData){
    setSelectedCard(cardData.id)
    viewRef.current = cardData;
  }
  function handleUnLoveCard(e){
    console.log(e);
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
  function handleRemoveCard(e){
    console.log(e);
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

  function handleUpdate(e){
    console.log("aaa", e);
    onUpdate(e);
  }
  return (
    <>
      <div className='grid-container'>
        {fetched ? 
        cardsData.map((e, index)=>{
          return <Card 
          action={action}
          data={e} 
          key={index} 
          onSelect={handelCardSelection} 
          selectedIndex={selectedCard} 

          onUpdate={() => handleUpdate(e)}
          handleRemoveCard={() => handleRemoveCard(e)}
          handleUnLoveCard={() => handleUnLoveCard(e)}/>;
        })
        : <div className="loader"></div>}
      </div>
      {selectedCard&&<View ref={viewRef}/>}
    </>
  )
}

export default CardsViewer