const product = require("../models/product");

const getAllProducts = async (req, res) => {
  console.log("req", req.query);

  const data = await product.find({ company: "dell" });
  res.status(200).json({ data });
  // res.status(200).json({ msg: "i am getAllProducts" });
};

const getAllProductsTesting = async (req, res) => {
  console.log("req", req.query);

  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (featured) {
    queryObject.featured = featured;
  }

  let apiData = product.find(queryObject);

  if (sort) {
    // let sortFix = sort.replace(",", " ");
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  const data = await apiData;

  res.status(200).json({
    data: data,
    status: 200,
    msg: "success",
    total: data.length,
  });
  // res.status(200).json({ msg: "I am getAllProductsTesting" });
};

module.exports = { getAllProducts, getAllProductsTesting };
