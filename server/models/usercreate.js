const mongoose = require('mongoose');
const validator = require('validator');

const createUser = new mongoose.Schema({
    merchantid:{
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    userID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    merchantName: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    userphone: {
        type: Number,
        contact: true,
        required: true,
        trim: true
    },
    useremail:{
        type: String,
        required: true,
        unique: [true, 'duplicate mail id entered'],
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    }
},{
    timestamps: true
})

createUser.pre('save', async function (next) {     
    const user = this

    next()
})

const UserCreate = mongoose.model('User_Merchant', createUser)

module.exports = UserCreate