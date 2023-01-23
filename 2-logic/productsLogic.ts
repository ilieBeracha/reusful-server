import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dal";
import { ProductInterface } from "../models/productModel";
import { saveImagesToS3 } from "./awsLogic";
const uniqid = require('uniqid');

export async function getProductsByCategorie(id: number) {
    const query = `SELECT * FROM products WHERE categorieId = ${id}`;
    const [results] = await execute(query);
    // console.log(results);

    return results;
}

export async function addProduct(product: ProductInterface, file: any) {
    const imageId = uniqid();
    const { userId, productName, productDescription, productPrice, productStatus, productDate, categorieId } = product
    let key = await saveImagesToS3(file, imageId)
    const query = 'INSERT INTO products(userId,productName,productDescription,productPrice,productStatus,productDate,productImage,categorieId) VALUES (?,?,?,?,?,?,?,?)'
    const [results] = await execute<OkPacket>(query, [userId, productName, productDescription, productPrice, productStatus, productDate, key, categorieId]);
    // console.log(results);

    return results;
}

export async function getProductById(id: number) {
    const query = `SELECT * FROM products WHERE id = ${id}`
    const [results] = await execute<OkPacket>(query);
    return results;
}

export async function getProductByUserId(id: number) {
    const query = `SELECT * FROM products WHERE userId = ${id}`
    const [results] = await execute<OkPacket>(query);
    return results;
}

export async function deleteProductById(id:number){
    const query = `DELETE FROM products WHERE id = ${id}`
    const [results] = await execute<OkPacket>(query)
    return results;
}
