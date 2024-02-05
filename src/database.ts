import { Sequelize } from "sequelize-typescript";

const config = {
    host: "localhost",
    username: "adminuser",
    password: "password123",
    database: "users",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
};

const dialect = "postgres";

export async function connectToDatabase(): Promise<Sequelize> {
    let database: Sequelize = new Sequelize({
        host: config.host,
        username: config.username,
        password: config.password,
        database: config.database,
        dialect: dialect,
        pool: config.pool
    });


    await database.authenticate();

    console.log("Database connection established");

    return database;
}