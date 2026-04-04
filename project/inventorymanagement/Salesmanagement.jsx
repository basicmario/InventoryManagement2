import React from 'react'
import '../inventorymanagement/sections.css'
import { supabase } from '../inventorymanagement/src/supabase.js'
import { useState } from 'react'



function Salesmanagement() {


  const [setter ,setsetter] = useState();
  const [values, setvalues] = useState(null);
  const [processvalues, setprocessvalues] = useState([]);

  var content;


  

  

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

  const checkdata = async ()=>{
    const value = document.getElementById("barcodereader").value;

    const { data, error } = await supabase
      .from('products')
      .select()
      .eq("id", value);

    if(error){
      console.log(error);
    }else{

      if(!data[0]){
        console.log("no value came back");
        setvalues(null);
        return;
      }

      console.log("server response: ",data[0]);
      setvalues(data[0]);
      

      
    }

    
  }

  const checkprocess = async () =>{
    const value = document.getElementById("barcodereader").value;
    const value2 = document.getElementById("quantityreader").value;

    const { data, error } = await supabase
      .from('products')
      .select()
      .eq("id", value)

      console.log(data[0]);

    if(data[0] && data[0].stock_quantity >= value2){
      console.log("product is: and the value is greater",data[0].stock_quantity);

      let pro = {
        item : data[0].productname,
        quant : value2,
        price:  data[0].price
      }

      setprocessvalues(prev => [...prev, pro]);
      console.log("processvalues: ", processvalues);
    }else{
      console.log("Product not found or value is less");
      setprocessvalues(null);
    }
    
      
  }


  let itemnames = "";
  let itemn;
  let oldtotal = 0; 
  let total;
  let subtotals = [];

  const receipt = () => {

    for(let x = 0; x < processvalues.length; x++){
      itemnames = itemnames + processvalues[x].item + ", ";
      itemn = processvalues[x].item;
      let q = processvalues[x].price * processvalues[x].quant;
      let r = `$` + processvalues[x].price * processvalues[x].quant;
      let sub = [itemn, r];
      subtotals.push(sub);
      oldtotal = oldtotal  + q;
    }

    total = `$` + oldtotal;


  }

  console.log("The subtotal: ",subtotals);

  receipt();

    if(setter == "scan"){
      content = 
      <div className="scanbox">
        <p>Scan The Bar Code(Enter product ID#)</p>
        <input id='barcodereader' type='text'/>

        {values != null ? 
        
        <div className="displaydiv">
          <p>Name: {values.productname}</p>
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
                <p>Name: {val.item}</p>
                <p>Price: ${val.price}</p>
                <p>Quantity: {val.quant}</p>
                <p>Subtotal: ${val.price * val.quant}</p>
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