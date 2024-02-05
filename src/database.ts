import { Sequelize } from "sequelize-typescript";
import {User} from "./model";

const config = {
    host: "localhost",
    username: "postgres",
    password: "password123",
    database: "testdb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const dialect = "postgres";

class Database {
    public sequelize: Sequelize | undefined;


    private async connectToDatabase() {
        this.sequelize = new Sequelize({
            host: config.host,
            username: config.username,
            password: config.password,
            database: config.database,
            dialect: dialect,
            pool: config.pool,
            models: [User]
        });


        await this.sequelize
            .authenticate()
            .then(() => {
                console.log("Connection has been established successfully.");
            })
            .catch((err) => {
                console.error("Unable to connect to the Database:", err);
            });
    }
}