import { db } from "../database/database.connection.js";

export async function verifyEmail (email){
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}

export async function addUser (name, email, hash, cpf, phone, city, state){
    return db.query(`INSERT INTO users (name, email, password, cpf, phone, city, state) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
    [name, email, hash, cpf, phone, city, state]);
}

export async function emailExists(email){
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}

export async function deleteUser(id){
    return db.query(`DELETE FROM sessions WHERE "userID"=$1;`, [id]);
}

export async function signin (id, token){
    return db.query(`INSERT INTO sessions ("userID", token) VALUES ($1, $2);`, [id, token])
}

export async function logout(id){
    return db.query(`DELETE FROM sessions WHERE "userID"=$1`, [id]);
}