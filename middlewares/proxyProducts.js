//? Dependecies
import express from 'express';
import { plainToClass } from 'class-transformer';
import { Products } from '../controller/products.js'

const proxyProducts = express();

proxyProducts.use(async (req, res, next) => {
    try {
     
        let data = plainToClass(Products, req.params, { excludeExtraneousValues: true });
        req.params = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.sendStatus(500);
    }
});

export default proxyProducts;
