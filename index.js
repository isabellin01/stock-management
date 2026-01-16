import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import router from "./routes/estoqueRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
    try {
        res.send("Hello express!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro");
    }
});

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})