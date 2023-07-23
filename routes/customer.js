//? Dependencies
import { Router } from 'express';
import dotenv from 'dotenv';
import proxyCustomer from '../middlewares/proxyCustomer.js';
import auth from '../auth/customerAuth.js';
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
        const checkCustomer = 'SELECT * FROM customer WHERE name = ?';
       
        const [customerResult] = await conx.query(checkCustomer, [name]);
        if (customerResult.length > 0) {
          return res.status(409).send("El cliente ya existe");
        }
      
      
        const action = 'INSERT INTO customer SET ?';
        await conx.query(action, userData);
      
        return res.status(201).send(userData);  
    } catch(err) {
        console.error('Error de conexion:', err.message);
        res.sendStatus(500);
    }
})

//? Login with jwt
storageCustomer.post('/login', proxyCustomer, auth, (req, res) => {

})

//? Delete account by id
storageCustomer.delete('/delete', proxyCustomer, (req, res) => {

})

export default storageCustomer;

