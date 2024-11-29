const express = require("express");
const router = express.Router();
const { addForm } = require("../controllers/forms");

router.route("/addForm").post(addForm);

module.exports = router;
