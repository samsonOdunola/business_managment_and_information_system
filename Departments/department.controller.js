const departmentModel = require("./department.model");
const response = require("../utilities/response");
const addExpense = async (req, res) => {
  try {
    const deptId = req.params.id;
    const expense = { ...req.body };
    const department = await departmentModel.findById(deptId);

    department.expense.push(expense);
    await department.save();
    return res
      .status(response.OK)
      .json({ message: "Expense updated successfully" });
  } catch (err) {
    return res
      .status(response.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};
const addRevenue = async (req, res) => {
  try {
    const deptId = req.params.id;
    const revenue = { ...req.body };
    const department = await departmentModel.findById(deptId);

    department.revenue.push(revenue);
    await department.save();
    return res
      .status(response.OK)
      .json({ message: "Revenue updated successfully" });
  } catch (err) {
    return res
      .status(response.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};
const getAllExpense = async (req, res) => {
  try {
    const deptId = req.params.id;
    const department = await departmentModel.findById(deptId);
    const expense = department.expense;

    return res.status(response.OK).json(expense);
  } catch (err) {
    return res
      .status(response.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};
const getAllRevenue = async (req, res) => {
  try {
    const deptId = req.params.id;
    const department = await departmentModel.findById(deptId);
    const revenue = department.revenue;

    return res.status(response.OK).json(revenue);
  } catch (err) {
    return res
      .status(response.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

module.exports = {
  addExpense,
  addRevenue,
  getAllExpense,
  getAllRevenue,
};
