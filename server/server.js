import express from 'express'
import  {supabase}  from '../server/supabase.js'
import cors from 'cors'
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


let storageforbackup  = [];

app.get("/", (req, res)=>{
    res.send("you got here successfully");
})

app.post('/backup', (req, res)=>{
    const body = req.body;
    console.log(body);
    storageforbackup.push(body);
    res.json("got it");
})

app.post('/updateinv', async (req, res)=>{
    const body = req. body;
    const prodid = body.prodid;
    const quant = body.quantitysold;

    const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', prodid);

    if(error){
        console.log(error);
    }else {
        let response =  data[0].stock_quantity;
        console.log(response);

        let newdif = response - quant;
        console.log(newdif);

        const { error } = await supabase
            .from('products')
            .update({ stock_quantity: newdif})
            .eq('id', prodid)

        if(error){
            console.log(error);
        }else{
            res.send({message: "update was a successs"});
        }
    }
    

})



app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`);
})

