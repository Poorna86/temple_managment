const express = require('express');
const validator = require('validator');
const bcrypt = require('bcryptjs');
//const User = require('../models/user');
const merchantAuth = require('../middleware/merchantAuth');
const MerchantRead = require('../models/merchantRead');
const MerchantSignup = require('../models/merchantsignup');
const UserCreate = require('../models/usercreate');
const EventCreate = require('../models/eventCreate');
const { sendWelcomeEmail } = require('../emails/account');

const router = new express.Router;

//
// without middleware: new request -> run route handler
//
// with middleware: new request -> do something -> run route handler
//

router.post('/merchant/signup', async (req, res) => {

  try{
    const merchantid = await MerchantRead.findMerchant(req.body.merchantid, req.body.merchantName)
    if(!merchantid){
      throw new Error(': merchantid: Please enter valid merchant id and Name')
    } else {
      const validPhone = validateSignupPhone(req.body.phone)
      if(!validPhone) {
        throw new Error(': phone: Please enter valid valid phone number')
      }
      const merchant = new MerchantSignup(req.body)
      await merchant.save()
      res.status(201).redirect('/')
    }
  } catch(err) {
    if(err.code === 11000){
      err.message =  ': merchantid: Please enter unique merchant id'
    }
    const errors = errorhandle(err)
    console.log('errors: ', errors)
    res.status(400).send(errors)
  }
})

router.post('/merch/login', async (req, res) => {
  
    try{
      const merchant = await MerchantSignup.findByCredentials(req.body.merchantid, req.body.password)
      const token = await merchant.generateAuthToken()
      res.cookie('auth_token', token)
      res.status(201).send(merchant)
    } catch(err){
      const errors = errorhandle(err)
      res.status(400).send(errors)
    }
});

// router.get('/api/dashboard', merchantAuth, async (req, res) => {
//   try {
//     console.log('req: ', req.merchant)
//     if(!req.merchant){
//       console.log('error: ', req.merchant)
//       res.redirect('/')
//     } else {
//       res.status(201).send(req.merchant.merchantid)
//     } 
    
//    } 
//    catch (e) {
//      console.log('e: ', e)
//     const errors = errorhandle(e)
//     res.status(400).send(errors)
//    }
// });

router.patch('/api/profileedit', merchantAuth, async (req, res) => {
  const updates = Object.keys(req.body)//getting input columns
  console.log('updates: ', updates)
  try {
    switch (updates[0]) {
      case 'phone':
        const validatePhone = validateSignupPhone(req.body.phone) 
          if (validatePhone){
            req.merchant.phone = req.body.phone
            await req.merchant.save()
            const pswdstatus = ''
            const merchantPublicDetails = getMerchantPublicDetails(req.merchant, pswdstatus)
            return res.status(201).send(merchantPublicDetails)
          } else {
            throw new Error (': phone: please enter valid phone number')
          }
      case 'email':
        if (req.merchant.email === req.body.email){
          throw new Error (': email: duplicate email. Please enter unique mail id')
        } else if(!validator.isEmail(req.body.email)){
          throw new Error (': email: invalid mail format')
        } else {
          req.merchant.email = req.body.email
          await req.merchant.save()
          const pswdstatus = ''
          const merchantPublicDetails = getMerchantPublicDetails(req.merchant, pswdstatus)
          return res.status(201).send(merchantPublicDetails)
        }
      case 'oldPassword':
          const authenticated = await bcrypt.compare(req.body.oldPassword, req.merchant.password)
          if (authenticated) {
            req.merchant['password'] = req.body['password']
            req.merchant['repassword'] = req.body['repassword']
            await req.merchant.save()
            const pswdstatus = 'OK'
            const merchantPublicDetails = getMerchantPublicDetails(req.merchant,pswdstatus)
            return res.status(201).send(merchantPublicDetails)
          } else {
            throw new Error(': password: old password entered invalid. Password was not updated.')
          }
      case 'undefined':
          break;
    }
  } catch (err) {
    console.log('errors: ', err)
    const errors = errorhandle(err)
    console.log('errors: ', errors)
    res.status(400).send(errors)
  }
});

