const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        creationTimestamp: { type: Date, default: Date.now},
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)
