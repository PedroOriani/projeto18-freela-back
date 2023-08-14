import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { addUser, deleteUser, emailExists, logout, signin, verifyEmail } from '../repositories/session.repositories.js';

export async function signUp(req, res){

    const { name, email, password, cpf, phone, city, state } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    try{

        const verEmail = await verifyEmail (email);

        if (verEmail.rowCount > 0) return res.status(409).send({message: 'Este email ja está sendo utilizado por outro usuário'});
        
        await addUser (name, email, hash, cpf, phone, city, state);

        res.sendStatus(201);

    }catch (err) {
        res.status(500).send(err.message)
    }
}

export async function signIn(req, res){

    const { email, password } = req.body

    try{

        const response = await emailExists(email)

        if (response.rowCount === 0) return res.status(401).send({message: "E-mail não cadastrado"});

        const user = response.rows[0];

        const verPassword = bcrypt.compareSync(password, user.password);

        if (!verPassword) return res.status(401).send({message: "Senha Incorreta"});

        const token = uuid();

        await deleteUser(user.id);

        await signin(user.id, token);

        res.status(200).send({id: user.id, name: user.name, token: token})

    }catch (err) {
        res.status(500).send(err.message)
    }
}

export async function logOut(req, res){

    const user = res.locals.user

    try{

        await logout(user.rows[0].id );

        res.sendStatus(200);

    }catch (err){
        res.status(500).send(err.message)
    }
}