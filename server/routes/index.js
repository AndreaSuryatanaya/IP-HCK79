const Controller = require("../controllers/controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("server is running ...");
});

router.post("/register", Controller.handleRegister);
router.post("/login", Controller.handleLogin);

module.exports = router;
