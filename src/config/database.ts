import { Sequelize } from "sequelize-typescript";
import User from "../models/users";

const config = {
    host: "localhost",
    username: "users_admin",
    password: "ZXbEqJoiH2j1YKvUCRyuT5wK1UGJCUVE",
    database: "users_db",
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
