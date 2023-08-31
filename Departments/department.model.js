const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    headOfDepartment: {
      staffId: { type: mongoose.Schema.Types.ObjectId, required: true },
      email: { type: String, required: true },
    },
    expense: [
      {
        date: { type: Date },
        amount: { type: Number },
        category: { type: String, enum: ["Repair", "Supplies", "Misc"] },
        description: { type: String },
      },
    ],
    revenue: [
      {
        date: { type: Date },
        amount: { type: Number },
        description: { type: String },
      },
    ],
    members: [
      {
        staffId: { type: mongoose.Schema.Types.ObjectId },
        email: { type: String },
        role: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const departmentModel = mongoose.model("departments", departmentSchema);

module.exports = departmentModel;
