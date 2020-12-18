const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const merchantSchema = new mongoose.Schema({
    merchantid:{
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password') ){
                throw new Error('password should not contain key word "password"')
            }
        }
    },
    repassword: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password') ){
                throw new Error('password should not contain key word "password"')
            }
        }
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]  
},{
    timestamps: true
})

// //hash the plain text password before saving the password
merchantSchema.pre('save', async function (next) {     
    const signup = this
    console.log('signup: ', signup)
    if(signup.isModified('password')) {
                
        if(signup.password !== signup.repassword) {
            throw new Error('password and reentered password are not same')     
        } else {
            signup.password = await bcrypt.hash(signup.password, 8)
            signup.repassword = await bcrypt.hash(signup.repassword, 8)
        }
    }         
    next()
})

merchantSchema.statics.findByCredentials = async (merchantid) => {
    const merchant = await Merchant.findOne({ merchantid }) // select the collection which satisfies 
    
    return merchant
}

const Merchant = mongoose.model('Merchant_list', merchantSchema)

module.exports = Merchant