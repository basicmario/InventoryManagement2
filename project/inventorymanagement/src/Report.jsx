import React, { useState } from 'react'
import { supabase } from '../src/supabase.js';
import '../sections.css'

function Report() {

  const [display, setdisplay] = useState("Generate");
  const [content, setContent] = useState([]);


  const Generate = async ()=>{
    const prodid = document.getElementById("prodID").value || 0;
    const quantity = document.getElementById("quant").value || 0;
    const amount = document.getElementById("payment").value || 0;

    const { data, error } = await supabase
    .from('products')
    .select()
    .eq("id", prodid)

    if(error){
      console.log(error);
    }

    console.log(data);

    let content = {
      itemname : data[0]?.productname,
      stockquant : data[0]?.stock_quantity,
      stockprice: data[0]?.price,
      productID : prodid,
      quantity : quantity,
      paymentamount : amount
    }

     setContent(prev => [...prev, content]); // ✅ adds to existing array
  }

  let showbox = null;
  console.log("The content is: ",content);
  if(display == "Generate"){

    const now = new Date();

    const date = now.toLocaleDateString();   // "3/2/2026"
    const time = now.toLocaleTimeString();   // "2:30:00 PM"

    let itemlist = "";
    let total = 0;
    let payment_amount = 0;

    for (let i= 0; i < content.length; i ++){
      itemlist = itemlist + content[i]?.itemname + ", ";
      total = total + (parseInt(content[i]?.quantity)) * parseInt(content[i]?.stockprice);
      payment_amount = payment_amount + parseInt(content[i]?.paymentamount);
    }

    let change = payment_amount - total;
    console.log("Total: ", total);


    showbox = (
      <div className="showingbox">
        <div className="outtersetup">
          <div className="setup">
            <input type='text' id='prodID' placeholder='Enter product ID'/>
            <input type='number' id='quant' placeholder='Enter quantity'/>
            <input type='number' id='payment' placeholder='Payment amount'/>
          </div>
          <div className="buttonbox">
            <button onClick={()=>Generate()}> Submit</button>
          </div>
        </div>

          <div className="displaying">
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Store Name: Mars Wholesale</p>
            
            <p>Items name: {itemlist}</p>
            <p>Total amount: ${total}</p>
            <p>Payment amount: ${payment_amount}</p>
            <p>Change: ${change}</p>
          </div>
          
            
          
        


        
      </div>
    )
  }else {

    showbox = (
      <div className="showingbox">
      <p>Analyze sales patterns</p>

      <div className="boxes">
        {
          content.map((c)=>(
            <div className="innerbox">
              <p>{c.itemname} was bought for {c.stockprice} x{c.quantity} times</p>
            </div>
          ))
        }
      </div>
    </div>
    )
    
  }

  return (
    <div className="reportbox">
      <div className="header">
        <p>Generate Report</p>
      </div>


      <div className="reportnavbar">
        <button onClick={()=>setdisplay("Generate")}>Generate receipt</button>
        <button onClick={()=>setdisplay("Patterns")}>Analyse patterns</button>
      </div>

      <div className="innerreport">
        {showbox}
      </div>
    </div>
  )
}

export default Report