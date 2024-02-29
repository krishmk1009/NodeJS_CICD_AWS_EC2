import {app} from "./app.js"
import { connectDb } from "./data/database.js"

connectDb();


app.listen(3000,()=>{
    console.log("app is listening on port 3000")
})