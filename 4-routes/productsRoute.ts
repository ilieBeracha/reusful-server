import express from 'express';
import { addProduct, deleteProductById, getProductById, getProductByUserId, getProductsByCategorie } from '../2-logic/productsLogic';

export const ProductsRoute = express.Router();

ProductsRoute.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await getProductsByCategorie(+id);
        // console.log(response);

        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(e);
    }
})

ProductsRoute.get('/products/userid/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await getProductByUserId(+id);
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e);
    }
})

ProductsRoute.post('/products/add', async (req: any, res: any) => {
    try {
        const body = req.body;
        const file = req.files
        const results = await addProduct(body, file);
        res.status(200).json(results)
    } catch (e) {
        res.status(400).json(e)
    }
})

ProductsRoute.get('/products/single/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const results = await getProductById(+id);
        res.status(200).json(results[0])
    } catch (e) {
        res.status(400).json(e)
    }
})

ProductsRoute.post('/products/delete/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body
    console.log(body);
    try {
        const response = await deleteProductById(body, +id);
        res.status(200).json(response)
    } catch (e) {
        res.status(400).json(e)
    }
})