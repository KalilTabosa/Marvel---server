import  Jwt  from "jsonwebtoken";
import createError from "http-errors"
import { verifyToken } from "./auth";

export const logErrors = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({ error:err });
};

export const checkIfIsAutenticated = () => async (req, res, next) => {
    try{
      if (req.query.hasOwnProperty("acess_token")) {
        req.headers.authorization = `Bearer ${req.query.acess_token}`;
      }
    
      if (req.query && typeof req.headers.authorization === "undefined") {
        req.headers.authorization = `Bearer ${req.cookies.acess_token}`;
      }
    
      const acess_token = req.headers.authorization.split(" ")[1];
    
      await verifyToken(acess_token)
    
      next();
    
    } catch(err) {
     next(createError(401));
  
     app.use(logErrors)
    }
}