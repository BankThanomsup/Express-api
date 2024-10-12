var express = require('express');
var router = express.Router();
const Product = require('../models/Product');

/* GET home page. */
router.get('/',async(req , res , next)=> {
  res.render ('index',{
    title : 'Express-api'
  });
});

/* API to get products data */
router.get('/getData', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);  // Return data as JSON
  } catch (err) {
    console.error('Error fetching products:', err);
    next(err);
  }
});



module.exports = router;
