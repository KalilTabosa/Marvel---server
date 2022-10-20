import jwt from "jsonwebtoken"
import { readDBAsync } from "./DB/db";

const SECRET = "digitalcollege";

export const signToken = (payload) => jwt.sign( payload, SECRET );

export const verifyToken = (acess_token) => {
    const decoded = jwt.verify(acess_token, SECRET);
    return decoded;
}

export const userAlreadyExists = async ({ email }) => {
    try{
        const db = await readDBAsync();
        return db.users.findIndex((user) => user.email === email) !== -1;
    } catch (_) {
        // console.log(_);
        return false
    }
}