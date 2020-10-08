const router = require("express").Router();
const User = require("../controllers/User");

router.get("/users", User.findAll);
router.post("/users", User.insertOne);

module.exports = router;
