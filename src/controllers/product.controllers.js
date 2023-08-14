import { db } from '../database/database.connection.js'

export async function addProduct(req, res){

    try{

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

    try{

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function getMyProducts(req, res){

    const { id } = req.params

    try{

        const myProducts = await db.query(`SELECT * FROM products WHERE id=$1;` [id]);
        if (myProducts.rowCount === 0) return res.status(404).send({message: 'Você não tem nenhum produto a venda'});

        res.status(200).send(myProducts.rows)

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function deleteProduct(req, res){

    try{

    }catch (err){
        res.status(500).send(err.message)
    }
}