const StudentrequestModel = require("../models/Studentrequest");
const mongoose = require("mongoose");
//get all student requests
const getRequests = async (req, res) => {
  const user_id = req.user._id;
  const userRole = req.user.role;
  const usertype = req.user.type;

  if (userRole === "student") {
    const studentrequest = await StudentrequestModel.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(studentrequest);
  }
  if (userRole === "teamlead") {
    const studentrequest = await StudentrequestModel.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(studentrequest);
  }
  if (userRole === "facilitator") {
    const studentrequest = await StudentrequestModel.find({type: "Academic Request" }).sort({
      createdAt: -1,
    });
    res.status(200).json(studentrequest);
  }
};

//get a single student request
const getsingleRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such request" });
  }

  const studentrequest = await StudentrequestModel.findById(id);

  if (!studentrequest) {
    return res.status(404).json({ error: "No such request" });
  }

  res.status(200).json(studentrequest);
};
//create new workout
const createRequests = async (req, res) => {
  const { title, type, recipient, details } = req.body;
  try {
    const user_id = req.user._id;
    const studentrequest = await StudentrequestModel.create({
      title,
      type,
      recipient,
      details,
      user_id,
    });
    res.status(200).json(studentrequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getfacilitators = async (req, res) => {
  const user_id = req.user._id;
  const userRole = req.user.role;


  try {
    const facilitators = await User.find(
      { role: "facilitator" },
      "firstName lastName"
    );
    const facilitatorNames = facilitators.map(
      (user) => `${user.firstName} ${user.lastName}`
    );
    res.json(facilitatorNames);
  } catch (error) {
    console.error("Error fetching facilitators:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRequests,
  getsingleRequest,
  createRequests,
  getfacilitators,
};
