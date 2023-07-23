//? Dependencies
import express from 'express';
import dotenv from 'dotenv';

//? Routes
import storageProducts from './routes/products.js';
import storageSuppliers from './routes/suppliers.js';
import storageCustomer from './routes/customer.js';

//? Enviroment Variables
dotenv.config();

const app = express();
app.use(express.json());

//? Use routes
app.use("/products", storageProducts);
app.use("/suppliers", storageSuppliers);
app.use("/customer", storageCustomer);

//? Server
const config = JSON.parse(process.env.CONFIG);
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})