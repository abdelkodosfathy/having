import { useState, useContext } from 'react'
import axios from 'axios';
import './card.css';
import { DataContext } from '../Context'
import dep from '../../imgs/dep2.jpg';
import RemoveCard from './RemoveCard';

const Card = ({ handleUnLoveCard,handleRemoveCard,onUpdate,action, data,...props}) => {
  const [remove, setRemove] = useState(false);  
  const darkMode = useContext(DataContext).darkMode;
  const myData = {
    ...data,
    darkMode
  }
  const [loved,setLoved] = useState(myData.loved);
  const loginData = useContext(DataContext).loginState;
  const token = loginData.token;

  function handleLovedCard(state , cardId) {
    if(loginData.login){
      setLoved(state);
      axios({
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${token}`
        },
        method: `${state? 'post' : 'get'}`,
        baseURL: 'https://app.having.market/api/',
        url: `${state? 'fav' : 'delfav/'+cardId}`,
        data: {
          task_id: `${cardId}`,
        }
      }).then(e => {
        console.log(e);
      }).catch((e)=>{
        console.log(e);
      });
    } else {
      alert("u are not loged in")
    }
  }
  function handleLocation () {
    // navigate to location
  }
  function handleCardClicked(){
    console.log(myData);
    props.onSelect(myData);
  }
  function askToRemove(){
    setRemove(true)
  }
  return (
    <div className="card-container">
      {/* {!remove ?  */}
      <div className={`card ${myData.darkMode&& 'dark'} 
      ${props.selectedIndex === myData.id && 'selected'}`} 
      key={props.key} 
      onClick={(e) => handleCardClicked(e)}>
        <div className="card-img">
        {/* <img loading='lazy' src={`https://app.having.market/public/images/${myData.img[0].img_name}`} alt="" /> */}
        {
          myData.img[0] ? <img loading='lazy' src={`https://app.having.market/public/images/${myData.img[0].img_name}`}/> : null
        }
        </div>
        <div className="card-data">
          <h2>{myData.type}</h2>
          <div onClick={handleLocation}>
            <p>{myData.city}</p>
            <p>{myData.address}</p>
          </div>
          <h3>${myData.price || "3,000,000"}</h3>
          <div className="dep-features">
            {myData.bedrooms? <span><i className="fa-solid fa-bed"></i> {myData.bedrooms}</span> : null}
            {myData.bathrooms? <span><i className="fa-solid fa-bath"></i> {myData.bathrooms}</span> : null}
            {myData.size? <span><i className="fa-solid fa-ruler-combined"></i> {myData.size}</span> : null}
          </div>
          <div className="card-btns">
            <button className='card-phone-btn'>
              <i className="fa-solid fa-phone"></i>
            </button>
            <button className='card-mail-btn'>
              <i className="fa-solid fa-envelope"></i>
            </button>
          </div>
          <div className="love-icon">
            {
              action === "fav" ? (<>
                <i className="fa-solid fa-heart"
                onClick={() => askToRemove()}></i>
                {/* {myData.action === 0?<i class="fa-solid fa-s"></i>:
                myData.action === 1? <i class="fa-solid fa-r"></i>: null} */}
                </>
              ) : action === "tasks" ? (
                <>
                <i className="fa-solid fa-xmark" onClick={() => handleRemoveCard(myData)}></i>
                <i className="fa-solid fa-pen" onClick={onUpdate}></i>
                </>
                ) : (
              loved ? (
                <i className="fa-solid fa-heart"
                onClick={() => handleLovedCard(false, myData.id)}></i>
              ) : (
                <i className="fa-regular fa-heart"
                onClick={() => handleLovedCard(true, myData.id)}></i>))
            }
            
            <i className="fa-solid fa-location-dot"></i>
          </div> 
        </div>
      </div>
      {/* :
      <RemoveCard removeFrom="fav" cardID={myData.id} token={token}/>
      } */}
    </div>
  )
}
export default Card