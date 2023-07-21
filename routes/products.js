//? Dependencies
import { Router } from 'express';
import dotenv from 'dotenv';
import proxyProducts from '../middlewares/proxyProducts.js';
import {conx} from '../middlewares/proxyProducts.js';
//? Enviroment Variables
dotenv.config("../");

const storageProducts = Router();

//? Add products

storageProducts.post('/add', proxyProducts, (req, res) => {

    try {

        const action = `INSERT INTO products SET ?`;
        const { name, description, price, stock, discount_percentage, category } = req.body;

        const productData = {
            name,
            description,
            price,
            stock,
            discount_percentage,
            category
        };

        conx.query(
            action, productData, (err) => {

                if (err) {
                    console.error("Error de conexion:", err.message);
                    return res.status(500);
                }

                else {
                    return res.status(201).send(JSON.stringify(productData));

                }

            });

    } catch (err) {
        res.status(500).send(err.message);

    }

})

//? List Products Order alphabetically

storageProducts.get('/list', proxyProducts, (req, res) => {

    try {
        const action = 'SELECT * FROM products ORDER BY name ASC';

        conx.query(
            action, (err, result) => {
                if (err) {
                    return res.status(500).json(err.message)

                }
                return res.status(201).json({ result });
            });

    } catch (err) {

        res.status(500).json({ error: 'Error del servidor' });

    }

})


//? Update Products


//? Delete products

//? List products related to specific category


export default storageProducts;