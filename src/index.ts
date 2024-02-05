import { Request, Response } from 'express';


import * as express from "express";
import {connectToDatabase} from "./database";

const app =  express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


export const dialect = "postgres";

app.get('/', (req: Request, res: Response) => {
    res.send(`
        <form action="/submit" method="post">
            <label for="username">Enter Name</label>
            <input type="text" name="username" />
            <input type="submit" value="Submit" />
        </form>
    `);
});

app.post('/submit', (req: Request, res: Response) => {
    console.log(req.body.textbox);

    res.send('Received your text: ' + req.body.textbox);
});

app.listen(port, () => {
    let database = connectToDatabase();

    console.log(`[server]: Server is running at http://localhost:${port}`);
});