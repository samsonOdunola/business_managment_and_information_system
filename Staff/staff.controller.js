const staffModel = require("../Staff/staff.model");
const response = require("../utilities/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await staffModel.findOne({ email });
    try {
      if (user == null) {
        throw new Error("User not found");
      }
    } catch (err) {
      res.status(response.NOT_FOUND).json({ error: err.message });
    }
    //validate password
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        //issue token and send staff object
        const token = jwt.sign({ user }, process.env.SECRET, {
          expiresIn: "1hr",
        });
        return res.status(response.OK).json({ user, token });
      } else {
        return res
          .status(response.BAD_REQUEST)
          .json({ error: "Wrong password" });
      }
    });
  } catch (error) {
    return res.status(response.BAD_REQUEST).json({ error: error.message });
  }
};
const updatepassword = async (req, res) => {
  const staffId = req.params.id;
  let saltRound = 10;

  try {
    bcrypt.hash(req.body.password, saltRound, async (err, hashedPassword) => {
      if (!err) {
        await staffModel.findOneAndUpdate(
          { _id: staffId },
          { password: hashedPassword }
        );
      }
    });

    return res.status(response.OK).json({ message: "Password updated" });
  } catch (error) {
    return res.status(response.BAD_REQUEST).json({ error: error.message });
  }
};
const updateUserInfo = async (req, res) => {
  const staffId = req.params.id;
  const restrictedAccess = [
    req.body.priviledges,
    req.body.email,
    req.body.password,
    req.body.department,
    req.body.lineManager,
    req.body.role,
    req.body.employmentType,
    req.body.salaryBreakdown,
  ];
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
    return res.status(response.NOT_AUTHORIZED).json({ error: err.message });
  }

  try {
    await staffModel.findOneAndUpdate({ _id: staffId }, { ...req.body });

    return res.status(response.OK).json({ message: "User updated" });
  } catch (error) {
    return res.status(response.BAD_REQUEST).json({ error: error.message });
  }
};
const sendMessage = async (req, res) => {
  const receiverId = req.params.id;
  const message = req.body.message;
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const verifiedUser = jwt.verify(token, process.env.SECRET);

      const { _id } = verifiedUser.user;
      if (_id == receiverId) {
        return res.status(response.BAD_REQUEST).json({
          error: "You cannot send a message to yourself",
        });
      }
      const messageBodyInbox = { from: _id, message: message };
      const messageBodyOutbox = { to: receiverId, message: message };
      const receiverProfile = await staffModel.findById(receiverId);
      const senderProfile = await staffModel.findById(_id);
      if ((senderProfile === null) | (receiverProfile === null)) {
        return res.status(response.NOT_FOUND).json({
          error: "User not found",
        });
      }
      receiverProfile.inbox.push(messageBodyInbox);
      senderProfile.outbox.push(messageBodyOutbox);
      await senderProfile.save();
      await receiverProfile.save();
      return res
        .status(response.OK)
        .json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(400).send({ error: "Internal Server Error" });
    }
  }

  if (!token) {
    return res.status(400).send({ message: "No token!" });
  }
};
const getStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const staff = await staffModel.findById(staffId);
    if (staff == null) {
      return res.status(response.NOT_FOUND).json({ error: "User not found" });
    }
    return res
      .status(response.OK)
      .json({ message: response.RESPONSE_STATUS_SUCCESS, staff });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({ error: err.message });
  }
};
module.exports = {
  loginUser,
  updateUserInfo,
  updatepassword,
  sendMessage,
  getStaff,
};
