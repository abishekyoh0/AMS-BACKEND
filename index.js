import express from "express"
import cors from "cors"
// import Route from "./routes/index.js"
import { connectDB } from "./config/db.js"

connectDB()
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())

// app.use("/api", Route)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})