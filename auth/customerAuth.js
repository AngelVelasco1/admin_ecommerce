//? Dependencies
import express from 'express';
import { jwtVerify } from 'jose';
import dotenv from 'dotenv';

dotenv.config("../");

let auth = express();

auth.use(async(req, res, next ) => {
    const token = req.headers.authorization;

    if(!token) return res.status(401).send('Not token found');

    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(token, encoder.encode(process.env.PRIVATE_KEY))
        res.send(jwtData);
        next()
    } catch(err) {
        console.error('Error de autenticación:', err.message);
        return res.status(401).send('Token inválido');
    }
})
export default auth;