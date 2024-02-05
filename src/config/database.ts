import { Sequelize } from "sequelize-typescript";
import User from "../models/users";

const config = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    },
};

const dialect = "postgres";

export async function connectToDatabase(): Promise<Sequelize> {
    let database: Sequelize = new Sequelize({
        host: config.host,
        username: config.username,
        password: config.password,
        database: config.database,
        dialect: dialect,
        pool: config.pool,
        sync: { force: true },
        models: [User]
    });

    try {
        await database.authenticate();
        console.log("Database connection established");

        await database.query(
            `CREATE TABLE IF NOT EXISTS "users" (
                "id" uuid PRIMARY KEY,
                "name" text NOT NULL,
                "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
            );`
        );
    } catch (error) {
        console.error("Database error:", error);
        process.exit(1);
    }

    return database;
}
