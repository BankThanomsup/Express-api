const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

router.get('/', async (req, res, next)=>{
   try {
    const products =  await Product.find();
    res.json(products);
   }
   catch(err){
    console.error('Error fetching products:',err);
    next(err);
   }

});

router.post('/',async(req , res , next)=>{
    try{
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }
    catch(err){
        console.error('Error fetching products:',err);
    next(err);
    } 
})

router.get('/:id',async(req , res , next)=>{
    try{
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
}
    catch(err){
        console.error('Error fetching products:',err);
        next(err);
    }
})

router.put('/:id',async(req ,res , next)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true })
        console.log('PUT request received for id:', req.params.id);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });

        }
        res.json(product)
    }
    catch(err){
        console.error('Error fetching products:',err);
        next(err);
    }
})

router.delete('/:id', async(req, res, next)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).json({ message: 'Product not found' });

        }
        res.json({message: 'Product deleted successfully', product})
    }
    catch(err){
        console.error('Error fetching products:',err);
        next(err);
    }
})

module.exports = router ;
