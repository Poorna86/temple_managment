const jwt = require('jsonwebtoken')
const Merchant = require('../models/merchant')

const merchantAuth = async (req, res, next) => {
    try{
        const merchantid = await Merchant.findOne({merchantid: req.body.merchantid  }) // grab user from database
        if (merchantid) {
			req.merchantid = merchantid
        }
        next()
    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports = merchantAuth