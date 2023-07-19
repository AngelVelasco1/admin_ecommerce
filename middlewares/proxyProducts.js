//? Dependecies
import express from 'express';
import { plainToClass } from 'class-transformer';
import mysql from 'mysql2'
import { jwtVerify, SignJWT } from 'jose';

const proxyProducts = express();

app.post("/:id/:nombre", async(req, res) => {
    try {
        let json = {
            id: req.params.id,
            nombre: req.params.nombre
        }
        const encoder = new TextEncoder()
        const jwtConstructor = new SignJWT({json})

        const jwt = await jwtConstructor
        .setProtectedHeader({alg: "HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30s")
        .sign(encoder.encode(process.env.PRIVATE_KEY));
         
        res.send({jwt});
    } catch(err) {
        res.sendStatus(400);
    }
})
app.get("/auth_token", async(req, res) => {
    const {auth} = req.headers;
    if(!auth) return res.status(401).send({token: "Bad token :("});
    try {
        const token = auth.split("Bearer")[1];
        
        const { payload } = jwtVerify(token, process.env.PRIVATE_KEY)
    } catch(err) {
        res.sendStatus(400);
    }
})