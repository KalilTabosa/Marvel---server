import jwt from "jsonwebtoken"

const SECRET = "digitalcollege";

export const signToken = (payload) => jwt.sign( payload, SECRET );

export const verifyToken = (acess_token) => {
    const decoded = jwt.verify(acess_token, SECRET);
    return decoded;
}

export const userAlreadyExists = async ({ email }) => {
    
}