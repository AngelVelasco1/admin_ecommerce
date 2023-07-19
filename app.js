//? Dependencies
import express from 'express';
import dotenv from 'dotenv';

//? Routes
import storageProducts from './routes/products.js';
import storageSuppliers from './routes/suppliers.js';
import storagePromotions from './routes/promotions.js'

//? Enviroment Variables
dotenv.config();

const app = express();
app.use(express.json());

//? Use routes
app.use("/customer", storageCustomer);
app.use("/products", storageProducts);
app.use("/suppliers", storageSuppliers);
app.use("/promotions", storagePromotions);

//? Server
const config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})