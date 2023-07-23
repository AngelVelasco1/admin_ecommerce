//? Dependencies
import { Router } from 'express';
import dotenv from 'dotenv';
import registerAuth from '../auth/customerAuth.js';
import proxyCustomer from '../middlewares/proxyCustomer.js';
import { SignJWT } from 'jose';
import { conx } from '../middlewares/proxyCustomer.js';

//? Enviroment Variables
dotenv.config("../");

const storageCustomer = Router();

//? Register (Se le asigna el rol 2 por defecto)
storageCustomer.post('/create', proxyCustomer, async(req, res) => {
    const {name, address, email} = req.body;
    const userData = {
        name,
        address,
        email,
        role_id: 2
    }
    try {
        const checkCustomer = 'SELECT * FROM customer WHERE name = ? OR email = ?';
       
        const [customerResult] = await conx.query(checkCustomer, [name, email]);
        if (customerResult.length > 0) {
          return res.status(409).send("El cliente ya existe");
        }
    
        const action = 'INSERT INTO customer SET ?';
        await conx.query(action, userData);
        const encoder = new TextEncoder()
        const jwtContruct = new SignJWT({userData})

        const jwt = await jwtContruct
        .setProtectedHeader({alg: "HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(encoder.encode(process.env.PRIVATE_KEY))

        // Enviar el token en la respuesta
        return res.status(201).json({ userData, jwt });
    } catch(err) {
        console.error('Error de conexion:', err.message);
        res.sendStatus(500);
    }
})

//? Login with jwt
storageCustomer.get('/login', proxyCustomer, registerAuth, async(req, res) => {
    const {name, email} = req.body;
    const userData = {
        name,
        email
    }
    try {
        if(!name || !email) return res.status(404).send("Envia tus datos");

        const action = 'SELECT * FROM customer WHERE name = ? AND email = ?';
        cons [user] = await conx.query(action, [userData]);

        if(user.length == 0 ) return res.status(404).send("Usuario no encontrado")

    } catch(err) {
        console.error('Error de conexion:', err.message);
         res.sendStatus(500);
   
    }
})

//? Delete account by id
storageCustomer.delete('/delete/:id', proxyCustomer, async(req, res) => {
    const {id} = req.params;

    try {
        const checkCustomer = 'SELECT id FROM customer WHERE id = ?';
        const [customerResult] = await conx.query(checkCustomer, [id]);
        if(customerResult.length === 0) {
            return res.status(404).send("Not user found")
        } 
        
        const action = 'DELETE FROM customer WHERE id = ?';
        await conx.query(action, id);

        return res.send("Usuario eliminado")
    } catch(err) {
        console.error('Error de conexion:', err.message);
        res.sendStatus(500);
    }
})

export default storageCustomer;

