//? Dependecies
import express from 'express';
import mysql from 'mysql2/promise';
import { plainToClass } from 'class-transformer';
import { Customer } from '../controller/customer.js';
const proxyCustomer = express();

let conx;
proxyCustomer.use((req, res, next) => {
    try {
        let config = JSON.parse(process.env.CONNECT);
        conx = mysql.createPool(config);
        let data = plainToClass(Customer, req.body || req.params, { excludeExtraneousValues: true });
        req.body = JSON.parse(JSON.stringify(data));
        next();

    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.sendStatus(500);
    }

});

export default proxyCustomer;
export { conx };
