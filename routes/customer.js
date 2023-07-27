//? Dependencies
import { Router } from 'express';
import dotenv from 'dotenv';
import proxyCustomer from '../middlewares/proxyCustomer.js';
import auth from '../auth/customerAuth.js'
import { SignJWT } from 'jose';
import { conx } from '../middlewares/proxyCustomer.js';

//? Enviroment Variables
dotenv.config("../");

const storageCustomer = Router();

//? Create 
storageCustomer.post('/create', proxyCustomer, async (req, res) => {
    try {
        const { name, address, email } = req.body;
        const userData = {
            name,
            address,
            email,
            role_id: 2
        }

        const checkCustomer = 'SELECT * FROM customer WHERE name = ? OR email = ?';
        const [customerResult] = await conx.query(checkCustomer, [name, email]);
        if (customerResult.length > 0) {
            return res.status(409).send("El cliente ya existe");
        }

        const action = 'INSERT INTO customer SET ?';
        await conx.query(action, userData);

        const encoder = new TextEncoder()
        const jwtContruct = new SignJWT({ userData })

        const jwt = await jwtContruct
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("30m")
            .sign(encoder.encode(process.env.PRIVATE_KEY))

        return res.status(201).json({ userData, jwt });
    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.sendStatus(500);
    }
})

//? Login
storageCustomer.get('/login', proxyCustomer, auth, async (req, res) => {
    try {
        const { name, email } = req.body;
        const userData = {
            name,
            email
        };
        if (!name || !email) return res.status(404).send("Envia tus datos");

        const action = 'SELECT * FROM customer WHERE name = ? AND email = ?';
        const [user] = await conx.query(action, [userData.name, userData.email]);

        if (user.length === 0) return res.status(404).send("Usuario no encontrado");

        return res.send("Autenticado");
    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.sendStatus(500);
    }
});

//? Delete customer by id
storageCustomer.delete('/delete/:id', proxyCustomer, auth, async (req, res) => {
    const { id } = req.params;

    try {
        const checkCustomer = 'SELECT id FROM customer WHERE id = ?';
        const [customerResult] = await conx.query(checkCustomer, [id]);
        if (customerResult.length === 0) {
            return res.status(404).send("Not user found")
        }

        const action = 'DELETE FROM customer WHERE id = ?';
        await conx.query(action, id);

        return res.send("Usuario eliminado")
    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.sendStatus(500);
    }
})

//? Update customer by id
storageCustomer.patch('/update/:id', proxyCustomer, auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, email } = req.body;

        const customerData = {};
        if (name) customerData.name = name;
        if (address) customerData.address = address;
        if (email) customerData.email = email;

        const checkCustomer = 'SELECT id FROM customer WHERE id = ?';
        const [customerResult] = await conx.query(checkCustomer, [id]);

        if (customerResult.length === 0) {
            return res.status(404).send("Cliente no encontrado");
        }

        const action = 'UPDATE customer SET ? WHERE id = ?';
        await conx.query(action, [customerData, id])

        return res.status(201).json({
            message: "Datos del cliente actualizados",
            data: customerData
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
})

//? Buy a products
storageCustomer.post('/:id/buy/:productId', proxyCustomer, auth, async (req, res) => {
    const customerId = req.params.id;
    const productId = req.params.productId;

    try {
        const checkCustomer = 'SELECT id FROM customer WHERE id = ?';
        const [customerResult] = await conx.query(checkCustomer, [customerId]);

        if (customerResult.length === 0) {
            return res.status(404).send("Cliente no encontrado");
        }

        const checkProduct = 'SELECT id, price, stock FROM products WHERE id = ?';
        const [productResult] = await conx.query(checkProduct, [productId]);

        if (productResult.length === 0) {
            return res.status(404).send("Producto no encontrado");
        }

        const productStock = productResult[0].stock;
        if (productStock === 0) {
            return res.status(400).send("Producto agotado");
        }

        const createPurchase = 'INSERT INTO purchases (customer_id, product_id) VALUES (?, ?)';
        await conx.query(createPurchase, [customerId, productId]);

        const updateStock = 'UPDATE products SET stock = ? WHERE id = ?';
        await conx.query(updateStock, [productStock - 1, productId]);

        return res.status(201).send("Compra exitosa");
    } catch (err) {
        console.error('Error de conexión:', err.message);
        res.sendStatus(500);
    }
});

//? List Purchases
storageCustomer.get('/purchases/:id', proxyCustomer, auth, async (req, res) => {
    const { id } = req.params;

    try {
        const checkCustomer = 'SELECT id FROM customer WHERE id = ?';

        const [customerResult] = await conx.query(checkCustomer, [id]);
        if (customerResult.length === 0) {
            return res.status(404).send("Cliente no encontrado");
        }

        const getPurchases = 'SELECT ps.product_id, pr.name as product_name, pr.price as product_price FROM purchases ps INNER JOIN products pr ON ps.product_id = pr.id WHERE customer_id = ?';
        const [purchases] = await conx.query(getPurchases, [id]);

        if (purchases.length === 0) return res.status(200).send("El usuario no tiene compras")

        const customerPurchases = {
            purchases: purchases
        };

        return res.status(200).json(customerPurchases);
    } catch (err) {
        console.error('Error de conexión:', err.message);
        res.sendStatus(500);
    }
});

export default storageCustomer;

