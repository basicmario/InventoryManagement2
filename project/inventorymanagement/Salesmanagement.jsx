import React from 'react'
import '../inventorymanagement/sections.css'
import { supabase } from '../inventorymanagement/src/supabase.js'
import { useState } from 'react'

function Salesmanagement() {

  const [setter, setsetter] = useState();
  const [values, setvalues] = useState(null);
  const [processvalues, setprocessvalues] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  var content;

  const clicked = (val) => {
    if (val == "scan") {
      setsetter("scan");
    } else if (val == "process") {
      setsetter("process");
    } else {
      setsetter("receipt");
    }
  }

  const checkdata = async () => {
    const value = document.getElementById("barcodereader").value;

    if(!value){
      seterror("Please enter a product ID");
      return;
    }

    setloading(true);
    seterror(null);

    const { data, error } = await supabase
      .from('products')
      .select()
      .eq("id", value);

    setloading(false);

    if (error) {
      seterror("Database error: " + error.message);
    } else {
      if (!data[0]) {
        setvalues(null);
        seterror("No product found with that ID");
        return;
      }
      setvalues(data[0]);
    }
  }

  const checkprocess = async () => {
    const value = document.getElementById("barcodereader").value;
    const value2 = document.getElementById("quantityreader").value;

    if(!value || !value2){
      seterror("Please enter both a product ID and quantity");
      return;
    }

    setloading(true);
    seterror(null);

    try {
      const response = await fetch("http://localhost:3000/updateinv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prodid: value,
          quantitysold: Number(value2)
        })
      });

      const result = await response.json();
      console.log("the result", result);
      setloading(false);

      if (!response.ok) {
        seterror(result.message);
        return;
      }

      let pro = {
        item: result.product.productname,
        quant: value2,
        price: result.product.price
      }
      setprocessvalues(prev => [...prev, pro]);

    } catch (err) {
      setloading(false);
      seterror("Could not connect to server. Is it running on port 3000?");
      console.log("Fetch error:", err);
    }
  }

  let itemnames = "";
  let itemn;
  let oldtotal = 0;
  let total;
  let subtotals = [];

  const receipt = () => {
    for (let x = 0; x < processvalues.length; x++) {
      itemnames = itemnames + processvalues[x].item + ", ";
      itemn = processvalues[x].item;
      let q = processvalues[x].price * processvalues[x].quant;
      let r = `$` + processvalues[x].price * processvalues[x].quant;
      let sub = [itemn, r];
      subtotals.push(sub);
      oldtotal = oldtotal + q;
    }
    total = `$` + oldtotal;
  }

  receipt();

  if (setter == "scan") {
    content =
      <div className="scanbox">
        <p>Scan The Bar Code (Enter product ID#)</p>
        <input id='barcodereader' type='text' />
        {error && <p style={{color:"red"}}>{error}</p>}
        {loading && <p>Loading...</p>}
        {values != null ?
          <div className="displaydiv">
            <p>Name: {values.productname}</p>
            <p>Price: {values.price}</p>
            <p>Stock Quantity: {values.stock_quantity}</p>
          </div>
          :
          null
        }
        <button onClick={() => checkdata()}>Submit</button>
      </div>;

  } else if (setter == "process") {
    content =
      <div className="scanbox">
        <div className="mainscanbox">
          <div className="innerscanbox">
            <p>Scan The Bar Code</p>
            <input id='barcodereader' type='text' />
          </div>
          <div className="innerscanbox2">
            <p>Enter Quantity</p>
            <input id='quantityreader' type='number' />
          </div>
        </div>

        {error && <p style={{color:"red"}}>{error}</p>}
        {loading && <p>Loading...</p>}

        {processvalues?.length > 0 ?
          processvalues.map((val, index) => (
            <div className="displaydiv" key={index}>
              <p>Name: {val.item}</p>
              <p>Price: ${val.price}</p>
              <p>Quantity: {val.quant}</p>
              <p>Subtotal: ${val.price * val.quant}</p>
            </div>
          ))
          :
          <p>No items added yet</p>
        }
        <button onClick={() => checkprocess()}>Submit</button>
      </div>;

  } else {
    content =
      <div className="receptbox">
        <p>Receipt</p>
        <div className="innerreceptbox">
          <p>Items: {itemnames}</p>
          {subtotals.map((dis, index) => (
            <p key={index}>{dis[0]} : {dis[1]}</p>
          ))}
          <p>Total: {total}</p>
        </div>
      </div>
  }

  return (
    <>
      <div className="outterbox">
        <div className="header">
          <h3>Sales Management</h3>
        </div>

        <div className="navbox">
          <button onClick={() => clicked("scan")}>Scan product</button>
          <button onClick={() => clicked("process")}>Process Sales</button>
          <button onClick={() => clicked("receipt")}>Generate Receipt</button>
        </div>

        <div className="displaybox">
          {content}
        </div>
      </div>
    </>
  )
}

export default Salesmanagement