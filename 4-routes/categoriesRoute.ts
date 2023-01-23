import express from 'express';
import { getAllCategories } from '../2-logic/categorieLogic';

export const CategoriesRoute = express.Router();

CategoriesRoute.get('/categories', async (req, res) => {
    const categories = await getAllCategories();
    res.status(200).json(categories);
})