const express = require('express');
const User = require('../models/user');
const router = new express.Router;

router.post('/login', async (req, res) => {

  const user = new User(req.body)
  
    try{
        await user.save()
        res.status(201).send()
    } catch(err){
      res.status(400).send(err)
    }
});

router.post('/merch/login', async (req, res) => {
  console.log(req.body)
  const user = new User(req.body)
  
  
    try{
        await user.save()
        res.status(201).send()
    } catch(err){
      res.status(400).send(err)
    }
});

module.exports = router;