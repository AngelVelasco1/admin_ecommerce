//? Dependencies
import { Router } from 'express';
import dotenv from 'dotenv';
import proxyProducts from '../middlewares/proxyProducts.js';
import { conx } from '../middlewares/proxyProducts.js';
//? Enviroment Variables
dotenv.config("../");

const storageProducts = Router();

//? Add products
storageProducts.post('/add', proxyProducts, async (req, res) => {
    const { name, description, price, stock, discount_percentage, category } = req.body;
    const productData = {
        name,
        description,
        price,
        stock,
        discount_percentage,
        category
    };

    try {
        const checkName = 'SELECT id FROM products WHERE name = ?';
        const [checkResult] = await conx.query(checkName, [name]);

        if (checkResult.length > 0) return res.status(409).send('El producto ya existe');

        const action = 'INSERT INTO products SET ?';
        await conx.query(action, productData);

        return res.status(201).json({
            message: "Producto añadido",
            data: productData
        });
    } catch (err) {
        res.status(500).send('Error interno del servidor');
    }
});

//? List Products Order alphabetically
storageProducts.get('/list', proxyProducts, async (req, res) => {
    try {
        const action = 'SELECT * FROM products ORDER BY id ASC';
        const [products] = await conx.query(action);

        return res.status(201).json({products});

    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }

})

//? Update Products
storageProducts.patch('/update/:id', proxyProducts, async(req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, discount_percentage } = req.body;
    const productData = {
        name,
        description,
        price,
        stock,
        discount_percentage,
    };
    try {
        const checkProduct = 'SELECT id FROM products WHERE id = ?';
        const [checkResult] = await conx.query(checkProduct, [id]);

        if(checkResult.length === 0) return res.status(404).send("Producto no encontrado");

        const action = 'UPDATE products SET ? WHERE id = ?';
        await conx.query(action, [productData, id]);
        
        return res.status(201).send(JSON.stringify(productData));

    } catch (err) {
        res.status(500).send(err.message);
    }
})

//? Delete products
storageProducts.delete('/delete/:id', proxyProducts, async (req, res) => {
    const id = req.params.id;
    try {
        const checkProduct = 'SELECT id FROM products WHERE id = ?';
        const [checkResult] = await conx.query(checkProduct, [id]);

        if(checkResult.length === 0) return res.status(404).send("Producto no encontrado");

        const action = 'DELETE FROM products WHERE id = ?';
        await conx.query(action, id);
   
        return res.send("Producto eliminado");
    } catch (err) {
        res.status(500).send(err.message);
    }
})
//? List products related to specific category
storageProducts.get('/category/:category', proxyProducts, async(req, res) => {
    const categoryId = req.params.category;
    try {
        const action = 'SELECT * FROM products WHERE category = ?';
        const [products] = await conx.query(action, [categoryId]);

        if(products.length === 0) return res.status(404).send("No existen productos con esta categoria");
 
        return res.status(201).json({products});
    

    } catch (err) {
        res.status(500).send(err.message);

    }
})

export default storageProducts;