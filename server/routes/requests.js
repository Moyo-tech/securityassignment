const express = require("express");
const {
  getRequests,
  getsingleRequest,
  createRequests,
  getfacilitators,
} = require("../controllers/requestController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);
// TO GET ALL WORKOUTS
router.get("/", getRequests);
router.get("/facilitators", getfacilitators);

//TO GET SINGLE WORKOUT
router.get("/:id", getsingleRequest);


//post a new workout
router.post("/", createRequests);

module.exports = router;
