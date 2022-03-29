const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: 'Title is required',
    },
    lname: {
        type: String,
        required: 'First name is required',
       
    },
    
    city: {
        type: String,
      required: 'city is required'
    },
    company: {
        type: String,
        required: 'company is required',
        unique: true
      },

}, { timestamps: true })

module.exports = mongoose.model('User1', userSchema)