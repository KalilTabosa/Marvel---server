import jwt from "jsonwebtoken"
import { readDBAsync } from "./DB/db";
import crypto from "crypto"

const SECRET = "digitalcollege";

export const signToken = (payload) => jwt.sign( payload, SECRET );

export const verifyToken = (acess_token) => {
    const decoded = jwt.verify(acess_token, SECRET);
    return decoded;
};

export const userAlreadyExists = async ({ email }) => {
    try{
        const db = await readDBAsync();
        return db.users.findIndex((user) => user.email === email) !== -1;
    } catch (_) {
        
        return false
    }
};

export const makeSalt = () => {
    return crypto.randomBytes(16).toString("base64")
};

export const encryptPassword = (plainPassword = "", salt = "") => {
    return crypto
        .pbkdf2Sync(plainPassword, salt, 100000, 64, "sha512")
        .toString("base64");
};