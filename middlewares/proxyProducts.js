//? Dependecies
import express from 'express';
import mysql from 'mysql2';
import { plainToClass } from 'class-transformer';
import { Products } from '../controller/products.js';

const proxyProducts = express();

let conx;
proxyProducts.use((req, res, next) => {
    try {
        let config = JSON.parse(process.env.CONNECT);
        conx = mysql.createPool(config);
        let data = plainToClass(Products, req.body, { excludeExtraneousValues: true });
        req.body = JSON.parse(JSON.stringify(data));
        next();

    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.sendStatus(500);
    }

});

export default proxyProducts;
export { conx };
