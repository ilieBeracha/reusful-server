import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dal";
import { UserInterface } from "../models/userModel";
import { saveImagesToS3User } from "./awsLogic";
const uniqid = require('uniqid');

export async function getAllUsers() {
    const query = 'SELECT * FROM users';
    const [results] = await execute(query);
    return results
};

export async function register(user: UserInterface) {
    const { firstName, lastName, username, email, password } = user;
    const query = `INSERT INTO users(firstName,lastName,username,email,password) VALUES (?,?,?,?,?)`;
    const results = await execute<OkPacket>(query, [firstName, lastName, username, email, password]);
    user.id = results[0].insertId;
    return results;
};

// export async function addImageForUser(URL: any, id: number) {
//     const imageId = uniqid();
//     const key = await saveImagesToS3User(URL, imageId)
//     const query = `UPDATE users SET userImage = '${key}' where id =${id}`
//     const [results] = await execute(query);
//     return results;
// }