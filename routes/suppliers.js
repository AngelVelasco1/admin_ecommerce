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
});
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
            } 
            else {
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
});
//? Update
storageSuppliers.patch('/update/:id', proxySuppliers, (req, res) => {
    const  id  = req.params.id;
    const { name, email, phone } = req.body;
    const supplierData = {
        name,
        email,
        phone,
    };
    try {
        const action = 'UPDATE suppliers SET ? WHERE id = ?';
        conx.query(action, [supplierData, id], (err) => {
            if (err) {
                console.error("Error de conexion:", err.message);
                return res.status(500);
            } else {
                return res.status(201).send(JSON.stringify(supplierData));
            }
        })


    } catch (err) {
        res.status(500).send(err.message);

    }
});
//? List suppliers
storageSuppliers.get('/list', proxySuppliers, (req, res) => {
    try {
        const action = 'SELECT * FROM suppliers ORDER BY name ASC';

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
});
//? Relation to specific product
storageSuppliers.post('/link/:supplierId/:productId', proxySuppliers, async (req, res) => {
    const { supplierId, productId} = req.params;

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