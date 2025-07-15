const express = require("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");
 const {Protect} = require("../middleware/authMiddleware");

 const router = express.Router();

 router.post("/add", Protect,addExpense);
 router.get("/get",Protect,getAllExpense);
 router.get("/downloadexcel", Protect, downloadExpenseExcel);
 router.delete("/:id", Protect, deleteExpense);


 module.exports = router;