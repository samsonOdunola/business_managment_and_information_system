const express = require("express");
const router = express.Router();

const {
  addNewStaff,
  updateStaffSalary,
  updateStaffInfo,
  createNewDept,
  updateDept,
  getAllStaff,
  getAllDept,
  deleteDept,
} = require("../Admin/admin.controllers");

//Admin Routes
router.post("/addNewStaff", addNewStaff);
router.post("/createdept", createNewDept);
router.get("/getallstaff", getAllStaff);
router.get("/getalldept", getAllDept);
router.put("/updateSalary/:id", updateStaffSalary);
router.put("/updateStaffInfo/:id", updateStaffInfo);
router.put("/updatedept/:id", updateDept);
router.delete("/deletedept/:id", deleteDept);

module.exports = router;
