import express, { json } from 'express';
import { UserRoute } from './4-routes/usersRoute';
import cors from 'cors'
import { CategoriesRoute } from './4-routes/categoriesRoute';
import { openAiServer } from './4-routes/openAiRoute';
import { ProductsRoute } from './4-routes/productsRoute';
import { CartRoute } from './4-routes/cartRoute';
const fileUpload = require('express-fileupload');

const server = express();

server.use(cors())
server.use(json());
server.use(fileUpload())

server.use(UserRoute)
server.use(CategoriesRoute)
server.use(ProductsRoute)
server.use(CartRoute)
server.use(openAiServer)

server.listen(4000, () => {
    console.log('listening...');
})