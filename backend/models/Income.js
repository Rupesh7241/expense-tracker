const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"user", requied: true},
    icon:{type: String},
    source:{type:String, required:true}, //Example: Salary, freelance, etc.
    amount:{type: Number, required:true},
    date:{type: Date, dafault:Date.now},
},{timestamps:true});

module.exports = mongoose.model("Income",IncomeSchema);