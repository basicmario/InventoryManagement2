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

app.post('/updateinv', async (req, res) => {
    const { prodid, quantitysold: quant } = req.body;

    const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', prodid);

    if (error) return res.status(500).json({ message: "Database error: " + error.message });
    if (!data[0]) return res.status(404).json({ message: "Product not found" });

    const product = data[0];

    if (quant > product.stock_quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
    }

    const newQuantity = product.stock_quantity - quant;

    const { error: updateError } = await supabase
        .from('products')
        .update({ stock_quantity: newQuantity })
        .eq('id', prodid);

    if (updateError) return res.status(500).json({ message: "Update failed: " + updateError.message });

    res.json({ message: "Update was a success", product: product });
});



app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`);
})

