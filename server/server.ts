import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import cors from "cors"
import { config } from "dotenv"
import userRouter from "./routes/user.js"
import blogsRouter from "./routes/blogs.js"

const port = 4000
const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use("/static", express.static("static"))
app.use(
	cors({
		origin: [process.env.CLIENT_APP_URL || "http://localhost:5173"],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	})
)
config()

async function start() {
	try {
		mongoose.set("strictQuery", false)
		await mongoose.connect(process.env.MONGO_URI || "")
		console.log("connected to db")
		app.listen(port)
		console.log(`Listening on port: ${port}`)
	} catch (err) {
		console.log(err)
	}
}
start()

app.use("/api/user", userRouter)
app.use("/api/blogs", blogsRouter)

app.use((req, res) => {
	res.status(404).json({ error: "not found" })
})
