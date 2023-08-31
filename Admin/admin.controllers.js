const mongoose = require("mongoose");
const staffModel = require("../Staff/staff.model");
const departmentModel = require("../Departments/department.model");
const response = require("../utilities/response");
const bcrypt = require("bcryptjs");

const addNewStaff = async (req, res) => {
  try {
    let newStaff = new staffModel(req.body);
    const hashpassword = async () => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStaff.password, salt, (err, hash) => {
          if (!err) {
            console.log(hash);
            newStaff.password = hash;
            newStaff.save();
            return res.status(response.CREATED).json(newStaff);
          } else {
            throw new Error(err);
          }
        });
      });
    };
    await hashpassword();
  } catch (error) {
    res.status(response.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
const updateStaffSalary = async (req, res) => {
  const staffId = req.params.id;
  try {
    await staffModel.findOneAndUpdate(
      { _id: staffId },
      { salaryBreakdown: req.body.salaryBreakdown }
    );
    return res.status(response.OK).json({ message: "Salary updated" });
  } catch (error) {
    return res.status(response.BAD_REQUEST).json({ error: error.message });
  }
};
const updateStaffInfo = async (req, res) => {
  const staffId = req.params.id;
  const restrictedAccess = [req.body.salaryBreakdown];
  const checkForRestrictedEntry = async (restricted) => {
    restricted.map((item) => {
      if (item) {
        throw new Error("Restricted Entry");
      }
    });
  };
  try {
    await checkForRestrictedEntry(restrictedAccess);
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({ error: err.message });
  }

  try {
    await staffModel.findOneAndUpdate({ _id: staffId }, { ...req.body });
    return res.status(response.OK).json({ message: "User updated" });
  } catch (error) {
    return res.status(response.BAD_REQUEST).json({ error: error.message });
  }
};
const getAllStaff = async (req, res) => {
  try {
    const allStaff = await staffModel.find({});
    return res.status(response.OK).json(allStaff);
  } catch (error) {
    return res.status(response.BAD_REQUEST).json({
      error: error.message,
    });
  }
};
//Department controllers
const createNewDept = async (req, res) => {
  const department = new departmentModel(req.body);
  try {
    await department.save();
    return res
      .status(response.CREATED)
      .json({ message: "success", department });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({ error: err.message });
  }
};
const updateDept = async (req, res) => {
  const deptId = req.params.id;
  try {
    await departmentModel.findOneAndUpdate({ _id: deptId }, { ...req.body });
    return res.status(response.OK).json({ message: "Department Updated" });
  } catch (error) {
    return res.status(response.BAD_REQUEST).json({ error: error.message });
  }
};
const deleteDept = async (req, res) => {
  try {
    const deptId = req.params.id;
    await departmentModel.findOneAndDelete({ _id: deptId });
    return res.status(response.OK).json({ message: "Department Deleted" });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({ error: err.message });
  }
};
const getAllDept = async (req, res) => {
  try {
    const allDept = await departmentModel.find({});
    return res.status(response.OK).json(allDept);
  } catch (error) {
    return res.status(response.BAD_REQUEST).json({
      error: error.message,
    });
  }
};
const addStafftoDept = async (req, res) => {};

module.exports = {
  addNewStaff,
  updateStaffSalary,
  updateStaffInfo,
  getAllStaff,
  createNewDept,
  updateDept,
  deleteDept,
  getAllDept,
};
