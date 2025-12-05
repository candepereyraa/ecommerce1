import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME })
    .then(() => {
        console.log("Conectado a la DB:", mongoose.connection.name);
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on ${process.env.PORT}`);
        });
    })
    .catch((err) => console.error(err));
