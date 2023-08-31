const express = require("express");
const router = express.Router();
const {
  addExpense,
  addRevenue,
  getAllExpense,
  getAllRevenue,
} = require("./department.controller");

router.put("/addexpense/:id", addExpense);
router.put("/addrevenue/:id", addRevenue);
router.get("/getallexpense/:id", getAllExpense);
router.get("/getallrevenue/:id", getAllRevenue);

module.exports = router;
