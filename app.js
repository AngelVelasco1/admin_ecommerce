//? Dependencies
import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';


//? Routes
import storageProducts from './routes/products.js';

//? Enviroment Variables
dotenv.config();

const app = express();
app.use(express.json());

//? Use routes
app.use("/products", storageProducts);


//? Server
const config = JSON.parse(process.env.CONFIG);
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})