import express, { json } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import createError from "http-errors"
import { fetchApi } from "./api";
import { signToken, userAlreadyExists } from "./auth";
import { readDBAsync, writeDBAsync } from "./DB/db";
import { next } from "process"
import { checkIfIsAutenticated, logErrors } from "./middlewares";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/characters', async (req, res,) => {
  try{
    const response = await fetchApi("/characters");
    const data = await response.json()
    const resultado = data.data.results
    res.json(resultado)
  } catch(err) {
    console.log(err);
  }
})

app.post("/auth/signup",async (req, res, next) => {
  try{
    const { name, email, password } = req.body;
    const userExists = await userAlreadyExists({ email });

    if (userExists) {
      throw "usuário existente"
    }

    const db = await readDBAsync();
    const lastAddedUser = db.users[db.users.length - 1];
    const id = lastAddedUser ? lastAddedUser.id + 1 : 0;
   
    const user = {
      id,
      name,
      email,
      password
    };

    db.users.push(user);
    
    await writeDBAsync(db);
    const acess_token = signToken({ email });
    res.status(200).json({ user, acess_token });

  } catch(err) {
    next(createError(401, "O usuário já existe"));
  }

  app.use(logErrors)
});

app.post("/auth/signup", async (req, res, next) => {
  try{
    const {email} = req.body;

    const userExists = await userAlreadyExists({ email });
   
    if (!userExists) {
      throw "usuário existente"
    }

    const acess_token = signToken({ email });
    res.status(200).json({ acess_token });

  } catch(err) {
    next(createError(401));
  }
})

app.get("/private", checkIfIsAutenticated, (req, res) => {
  console.log(req.query);
  console.log(req.headers);
  res,json({})
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGlsbGVnYWxAZ21haWwuY29tIiwiaWF0IjoxNjY2OTAxMjYyfQ.dFkJ_DPgpzRXWV3kUBro6Ds4f8gJ85fRe1o7JnoZ99s

export default app;