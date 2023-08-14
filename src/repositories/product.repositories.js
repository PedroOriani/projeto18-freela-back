import { db } from "../database/database.connection.js";

export async function adicionarProduto (id, photo, title, model, description, price, quantity){
    return await db.query(`INSERT INTO products ("ownerId", photo, title, model, description, price, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [id, photo, title, model, description, price, quantity])
}

export async function getalldata () {
    return db.query(`SELECT * FROM products WHERE quantity > 0;`)
}

export async function joinProductById (id) {
    return db.query(`
    SELECT
        products.*,
        users.name AS "ownerName",
        users.phone AS phone,
        users.city AS city,
        users.state AS state
    FROM products
    JOIN users ON products."ownerId" = users.id
    WHERE products.id = $1
`, [id]);
}

export async function meusprodutos (id) {
    return db.query(`SELECT * FROM products WHERE "ownerId"=$1;`, [id]);
}

export async function deletarProduct (userId, id) {
    return db.query(`DELETE FROM products WHERE "ownerId"=$1 AND id=$2`, [userId, id]);
}