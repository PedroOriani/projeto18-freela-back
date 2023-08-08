import { db } from '../database/database.connection.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export async function signUp(req, res){

    const { name, email, password, CPF, cellphone, city } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    try{

        const verEmail = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);

        if (verEmail.rowCount > 0) return res.status(409).send({message: 'Este email ja está sendo utilizado por outro usuário'});
        
        await db.query(`INSERT INTO users (name, email, password, CPF, cellphone, city) VALUES ($1, $2, $3, $4, $5, $6);`,
        [name, email, hash, CPF, cellphone, city])

        res.status(201)

    }catch{
        res.status(500).send(err.message)
    }
}

export async function signIn(req, res){

    const { email, password } = req.body

    try{

    }catch{
        res.status(500).send(err.message)
    }
}