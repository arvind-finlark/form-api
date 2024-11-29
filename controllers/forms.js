const form = require("../models/form");

const addForm = async (req, res) => {
  console.log("req", req.query, req.body);

  const newForm = req.body;
  const data = await form.create(newForm);

  console.log("res", data);

  res.status(200).json({
    data: data,
    status: 200,
    msg: "success",
  });
  // res.status(200).json({ msg: "i am getAllProducts" });
};

module.exports = {
  addForm,
};
