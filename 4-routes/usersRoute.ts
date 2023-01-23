import express from 'express';
import { getAllUsers, register } from '../2-logic/usersLogic';
import { generateToken } from '../3-middleware/jwt';

export const UserRoute = express.Router();

UserRoute.get('/users', (req, res) => {
    const users = getAllUsers();
    try {
        res.status(200).json(users)
    } catch (e) {
        res.status(400).json(e)
    }
});


UserRoute.post('/users/register', async (req, res) => {
    const user = req.body;
    try {
        await register(user);
        const token = await generateToken(user);
        res.status(200).json(token);
    } catch (e) {
        res.status(400).json(e)
    }
});

UserRoute.post('/users/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const users = await getAllUsers();
    try {
        const user:any = users.find((u) => u.username === username && u.password === password);
        if (user) {
            const token = await generateToken(user)
            res.status(200).json(token);
        } else {
            res.status(401).json('wrong username or password');
        }
    } catch (e) {
        res.status(400).json('something went wrong...')
    }
})