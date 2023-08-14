import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next){

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    try{

        const response = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);

        if (response.rowCount === 0) return res.status(401).send({message: 'Faça log-in para utilizar o E-Market'});

        const user = await db.query(`SELECT * FROM users WHERE id=$1;`, [response.rows[0].userID]);

        if (!user) return res.status(401).send('Usuário não autorizado')

        res.locals.session = response.rows[0];

        res.locals.user = user

    }catch (err){
        res.status(500).send(err.message)
    }

    next();
}