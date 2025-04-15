import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Order } from "./entities/Order";
import { Book } from "./entities/Book";
import { User } from "./entities/User";

configDotenv()
export const AppDatasource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Book, Order, User
    ],
    logging: false
})