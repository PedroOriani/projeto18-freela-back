import { db } from '../database/database.connection.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export async function signUp(req, res){

    const { name, email, password, cpf, phone, city, state } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    try{

        const verEmail = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);

        if (verEmail.rowCount > 0) return res.status(409).send({message: 'Este email ja está sendo utilizado por outro usuário'});
        
        await db.query(`INSERT INTO users (name, email, password, cpf, phone, city, state) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [name, email, hash, cpf, phone, city, state]);

        res.sendStatus(201);

    }catch (err) {
        res.status(500).send(err.message)
    }
}

export async function signIn(req, res){

    const { email, password } = req.body

    try{

        const response = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);

        if (response.rowCount === 0) return res.status(401).send({message: "E-mail não cadastrado"});

        const user = response.rows[0];

        const verPassword = bcrypt.compareSync(password, user.password);

        if (!verPassword) return res.status(401).send({message: "Senha Incorreta"});

        const token = uuid();

        await db.query(`DELETE FROM sessions WHERE "userID"=$1;`, [user.id]);

        await db.query(`INSERT INTO sessions ("userID", token) VALUES ($1, $2);`, [user.id, token]);

        res.status(200).send({token: token})

    }catch (err) {
        res.status(500).send(err.message)
    }
}

export async function logOut(req, res){

    const user = res.locals.user

    try{

        await db.query(`DELETE FROM sessions WHERE "userID"=$1`, [user.rows[0].id]);

        res.sendStatus(200);

    }catch (err){
        res.status(500).send(err.message)
    }
}