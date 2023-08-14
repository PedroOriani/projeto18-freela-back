import { db } from '../database/database.connection.js'

export async function addProduct(req, res){

    const { photo, title, model, description, price, quantity } = req.body;

    const user = res.locals.user

    try{

        await db.query(`INSERT INTO products ("ownerId", photo, title, model, description, price, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [user.rows[0].id, photo, title, model, description, price, quantity])

        res.status(201).send({message: "Produto adicionado com sucesso"})

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function getProducts(req, res){

    try{

        const products = await db.query(`SELECT * FROM products WHERE quantity > 0;`);
        if (products.rowCount === 0) return res.sendStatus(404);

        res.status(200).send(products.rows)

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function getProductById(req, res){

    const { id } = req.params;

    try{

        const productId = await db.query(`
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

        if (productId.rowCount === 0) return res.status(404).send('Produto não encontrado');

        const product = productId.rows[0]

        res.send({
            id: product.id,
            title: product.title,
            model: product.model,
            photo: product.photo,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            ownerName: product.ownerName,
            phone: product.phone,
            adress: product.city + " - " + product.state
        })

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function getMyProducts(req, res){

    const user = res.locals.user

    try{

        const myProducts = await db.query(`SELECT * FROM products WHERE "ownerId"=$1;`, [user.rows[0].id]);
        if (myProducts.rowCount === 0) return res.status(404).send({message: 'Você não tem nenhum produto a venda'});

        res.status(200).send(myProducts.rows)

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function deleteProduct(req, res){

    const { id } = req.body;

    const user = res.locals.user

    try{

        await db.query(`DELETE FROM products WHERE "ownerId"=$1 AND id=$2`, [user.rows[0].id, id]);

        res.sendStatus(200);

    }catch (err){
        res.status(500).send(err.message)
    }
}