import { execute } from "../1-dal/dal";
import fs from 'fs'

export async function getAllCategories() {
    const query = 'SELECT * FROM categorie';
    const [results] = await execute(query);
    // console.log(results);
    return results;
}
