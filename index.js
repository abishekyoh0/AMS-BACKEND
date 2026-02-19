import express from "express"
import cors from "cors"
import Route from "./routes/index.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv";

dotenv.config();
connectDB()
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use(cors())


app.use("/api", Route)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
