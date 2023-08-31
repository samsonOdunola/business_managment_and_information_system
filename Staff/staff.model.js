const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const staffSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    preffaredName: { type: String },
    password: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    lineManager: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ["Contract", "Full time", "Part time"],
      required: true,
    },
    priviledges: {
      type: String,
      required: true,
      enum: ["Admin", "Team leader"],
    },
    salaryBreakdown: {
      basicPay: { type: Number },
      transport: { type: Number },
      clothing: { type: Number },
      entertainment: { type: Number },
      utility: { type: Number },
      leave: { type: Number },
      bonus: { type: Number },
      deductions: {
        pension: { type: Number },
        tax: { type: Number },
      },
    },
    task: [{ type: String }],
    accountDetails: {
      accountName: { type: String },
      accountNumber: { type: String },
      bank: { type: String },
    },
    nextOfKin: {
      firstName: { type: String },
      lastName: { type: String },
      relationship: { type: String },
      phoneNumber: { type: String },
    },
    inbox: [
      {
        from: { type: Schema.Types.ObjectId },
        message: { type: String },
        unread: { type: Boolean, default: true },
      },
    ],
    outbox: [
      {
        to: { type: Schema.Types.ObjectId },
        message: { type: String },
      },
      { timestamps: true },
    ],
    Holidays: { type: Number, default: 30 },
  },
  { timestamps: true }
);

let saltRound = 10;
// staffSchema.pre("save", function (next) {
//   bcrypt.hash(this.password, saltRound, (err, hashedPassword) => {
//     if (!err) {
//       this.password = hashedPassword;
//       next();
//     }
//   });
// });
// staffSchema.pre("findOneAndUpdate", function (next) {
//   bcrypt.hash(this.password, saltRound, (err, hashedPassword) => {
//     if (!err) {
//       this.password = hashedPassword;
//       next();
//     }
//   });
// });

const StaffModel = mongoose.model("staffs", staffSchema);

module.exports = StaffModel;
