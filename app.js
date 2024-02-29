import express from "express"
import cors from "cors"
export const app = express();
import userRouter from "./Routes/users.js"
import invoiceRouter from "./Routes/invoice.js"
import { config } from "dotenv";

config({
  path: "./data/config.env"
})

app.use(express.json())


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Allow sending cookies along with the request
  }));


 app.get("/",(req,res)=>{
    res.send("hello");
})

app.use("/api/v1/users" , userRouter)
app.use("/api/v1/invoice", invoiceRouter)

