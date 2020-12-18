const express = require('express');
const User = require('../models/user');
const merchantAuth = require('../middleware/merchantAuth')
const Merchant = require('../models/merchant');
const router = new express.Router;

router.post('/merchant/signup', async (req, res) => {

  try{
    const merchantid = await Merchant.findByCredentials(req.body.merchantid)
    if(!merchantid){
      const error = 'Not found, please enter valid merchant id'
      res.send({errorMsg: error})
    } else {
      const merchant = new Merchant(req.body)
      await merchant.save() //mongoose middleware functionality
      res.status(201).send()
    }
  } catch(e) {
      console.log('error: ', e)
      res.status(400).send(e)
  }
})

router.post('/merch/login', async (req, res) => {
  
  const user = new User(req.body)  
  
    try{
        await user.save()
        res.status(201).send()
    } catch(err){
      res.status(400).send(err)
    }
});

module.exports = router;