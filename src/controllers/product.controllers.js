import { db } from '../database/database.connection.js'
import { adicionarProduto, deletarProduct, getalldata, joinProductById, meusprodutos } from '../repositories/product.repositories.js';

export async function addProduct(req, res){

    const { photo, title, model, description, price, quantity } = req.body;

    const user = res.locals.user

    try{

        await adicionarProduto(user.rows[0].id)

        res.status(201).send({message: "Produto adicionado com sucesso"})

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function getProducts(req, res){

    try{

        const products = await getalldata();
        if (products.rowCount === 0) return res.sendStatus(404);

        res.status(200).send(products.rows)

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function getProductById(req, res){

    const { id } = req.params;

    try{

        const productId = await joinProductById(id)

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
            address: product.city + " - " + product.state
        })

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function getMyProducts(req, res){

    const user = res.locals.user

    try{

        const myProducts = await meusprodutos(user.rows[0].id);
        if (myProducts.rowCount === 0) return res.status(404).send({message: 'Você não tem nenhum produto a venda'});

        res.status(200).send(myProducts.rows)

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function deleteProduct(req, res){

    const { id } = req.params;

    const user = res.locals.user

    try{

        await deletarProduct(user.rows[0].id, id);

        res.sendStatus(200);

    }catch (err){
        res.status(500).send(err.message)
    }
}