import React from 'react'
import '../inventorymanagement/sections.css';
import { useState } from 'react';
import './sections.css'

function Backup() {

  const URL = "https://inventory-management-server-yw7k.onrender.com";
  
  const [ datastore, setdata] = useState(null);

  const getdata = ()=>{
    const name = document.getElementById("nametag").value;
    const quant = document.getElementById("quanttag").value;
    const price = document.getElementById("pricetag").value;

    let data = {
      name : name,
      quantity : quant,
      price : price
    }

    console.log(data);
    setdata(data);

  }

  const senddate = async ()=>{
    await getdata();

    try{

      const response = await fetch(`${URL}/backup`, {
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(datastore)
      });

      const info = await response.json();
      console.log(info);

      if(!info){
        throw new Error("could store the backup");
      }
    }catch(error){
      console.error(error);
    }
  }

  console.log(datastore);

  return (
    <>
      <div className="backup">
        <div className="header">
          <p>Back up and recovery</p>
        </div>

        <div className="mainbackup">
          <div className="section">
            <p>Item Name</p>
            <input id='nametag' text='text'/>
          </div>

          <div className="section">
            <p>Price</p>
            <input text='text' id='pricetag'/>
          </div>

          <div className="section">
            <p>Quantity</p>
            <input text='text'id='quanttag'/>
          </div>

          <div className="buttonbox">
            <button onClick={()=>senddate()}>Submit</button>
          </div>

          {
            datastore != null?

            <div className="storedata">
              <p>Back up Successfully</p>
              <p>Item name: {datastore.name}</p>
              <p>Item quantity: {datastore.quantity}</p>
              <p>Item price: {datastore.price}</p>
            </div>

            :

            <p>No data</p>
          }
          

        </div>
      </div>
    </>
  )
}

export default Backup