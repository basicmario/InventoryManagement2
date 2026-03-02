import React from 'react'
import '../inventorymanagement/sections.css'
import { useState } from 'react'



function Salesmanagement() {


  const [setter ,setsetter] = useState();
  const [values, setvalues] = useState(null);
  const [processvalues, setprocessvalues] = useState([]);

  var content;


  const productdatabase = {
    "0001" : {"product_name" : "icecream", "price" : 50, "stock_quantity" : 5 },
    "0002" : {"product_name" : "table", "price" : 500, "stock_quantity" : 2 },
    "0003" : {"product_name" : "bed", "price" : 1500, "stock_quantity" : 2 },
    "0004" : {"product_name" : "hairbrush", "price" : 500, "stock_quantity" : 12 }
  }

  console.log(productdatabase);

  const clicked = (val) =>{
    if(val == "scan"){
      setsetter("scan");
      console.log("Scan");
      content = <p>This is the scan box</p>;
    }else if(val == "process"){
      setsetter("process");
      content = <p>This is the process box</p>
    }else {
      setsetter("receipt");
      content = <p>This is the receipt box</p>
    }
  }

  const checkdata = ()=>{
    const value = document.getElementById("barcodereader").value;

    if(productdatabase[value]){
      console.log("product is: ",productdatabase[value]);
      setvalues(productdatabase[value]);
    }else{
      setvalues(null);
    }
  }

  const checkprocess = () =>{
    const value = document.getElementById("barcodereader").value;
    const value2 = document.getElementById("quantityreader").value;

    if(productdatabase[value] && productdatabase[value].stock_quantity >= value2){
      console.log("product is: and the value is greater",productdatabase[value]);
      let pro = {
        item : productdatabase[value],
        quant : value2
      }

      
      
      setprocessvalues(prev => [...prev, pro]);
      console.log("processvalues: ", processvalues);
    }else{
      console.log("Product not found or value is less");
      setprocessvalues(null);
    }
      
  }


  let itemnames;
  let itemn;
  let total = 0; 
  let subtotals = [];

  const receipt = () => {

    for(let x = 0; x < processvalues.length; x++){
      itemnames = itemnames + processvalues[x].item.product_name + " ";
      itemn = processvalues[x].item.product_name;
      let r = processvalues[x].item.price * processvalues[x].quant;
      let sub = [itemn, r];
      subtotals.push(sub);
      total = total + r;
    }


  }

  console.log("The subtotal: ",subtotals);

  receipt();

    if(setter == "scan"){
      content = 
      <div className="scanbox">
        <p>Scan The Bar Code</p>
        <input id='barcodereader' type='text'/>

        {values != null ? 
        
        <div className="displaydiv">
          <p>Name: {values.product_name}</p>
          <p>Price: {values.price}</p>
          <p>Stock Quantity: {values.stock_quantity}</p>
        </div>
        
        :
        
        <p>Product not found</p>}
        <button onClick={()=>checkdata()}>Submit</button>
      </div>;
    }else if(setter == "process"){
      content = <div className="scanbox">
        <div className="mainscanbox">

          <div className="innerscanbox">
            <p>Scan The Bar Code</p>
            <input id='barcodereader' type='text'/>
          </div>

          <div className="innerscanbox2">
            <p>Enter Quantity</p>
            <input id='quantityreader' type='number'/>
          </div>
        </div>


        {
          processvalues?.length > 0?

          processvalues.map((val)=>{
            return (
              <div className="displaydiv">
                <p>Name: {val.item.product_name}</p>
                <p>Price: {val.item.price}</p>
                <p>Quantity: {val.quant}</p>
                <p>Subtotal: {val.item.price * val.quant}</p>
              </div>
            )
            
          })
        
        :
        
        <p>Product not found</p>

        }
        <button onClick={()=>checkprocess()}>Submit</button>
      </div>;
    }else {
      content = 
      <div className="receptbox">
        <p>Reciept</p>
        <div className="innerreceptbox">
          

          <p>Items: {itemnames}</p>

          {
            subtotals.map((dis)=>(<p>{dis[0]} : {dis[1]}</p>)
            )
          }

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
          <button onClick={()=>clicked("scan")}>Scan product</button>
          <button onClick={()=>clicked("process")}>Process Sales</button>
          <button onClick={()=>clicked("receipt")}>Generate Receipt</button>
        </div>

        <div className="displaybox">
          
          {content}
          
        </div>
      </div>
    </>
  )
}

export default Salesmanagement