router.post('/api/createuser', merchantAuth, async (req, res) => {

  try {
      if(!req.merchant){
        res.redirect('/')
      } else {
          const validatePhone = validateSignupPhone(req.body.userPhone)
          if (!validatePhone){
            throw new Error (': phone: please enter valid phone number')
          }
          var userID = generateUserID(req.merchant.merchantName)
          console.log(userID)
          const userDetails = {
            merchantid: req.merchant.merchantid,
            merchantName: req.merchant.merchantName,
            userID,
            userphone: req.body.userPhone,
            useremail: req.body.userEmail
          }
          const createUser = new UserCreate(userDetails)
          console.log('createUser: ', userDetails)
          await createUser.save()
          const sendgridStatus = sendWelcomeEmail(userDetails.useremail,userDetails.userID)
          console.log('sendgridStatus: ', sendgridStatus)
          res.status(201).send(userDetails)
      } 
    } 
  catch (err) {
    if(err.code === 11000){
      var field = err.message.split(".$")[1];
          field = field.split(" dup key")[0];
          field = field.substring(0, field.lastIndexOf("_"));
          err.message = `: ${field}: please enter unique user mail ID`
    }
    const errors = errorhandle(err)
    console.log('errors: ', errors)
    res.status(400).send(errors)
  }
})

router.post('/api/createevent', merchantAuth, async (req, res) => {

  try {
      if(!req.merchant){
        res.redirect('/')
      } else {
          const validatePhone = validateSignupPhone(req.body.eventManagerPhone)
          if (!validatePhone){
            throw new Error (': phone: please enter valid phone number')
          }
          const eventDetails = {
            merchantid: req.merchant.merchantid,
            merchantName: req.merchant.merchantName,
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            eventManager: req.body.eventManager,
            eventManagerPhone: req.body.eventManagerPhone
          }
          const createUser = new EventCreate(eventDetails)
          console.log('createUser: ', eventDetails)
          await createUser.save()
          res.status(201).send(eventDetails)
      } 
    } 
  catch (err) {
    console.log('error1: ', err)
    if(err.code === 11000){
      var field = err.message.split(".$")[1];
          field = field.split(" dup key")[0];
          field = field.substring(0, field.lastIndexOf("_"));
          err.message = `: ${field}: please enter unique ${field}`
    }
    const errors = errorhandle(err)
    console.log('errors: ', errors)
    res.status(400).send(errors)
  }
})

router.post('/logout', merchantAuth, async (req, res) => {
	try {
    if(!req.merchant){
      throw new Error(': merchantid: Not login')
    }
		req.merchant.tokens = req.merchant.tokens.filter((token) => {
			return token.token !== req.token
    })
    await req.merchant.save()
    res.status(200).send()
	} catch (e) {
    const errors = errorhandle(e)
    console.log('errors: ', errors)
    res.status(400).send(errors)
	}
})


const generateUserID = (merchantName) => {
  var val = Math.floor(1000 + Math.random() * 9000);
  var userid = 'U' + merchantName + val
  return userid
}


const getMerchantPublicDetails = (merchant, pswdstatus) => {
  const merchantPublicDetails = {
    merchantid: merchant.merchantid,
    phone: merchant.phone,
    email: merchant.email,
    pswdstatus: pswdstatus
  }
  return merchantPublicDetails
}

const validateSignupPhone = (phone) => {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return regex.test(phone)
}

const errorhandle = (e) => {
    const errors = {}
    const error = JSON.stringify(e.message)
    const allErrors = error.substring(error.indexOf(':')+1).trim()
    const allErrorsInArrayFormat = allErrors.split(',').map(e => e.trim())
    allErrorsInArrayFormat.forEach(error => {
      const [key, value] = error.split(':').map(err => err.trim());
      errors[key] = value.replace(/"/g, "")
    })
    return errors
}

module.exports = router;