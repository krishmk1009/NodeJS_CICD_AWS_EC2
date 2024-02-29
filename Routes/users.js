import express from "express"
import { login, register } from "../Controller/user.js";

const router = express.Router();
router.use(express.json())


router.get("/" , (req,res)=> res.send("hello test"));

router.post("/login" , login)
router.post("/register" , register)


export default router;
