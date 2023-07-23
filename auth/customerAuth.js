//? Dependencies
import express from 'express';
import { SignJWT, jwtVerify } from 'jose';
import { conx } from '../middlewares/proxyCustomer.js';
import mysql2 from 'mysql2/promise';

let registerAuth = express();

registerAuth.use((req, res, next ) => {
    
    next();
})
export default registerAuth;