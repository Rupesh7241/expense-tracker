const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
 const {Protect} = require("../middleware/authMiddleware");

 const router = express.Router();

 router.post("/add", Protect,addIncome);
 router.get("/get",Protect,getAllIncome);
 router.get("/downloadexcel", Protect, downloadIncomeExcel);
 router.delete("/:id", Protect, deleteIncome);


 module.exports = router;