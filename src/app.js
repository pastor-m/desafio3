import ProductManager from "../productManager.js";
import express from "express"
import { promises as fs } from "fs";
const products = new ProductManager("./products.json");

const PORT = 8080;



const app = express();

app.listen(PORT, ()=>{
    console.log(`Server is listening in port: ${PORT}`);
})

app.get("/products", async (req, res) => {
        try {
            let limit = parseInt(req.query.limit);
            let reqProducts = await products.getProducts();
            if (limit){
                res.send(reqProducts.slice(0,limit));
            } else {
                res.send(reqProducts);
            }
        } catch (error) {
            res.send("No products found", error)
        }
    
})

app.get("/products/:id", async (req,res) => {
    try {
        let id = req.params.id;
        let reqProducts = await products.getProductById(id);

        if(!reqProducts){
            res.send("Product not found")
        } else {
            res.send(reqProducts)
        }
    } catch (error) {
        res.send("Server error")
    }
})
