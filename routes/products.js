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
    const { name, description, price, stock, discount_percentage } = req.body;
    const productData = {
        name,
        description,
        price,
        stock,
        discount_percentage
    };

    try {
        const checkName = 'SELECT id FROM products WHERE name = ?';
        conx.query(checkName, [name], (err, results) => {
            if (err) {
                console.error('Error de conexión:', err.message);
                return res.status(500).send('Error interno del servidor');
            }
    
            if (results.length > 0) return res.status(409).send('El producto ya existe');
          
            const action = 'INSERT INTO products (name, description, price, stock, discount_percentage) VALUES (?, ?, ?, ?, ?)';
            const params = [name, description, price, stock, discount_percentage];
            conx.query(action, params, (err) => {
                if (err) {
                    console.error('Error de conexión:', err.message);
                    return res.status(500).send('Error interno del servidor');
                }
                return res.status(201).send(productData);
            });
        });
    } catch (err) {
        res.status(500).send('Error interno del servidor');
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
storageProducts.patch('/update/:id', proxyProducts, (req, res) => {
    const { id } = req.params;
    const {name, description, price, stock, discount_percentage } = req.body;
    const productData = {
        name,
        description,
        price,
        stock,
        discount_percentage,
    };
    try {
        const action = 'UPDATE products SET ? WHERE id = ?';
        conx.query(action, [productData, id], (err, result)  => {
            if (err) {
                console.error("Error de conexion:", err.message);
                return res.status(500);
            } else {
                return res.status(201).send(JSON.stringify(productData));
            }
        })


    } catch (err) {
        res.status(500).send(err.message);

    }
})

//? Delete products
storageProducts.delete('/delete/:id', proxyProducts, (req, res) => {
    const  {id}  = req.params;
    if (!id) return res.status(404).send("Not found");
    try {
        const action = 'DELETE FROM products WHERE id = ?';
        conx.query(action, id, (err, result)  => {
            if (err) {
                console.error("Error de conexion:", err.message);
                return res.status(500);
            } else {
                return res.status(204).send(JSON.stringify(result));
            }
        })

    } catch (err) {
        res.status(500).send(err.message);

    }
})
//? List products related to specific category
storageProducts.get('/category/:category', proxyProducts, (req, res )=> {

})


export default storageProducts;