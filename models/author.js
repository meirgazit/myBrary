const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
    
    name: { type: String, required: true }
})

//creationTimestamp: { type: Date, default: Date.now},
    
module.exports = mongoose.model('Author', authorSchema)
