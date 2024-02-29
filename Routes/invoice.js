import express from "express"
import { getAllInvoicesUser, newInvoice } from "../Controller/invoice.js";
const router = express.Router();

router.get("/test", (req,res)=>{
    res.send("invoice test")
})
router.post("/new-invoice" , newInvoice);
router.get("/:userId/invoices",getAllInvoicesUser);


export default router