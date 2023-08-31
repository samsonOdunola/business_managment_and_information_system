const express = require("express");
const router = express.Router();
const {
  loginUser,
  updateUserInfo,
  updatepassword,
  sendMessage,
  getStaff,
} = require("../Staff/staff.controller");

router.get("/login", loginUser);
router.get("/getstaff/:id", getStaff);
router.put("/updateUser/:id", updateUserInfo);
router.put("/updatePassword/:id", updatepassword);
router.post("/sendmessage/:id", sendMessage);

module.exports = router;
