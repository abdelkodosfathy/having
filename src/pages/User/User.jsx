import React, { useEffect } from 'react'
import './User.css';
import { useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../../components/Context';
import axios from 'axios';
// import TabsForm from './Tabs';
// import PropertyForm from './PropertyForm/PropertyForm';
import PropertyForm from '../../components/PropertyForm/PropertyForm';
import Button from '../../components/SideBar/Button';
import CardsViewer from '../../components/CardsViewer/CardsViewer';

const User = () => {
  const loginData = useContext(DataContext).loginState;
  const [property, setProperty] = useState({ name: "my properties", opject: null });
  const token = loginData.token;

  useEffect(() => {
    axios("https://app.having.market/api/tasks", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(e => {
      console.log("tasks: ", e);
    });

    axios("https://app.having.market/api/fav", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(e => {
      console.log("fav: ", e);
    });
  }, []);

  function propertyType(name, opject = null) {
    setProperty({ name, opject });
  }

  function handleUpdate(e) {
    console.log("update", e.id);
    propertyType("update", e);
  }

  function handleNewProp(){
    propertyType("my properties")
    console.log("added");
  }

  return (
    <div className='user-page'>
      <div className={`side-bar`}>
        <div className="property-type">
          <h1>Taps</h1>
          <div className="property-type-btns">
            <Button onClicked={() => propertyType("my properties")} proprety="my properties" isActivated={property.name}>
              <i className="fa-solid fa-briefcase"></i>
            </Button>
            <Button onClicked={() => propertyType("favorites")} proprety="favorites" isActivated={property.name}>
              <i className="fa-solid fa-heart"></i>
            </Button>
            <Button onClicked={() => propertyType("add property")} proprety="add property" isActivated={property.name}>
              <i className="fa-solid fa-building"></i>
            </Button>
            <Button proprety="update" isActivated={property.name}>
            </Button>
          </div>
        </div>
      </div>
      {property.name === "add property" ? <PropertyForm onAddProp={handleNewProp} isUpdate={property.opject}/> :
        property.name === "update" ? <PropertyForm isUpdate={property.opject} /> :
        property.name === "my properties" ? <CardsViewer action={"tasks"} token={token} onUpdate={handleUpdate} /> :
        property.name === "favorites" ? <CardsViewer action={"fav"} token={token} /> :
        null}
    </div>
  )
}

export default User;