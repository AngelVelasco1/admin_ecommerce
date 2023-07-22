//? Dependecies
import express from 'express';
import mysql from 'mysql2';
import { plainToClass } from 'class-transformer';
import { Suppliers } from '../controller/suppliers.js';

const proxySuppliers = express();

let conx;
proxySuppliers.use((req, res, next) => {
    try {
        let config = JSON.parse(process.env.CONNECT);
        conx = mysql.createPool(config);
        let data = plainToClass(Suppliers, req.body || req.params , { excludeExtraneousValues: true });
        req.body = JSON.parse(JSON.stringify(data));
        next();

    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.sendStatus(500);
    }
});

export default proxySuppliers;
export { conx };
