import React, { useEffect, useState } from 'react'
import { supabase } from '../src/supabase';
import '../sections.css'

function Inventorycontrol() {

  const URL = "http://localhost:3000";

  const [errorbox, seterrorbox] = useState(false);
  const [success, setsuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addError, setAddError] = useState(false);
  const [selectedbtn, setselectedbtn] = useState("Update");
  const [quantity, setquantity] = useState(0);
  const [products, setproducts] = useState([]);

  const getinfo = async () => {
    try {
      seterrorbox(false);
      setsuccess(false);
      const id = document.getElementById("idval").value;
      const quant = document.getElementById("quantval").value;

      if (!id || !quant) {
        seterrorbox(true);
        return;
      }

      let senddata = { prodid: id, quantitysold: quant };

      const response = await fetch(`${URL}/updateinv`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(senddata)
      });

      const info = await response.json();
      if (!response.ok) throw new Error(info.message);

      setsuccess(true);

    } catch (error) {
      console.error(error);
    }
  }

  const addstock = async () => {
    try {
      setAddError(false);
      setAddSuccess(false);

      const id = document.getElementById("addidval").value;
      const quant = document.getElementById("addquantval").value;

      if (!id || !quant) {
        setAddError(true);
        return;
      }

      let senddata = { prodid: id, quantityadded: quant };

      const response = await fetch(`${URL}/addinv`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(senddata)
      });

      const info = await response.json();
      if (!response.ok) throw new Error(info.message);

      setAddSuccess(true);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (selectedbtn !== "Check") return;

    const getquantity = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select()

        if (error) throw new Error("Couldn't get the quantities");

        setproducts(data);
        let qu = 0;
        for (let x = 0; x < data.length; x++) {
          qu = qu + data[x].stock_quantity;
        }
        setquantity(qu);

      } catch (error) {
        console.log(error);
      }
    }

    getquantity();
  }, [selectedbtn]);


  let display;

  if (selectedbtn === "Update") {
    display = (
      <div className="holdersection">
        {errorbox && (
          <div className="errobox">
            <div className="innererror">
              <p>ERROR: Please enter all the values</p>
            </div>
          </div>
        )}
        {success && (
          <div className="successbox">
            <div className="innersuccess">
              <p>Product quantity updated correctly</p>
            </div>
          </div>
        )}
        <div className="innerinventory">
          <div className="sections">
            <p>Enter product ID</p>
            <input id="idval" type="text" onChange={() => { seterrorbox(false); setsuccess(false); }} />
          </div>
          <div className="sections">
            <p>Enter quantity sold</p>
            <input id="quantval" type="number" onChange={() => { seterrorbox(false); setsuccess(false); }} />
          </div>
          <div className="buttonholder">
            <button onClick={getinfo}>Submit</button>
          </div>
        </div>
      </div>
    )

  } else if (selectedbtn === "Add") {
    display = (
      <div className="holdersection">
        {addError && (
          <div className="errobox">
            <div className="innererror">
              <p>ERROR: Please enter all the values</p>
            </div>
          </div>
        )}
        {addSuccess && (
          <div className="successbox">
            <div className="innersuccess">
              <p>Stock added successfully</p>
            </div>
          </div>
        )}
        <div className="innerinventory">
          <div className="sections">
            <p>Enter product ID</p>
            <input id="addidval" type="text" onChange={() => { setAddError(false); setAddSuccess(false); }} />
          </div>
          <div className="sections">
            <p>Enter quantity to add</p>
            <input id="addquantval" type="number" onChange={() => { setAddError(false); setAddSuccess(false); }} />
          </div>
          <div className="buttonholder">
            <button onClick={addstock}>Submit</button>
          </div>
        </div>
      </div>
    )

  } else if (selectedbtn === "Check") {
    display = (
      <div className="holdersection">
        <div className="quantdisplay">
          <p>Check amount in inventory</p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
    )

  } else if (selectedbtn === "Display") {
    display = (
      <div className="holdersection">
        <p>Display Stock</p>
        <div className="innerdis">
          {products.map((prod) => (
            <div className="box" key={prod.id}>
              <p>Product ID: {prod.id}</p>
              <p>Item: {prod.productname}</p>
              <p>Amount in stock: {prod.stock_quantity}</p>
            </div>
          ))}
        </div>
      </div>
    )

  } else {
    display = (
      <div className="holdersection">
        <p>Lock inventory</p>
        <div className="locksec">
          <p>Enter stock ID to lock</p>
          <input placeholder='Enter the stock ID....' />
          <button>Submit</button>
        </div>
      </div>
    )
  }

  return (
    <div className="invenmain">
      <div className="header">
        <p>Inventory Control</p>
      </div>

      <div className="navbarinv">
        <button onClick={() => setselectedbtn("Update")}>Update Inventory</button>
        <button onClick={() => setselectedbtn("Add")}>Add Stock</button>
        <button onClick={() => setselectedbtn("Check")}>Check Inventory</button>
        <button onClick={() => setselectedbtn("Display")}>Inventory Display</button>
      </div>

      {display}

    </div>
  )
}

export default Inventorycontrol