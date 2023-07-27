//? Dependencies
import { Router } from 'express';
import dotenv from 'dotenv';
import proxySuppliers from '../middlewares/proxySuppliers.js';
import { conx } from '../middlewares/proxySuppliers.js';

//? Enviroment Variables
dotenv.config("../");

const storageSuppliers = Router();

//? Add suppliers
storageSuppliers.post('/add', proxySuppliers, async (req, res) => {
    const { name, email, phone } = req.body;
    const supplierData = {
        name,
        email,
        phone,
        role_id: 1
    }
    try {
        const checkSupplier = 'SELECT id FROM suppliers WHERE name = ?';
        const [checkResult] = await conx.query(checkSupplier, [name]);

        if (checkResult.length > 0) return res.status(409).send("El proveedor ya existe");


        const action = 'INSERT INTO suppliers SET ?';
        await conx.query(action, supplierData);

        return res.status(201).json({
            message: "Proveedor añadido",
            data: supplierData
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
//? Delete Suppliers
storageSuppliers.delete('/delete/:id', proxySuppliers, async (req, res) => {
    const id = req.params.id;

    try {
        const checkSupplier = 'SELECT id FROM suppliers WHERE id = ?';
        const [checkResult] = await conx.query(checkSupplier, [id]);

        if (checkResult.length === 0) return res.status(404).send("Proveedor no encontrado");

        const action = 'DELETE FROM suppliers WHERE id = ?';
        await conx.query(action, id)
        return res.send("Proveedor eliminado");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
//? Update
storageSuppliers.patch('/update/:id', proxySuppliers, async (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const supplierData = {
        name,
        email,
        phone
    };
    try {
        const checkSupplier = 'SELECT id FROM suppliers WHERE id = ?';
        const [checkResult] = await conx.query(checkSupplier, [id]);

        if (checkResult.length === 0) return res.status(404).send("Poveedor no encontrado");

        const action = 'UPDATE suppliers SET ? WHERE id = ?';
        await conx.query(action, [supplierData, id]);

        return res.status(201).send(JSON.stringify(supplierData));
    } catch (err) {
        res.status(500).send(err.message);

    }
});
//? List suppliers
storageSuppliers.get('/list', proxySuppliers, async (req, res) => {
    try {
        const action = 'SELECT * FROM suppliers ORDER BY name ASC';

        const [suppliers] = await conx.query(action)
        return res.status(201).json({ suppliers });


    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

//? Relation to specific product
storageSuppliers.post('/link/:supplierId/:productId', proxySuppliers, async (req, res) => {
    const { supplierId, productId } = req.params;

    try {
        const checkSupplier = 'SELECT * FROM suppliers WHERE id = ?';
        const checkProduct = 'SELECT * FROM products WHERE id = ?';
        const checkRelation = 'SELECT * FROM product_supplier WHERE supplier_id = ? AND product_id = ?';

        const [supplierResult] = await conx.query(checkSupplier, [supplierId]);
        if (supplierResult.length === 0) {
            return res.status(409).send("El proveedor no existe");
        }

        const [productResult] = await conx.query(checkProduct, [productId]);
        if (productResult.length === 0) {
            return res.status(409).send("El producto no existe");
        }

        const [relationResult] = await conx.query(checkRelation, [supplierId, productId]);
        if (relationResult.length > 0) {
            return res.status(409).send("La relación entre el proveedor y el producto ya existe");
        }

        const action = 'INSERT INTO product_supplier (supplier_id, product_id) VALUES (?, ?)';
        await conx.query(action, [supplierId, productId]);

        return res.status(204).send("Proveedor asociado");
    } catch (err) {
        console.error('Error de conexión:', err.message);
        return res.status(500).send('Error interno del servidor');
    }
});

export default storageSuppliers;