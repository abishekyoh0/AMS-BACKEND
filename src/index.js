import express from "express"
import { connectDB } from "../src/config/db.js"
import cors from "cors"
import Route from "../src/routes/index.js"

connectDB()
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())

app.use("/api", Route)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})


