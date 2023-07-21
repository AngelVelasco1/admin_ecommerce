//? Dependencies
import { Router } from 'express';
import dotenv from 'dotenv';
import proxyProducts from '../middlewares/proxyProducts.js';
import {connectToDB} from '../app.js'

//? Enviroment Variables
dotenv.config("../");

const storageProducts = Router();

//? Add products
storageProducts.post('/add/:name/:description/:price/:stock/:discount_percentage', proxyProducts, (req, res) => {
    try {
        let conx =  connectToDB();
        const { name, description, price, stock, discount_percentage } = req.params;
        if(!name || !description || !price || !stock || !discount_percentage) {
            return res.sendStatus(400).json({ error: 'Incompleted Data' });
        }

        const action = 'INSERT INTO products (name, description, price, stock, discount_percentage) VALUES (?, ?, ?, ?, ?)'
        const params = [name, description, price, stock, discount_percentage];
        conx.query(
            action, params, ((err, result) => {
                if(err) {
                    return res.status(500).json(err.message)
                }
                return res.sendStatus(201).json({result});
            }))
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
})

//? List Products Order alphabetically


//? Update Products


//? Delete products

//? List products related to specific category

export default storageProducts;