//? Dependencies
import { Router } from 'express';
import dotenv from 'dotenv';
import proxySuppliers from '../middlewares/proxySuppliers.js';
import { conx } from '../middlewares/proxySuppliers.js';

//? Enviroment Variables
dotenv.config("../");

const storageSuppliers = Router();

//? Add suppliers
storageSuppliers.post('/add', proxySuppliers, (req, res) => {
    const { name, email, phone } = req.body;
    const supplierData = {
        name,
        email,
        phone,
        role_id: 1
    }
    try {
        const checkSupplier = 'SELECT id FROM suppliers WHERE name = ?';
        conx.query(checkSupplier, [name], (err, result) => {
            if (err) {
                console.error('Error de conexión:', err.message);
                return res.status(500).send('Error interno del servidor');
            }

            if (result.length > 0) return res.status(409).send("El proveedor ya existe");


            const action = 'INSERT INTO suppliers SET ?'
            conx.query(action, supplierData, (err) => {
                if (err) {
                    console.error('Error de conexión:', err.message);
                    return res.status(500).send('Error interno del servidor');
                } else {
                    return res.status(201).send(supplierData);
                }
            })
        })
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})

//? Delete Suppliers
storageSuppliers.delete('/delete/:id', proxySuppliers, (req, res) => {
    const id = req.params.id;

    try {
        const checkSupplier = 'SELECT id FROM suppliers WHERE id = ?';
        conx.query(checkSupplier, id, (err, result) => {
            if (err) {
                console.error('Error de conexión:', err.message);
                return res.status(500).send('Error interno del servidor');
            }

            if (result.length == 0) {
                return res.status(409).send("El proveedor no existe")
            } else {
                const action = 'DELETE FROM suppliers WHERE id = ?';
                conx.query(action, id, (err, result) => {
                    if (err) {
                        console.error('Error de conexión:', err.message);
                        return res.status(500).send('Error interno del servidor');
                    } else {
                        return res.status(204).send({message: "Producto eliminado"});
                    }
                })
            }
        })
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})
export default storageSuppliers;