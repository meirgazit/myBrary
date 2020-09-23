const express = require('express')
const router = express.Router()
const Author = require('../models/Author')

// get all authors
router.get('/', (req, res) => {
    res.render('authors/index')
})

// get author
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author })
})

// create new author
router.post('/', (req, res) => {
    res.send('create')
})

module.exports = router