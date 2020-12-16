const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    merchantid:{
        type: String,
        required: true,
        trim: true
    },
    mrchpswd: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password') ){
                throw new Error('password should not contain key word "password"')
            }
        }
    }
},{
    timestamps: true
})

userSchema.pre('save', async function (next) {     
    const signup = this
    console.log(signup)
    if(signup.isModified('mrchpswd')) {
                
        if(signup.mrchpswd !== signup.mrchpswd) {
            throw new Error('password and reentered password are not same')     
        } else {
            signup.mrchpswd = await bcrypt.hash(signup.mrchpswd, 8)
            // signup.reppassword = await bcrypt.hash(signup.reppassword, 8)
        }
    }         
    next()
})

const User = mongoose.model('Merchant_login', userSchema)

module.exports = User