import {Express, Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';

import * as express from "express";
import {connectToDatabase} from "./config/database";
import {Sequelize} from "sequelize-typescript";
import User from "./models/users";

const app: Express =  express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Configure Express to use EJS as the view engine
app.set('view engine', 'ejs');

export const dialect = "postgres";


async function defineRoutes() {
    const database: Sequelize = await connectToDatabase();

    // about page
    app.get('/users', function(req, res) {
        res.render('src/views/users');
    });


    app.get('/', async (req: Request, res: Response) => {
        // Refresh the users table
        const users = await User.findAll();
        res.render('pages/index', {users});
    });

    app.post('/submit', async (req: Request, res: Response) => {
        try {
            // Create a new user in the database
            await User.create({
                id: uuidv4(), // Generate a new UUIDv4
                name: req.body.username,
            });

            // Redirect to the homepage
            res.redirect('/');
        } catch (error) {
            // Handle errors
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Error creating user' });
        }
    });
}
defineRoutes().then(() => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error("Unable to define routes:", error);
    process.exit(1);
});
