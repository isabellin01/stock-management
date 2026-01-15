import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import router from "./routes/estoqueRoute.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", async (req, res) => {
    try {
        res.send("Hello express!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// app.get("/api/get", async (req, res) => {
//     try {
//         const sqlInsert =
//             "INSERT INTO product (product_code, description, category) VALUES ('123', 'produto 2', 'epi')";

//         const [result] = await pool.query(sqlInsert);

//         console.log("result", result);
//         res.send(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Erro");
//     }
// })'